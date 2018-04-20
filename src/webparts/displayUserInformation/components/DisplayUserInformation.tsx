import * as React from "react";
import styles from "./DisplayUserInformation.module.scss";
import { IDisplayUserInformationProps } from "./IDisplayUserInformationProps";

import "../../../CommonCss/persona.module.scss";
import {
  IPersonaProps,
  Persona,
  PersonaSize,
  PersonaPresence
} from "office-ui-fabric-react/lib/Persona";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import getUserProperties from "../../../CommonJS/getUserProperties";
import { getBusinessUnit } from "../../../CommonJS/fetchBusinessUnit";
import { IUserProperties } from "../../../Interfaces/IUserProperties";
require("sp-init");
require("microsoft-ajax");
require("sp-runtime");
require("sharepoint");
require("sp-taxonomy");


export default class DisplayUserInformation extends React.Component<IDisplayUserInformationProps,any> {
  public constructor(props: IDisplayUserInformationProps, any) {
    super(props);
    this.state = {
      imageUrl:"",
      imageInitials:"",
      primaryText:"",
      secondaryText:"",
      tertiaryText:"",
      optionalText:""
    };
    
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
  public componentDidMount() {
  
    getUserProperties().then(userProperties => {
      getBusinessUnit(userProperties).then(userProperties => {
        sessionStorage.setItem("myLink", JSON.stringify(userProperties));
        let myLink = sessionStorage.getItem("myLink");        
        let myLinkCurrentUser:IUserProperties = JSON.parse(myLink);
        this.setState({imageUrl:myLinkCurrentUser.userProperties.PictureURL});
        this.setState({imageInitials:"HD"});
        this.setState({primaryText:myLinkCurrentUser.userProperties.BusinessUnit});
        this.setState({secondaryText:myLinkCurrentUser.ParentTerm.Root});
        this.setState({tertiaryText:myLinkCurrentUser.userProperties.CompetenceArea});
        this.setState({optionalText:myLinkCurrentUser.userProperties.GeoLocation});
      });
    });    
  }
}
