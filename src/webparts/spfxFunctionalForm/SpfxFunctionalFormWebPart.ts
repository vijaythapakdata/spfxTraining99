import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'SpfxFunctionalFormWebPartStrings';
import SpfxFunctionalForm from './components/SpfxFunctionalForm';
import { ISpfxFunctionalFormProps } from './components/ISpfxFunctionalFormProps';

export interface ISpfxFunctionalFormWebPartProps {
  ListName: string;
}

export default class SpfxFunctionalFormWebPart extends BaseClientSideWebPart<ISpfxFunctionalFormWebPartProps> {

 

  public render(): void {
    const element: React.ReactElement<ISpfxFunctionalFormProps> = React.createElement(
      SpfxFunctionalForm,
      {
        ListName:this.properties.ListName,
        siteurl:this.context.pageContext.web.absoluteUrl,
        context:this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
                PropertyPaneTextField('ListName', {
                  label: strings.ListFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
