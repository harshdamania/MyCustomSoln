import * as React from "react";
import styles from "./Settings.module.scss";
import { ISettingsProps } from "./ISettingsProps";
import { escape, keys } from "@microsoft/sp-lodash-subset";
import { CError } from "../../../Classes/CError";
import { sp } from "@pnp/sp";
import { ISettings } from "../../../Interfaces/ISettings";
import { IBusiness_Unit } from "../../../Interfaces/IBusiness_Unit";
import { waitForUserInfo } from "../../../CommonJS/waitForUserInfo";
import { IUserProperties } from "../../../Interfaces/IUserProperties";

export default class Settings extends React.Component<ISettingsProps, {}> {
  public render(): React.ReactElement<ISettingsProps> {
    return (
      <div className={styles.settings}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>
                Customize SharePoint experiences using Web Parts.
              </p>
              <p className={styles.description}>
                {escape(this.props.description)}
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
        .getByTitle("Settings")
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
              console.log(item.Title)
              if (myLinkCurrentUser.userProperties.BusinessUnit == "Kornsenfellas") {
                console.log("Kornsenfellas");
              } else {
                if (e.Title == myLinkCurrentUser.userProperties.BusinessUnit) {
                  Keys.push(item.Key);
                  return true;
                } else {
                  if(myLinkCurrentUser.IsBusinessUnitRoot.Value){
                    let childmatch:boolean=myLinkCurrentUser.ParentTerm.ChildTerm.some(d => {
                      if( d.Name == e.Title)
                      {
                        Keys.push(item.Key);                    
                        return true;
                      }
                    });                  
                   if(childmatch) return true
                  }
                   else{
                    if(myLinkCurrentUser.ParentTerm.Name==e.Title)
                    {
                      Keys.push(item.Key);
                      return true;
                    }
                   }
                 
                }
              }
            
            });
          });
          console.log(Keys);
          this.setState({ keyValues: Keys });
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
      debugger;
      this._getListItemsSettings(myLinkCurrentUser);
    });
  }
}
