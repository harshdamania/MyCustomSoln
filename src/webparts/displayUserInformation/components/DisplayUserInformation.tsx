import * as React from "react";
import styles from "./DisplayUserInformation.module.scss";
import { IDisplayUserInformationProps } from "./IDisplayUserInformationProps";

import "../../../Common/Styles/persona.module.scss";
import {
  IPersonaProps,
  Persona,
  PersonaSize,
  PersonaPresence
} from "office-ui-fabric-react/lib/Persona";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import getUserProperties from "../../../Common/TypeScripts/getUserProperties";
import { getBusinessUnit } from "../../../Common/TypeScripts/fetchBusinessUnit";
import { IUserProperties } from "../../../Common/Interfaces/IUserProperties";
import { common } from "../../../Common/TypeScripts/Config";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { IDisplayUserInformationState } from "./IDisplayUserInformationState";

// require("sp-init");
// require("microsoft-ajax");
// require("sp-runtime");
// require("sharepoint");
// require("sp-taxonomy");
export default class DisplayUserInformation extends React.Component<
  IDisplayUserInformationProps,
  IDisplayUserInformationState
> {
  public constructor(props: IDisplayUserInformationProps, context?: any) {
    super(props);
    this.state = {
      loadingLists: false,
      imageUrl: null,
      imageInitials: null,
      primaryText: null,
      secondaryText: null,
      tertiaryText: null,
      optionalText: null
    };
  }
  public loadSPTaxonomy() {
    return new Promise((resolve, reject) => {
      SPComponentLoader.loadScript("/_layouts/15/sp.taxonomy.js", {
        globalExportsName: "SP.Taxonomy"
      }).catch(error => {});
    });
  }
  public loadSPDependencies() {
    return new Promise((resolve, reject) => {
      SPComponentLoader.loadScript("/_layouts/15/init.js", {
        globalExportsName: "$_global_init"
      })
        .catch(error => {})
        .then((): Promise<{}> => {
          return SPComponentLoader.loadScript("/_layouts/15/MicrosoftAjax.js", {
            globalExportsName: "Sys"
          });
        })
        .catch(error => {})
        .then((): Promise<{}> => {
          return SPComponentLoader.loadScript("/_layouts/15/SP.Runtime.js", {
            globalExportsName: "SP"
          });
        })
        .catch(error => {})
        .then((): Promise<{}> => {
          return SPComponentLoader.loadScript("/_layouts/15/SP.js", {
            globalExportsName: "SP"
          });
        })
        .catch(error => {})
        .then((): Promise<{}> => {
          return SPComponentLoader.loadScript("/_layouts/15/sp.taxonomy.js", {
            globalExportsName: "SP.Taxonomy"
          });
        })
        .catch(error => {})
        .then(() => {
          resolve();
        });
    });
  }
  public render(): React.ReactElement<IDisplayUserInformationProps> {
    return (
      <div className="ms-PersonaExample">
        <div className={""}>Custom icon in secondary text</div>
        <Persona
          imageUrl={this.state.imageUrl}
          imageInitials={this.state.imageInitials}
          primaryText={this.state.primaryText}
          secondaryText={this.state.primaryText}
          tertiaryText={this.state.primaryText}
          optionalText={this.state.primaryText}
          size={PersonaSize.size72}
          presence={PersonaPresence.offline}
          onRenderSecondaryText={this._onRenderSecondaryText}
        />
      </div>
    );
  }
  private _onRenderSecondaryText = (props: IPersonaProps): JSX.Element => {
    return (
      <div>
        <Icon iconName={"Suitcase"} className={"ms-JobIconExample"} />
        {props.secondaryText}
      </div>
    );
  };
  private loadCurrentUserInfo() {
    debugger;
    getUserProperties().then(userProperties => {
      debugger;
      getBusinessUnit(userProperties).then(userProperties => {
        debugger;
        sessionStorage.setItem(
          common.sessionStoreMyLink,
          JSON.stringify(userProperties)
        );
        let myLink = sessionStorage.getItem(common.sessionStoreMyLink);
        let myLinkCurrentUser: IUserProperties = JSON.parse(myLink);
        this.setState({
          imageUrl: myLinkCurrentUser.userProperties.PictureURL
        });
        this.setState({ imageInitials: "HD" });
        this.setState({
          primaryText: myLinkCurrentUser.userProperties.BusinessUnit
        });
        this.setState({ secondaryText: myLinkCurrentUser.ParentTerm.ID });
        this.setState({
          tertiaryText: myLinkCurrentUser.userProperties.CompetenceArea
        });
        this.setState({
          optionalText: myLinkCurrentUser.userProperties.GeoLocation
        });
      });
    });
  }
  public componentDidMount() {
    debugger;
    ///Modern Page
    if (document.getElementById("MSOLayout_InDesignMode") == null) {
      this.loadSPDependencies().then(() => {
        this.loadCurrentUserInfo();
      });
    } else {
      //Classic Page
      if (document.getElementById("MSOLayout_InDesignMode")["value"] !== "1") {
        this.loadSPDependencies().then(() => {
          this.loadCurrentUserInfo();
        });
      } else {
        this.loadSPTaxonomy().then(() => {
          this.loadCurrentUserInfo();
        });
      }
    }
  }
}
