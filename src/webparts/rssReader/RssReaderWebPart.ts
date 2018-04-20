import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneCheckbox
} from '@microsoft/sp-webpart-base';
import * as strings from 'RssReaderWebPartStrings';
import RssReader from './components/RssReader';
import { IRssReaderProps } from './components/IRssReaderProps';

export interface IRssReaderWebPartProps {
  header: string;
  url:string;
  title:string;
  subtitle:string;
  description:string;
  noofitems:number;
  imagetemplate:boolean;
}

export default class RssReaderWebPart extends BaseClientSideWebPart<IRssReaderWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IRssReaderProps > = React.createElement(
      RssReader,
      {
        header: this.properties.header,
        url:this.properties.url,
        title:this.properties.title,                
        subtitle:this.properties.subtitle,  
        description:this.properties.description,  
        noofitems:this.properties.noofitems,    
        imagetemplate:this.properties.imagetemplate
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
  protected get disableReactivePropertyChanges(): boolean { 
    return true; 
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {            
              groupFields: [
                PropertyPaneTextField('header', {
                  label: strings.HeaderFieldLabel
                }),
                PropertyPaneTextField('url', {
                  label: strings.UrlFieldLabel
                }),
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneTextField('subtitle', {
                  label: strings.SubTitleFieldLabel
                }),
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneSlider('noofitems', {
                  max:50,
                  min:0,
                  showValue:true,
                  value:10,                  
                  label:strings.NoOfItemsFieldLabel
                }),                
                PropertyPaneCheckbox('imagetemplate',{
                  checked:false,                                  
                  text:strings.ImageTemplateFieldLabel              
                })
              ]              
            }
          ]
        }
      ]
    };
  }
}
