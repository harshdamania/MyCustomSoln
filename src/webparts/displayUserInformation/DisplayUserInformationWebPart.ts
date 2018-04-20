import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'DisplayUserInformationWebPartStrings';
import DisplayUserInformation from './components/DisplayUserInformation';
import { IDisplayUserInformationProps } from './components/IDisplayUserInformationProps';

export interface IDisplayUserInformationWebPartProps {
  description: string;
}

export default class DisplayUserInformationWebPart extends BaseClientSideWebPart<IDisplayUserInformationWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IDisplayUserInformationProps > = React.createElement(
      DisplayUserInformation,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
