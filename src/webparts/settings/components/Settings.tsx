import * as React from "react";
import styles from "./Settings.module.scss";
import { ISettingsProps } from "./ISettingsProps";
import { ISettings } from "../../../Common/Interfaces/ISettings";

import { waitForUserInfo } from "../../../Common/TypeScripts/waitForUserInfo";
import { IUserProperties } from "../../../Common/Interfaces/IUserProperties";
import {sp } from '@pnp/sp';
import { MyLinklist, errorLogs } from "../../../Common/TypeScripts/Config";
export default class Settings extends React.Component<ISettingsProps, any> {
  public constructor(props: ISettingsProps, any) {
    super(props);
    this.state = {
      settings:""
    };
    
  }
  public render(): React.ReactElement<ISettingsProps> {
    return (
      <div className={styles.settings}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to  9809809 !</span>
              <p className={styles.subTitle}>
                Customize SharePoint experiences using Web Parts.
              </p>
              <p className={styles.description}>
  {this.state.settings}
              </p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private _getListItemsSettings(
    myLinkCurrentUser: IUserProperties
  ): Promise<{}> {
    let Keys = [];
    console.log(myLinkCurrentUser.userProperties.BusinessUnit);
    var promise = new Promise((resolve, reject) => {
      sp.web.lists
        .getByTitle(MyLinklist.Settings)
        .items.select(
          "Title",
          "Application",
          "Key",
          "Business_x0020_Unit/Title",
          "Business_x0020_Unit/ID"
        )
        .expand("Business_x0020_Unit")
        .get()
        .then(response => {
          debugger;
          response.map((item: ISettings) => {
            debugger;
            item.Business_x0020_Unit.some(e => {
              console.log(item.Title);
              if (
                myLinkCurrentUser.userProperties.BusinessUnit == "Kornsenfellas"
              ) {
                console.log("Kornsenfellas");
              } else {
                if (e.Title == myLinkCurrentUser.userProperties.BusinessUnit) {
                  Keys.push(item.Key);
                  return true;
                } else {
                  if (myLinkCurrentUser.IsBusinessUnitRoot.Value) {
                    let childmatch: boolean = myLinkCurrentUser.ParentTerm.ChildTerm.some(
                      element => {
                        if (element.Name == e.Title) {
                          Keys.push(item.Key);
                          return true;
                        }
                      }
                    );
                    if (childmatch) return true;
                  } else {
                    if (myLinkCurrentUser.ParentTerm.Name == e.Title) {
                      Keys.push(item.Key);
                      return true;
                    }
                  }
                }
              }
            });
          });
          console.log(Keys);          
          this.setState({ settings: Keys.toString() });
          resolve();
        })
        .catch(e => {
          console.log("An error has occured", e);
          reject();
        });
    });
    return promise;
  }
  public componentDidMount() {
    waitForUserInfo().then((myLinkCurrentUser: IUserProperties) => {
      this._getListItemsSettings(myLinkCurrentUser);
    }).catch((error)=>{
      console.log(errorLogs.failure +  error);
    });
  }
}
