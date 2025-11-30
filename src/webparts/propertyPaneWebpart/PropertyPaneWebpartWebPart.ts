import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,PropertyPaneToggle,PropertyPaneDropdown,PropertyPaneChoiceGroup,PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import * as strings from 'PropertyPaneWebpartWebPartStrings';
import PropertyPaneWebpart from './components/PropertyPaneWebpart';
import { IPropertyPaneWebpartProps } from './components/IPropertyPaneWebpartProps';

export interface IPropertyPaneWebpartWebPartProps {
  ListName: string;
  ToggleOption:boolean;
  DepartmentOptions:string;
 SliderOptions:number;
 GenderOptions:string;
}

export default class PropertyPaneWebpartWebPart extends BaseClientSideWebPart<IPropertyPaneWebpartWebPartProps> {



  public render(): void {
    const element: React.ReactElement<IPropertyPaneWebpartProps> = React.createElement(
      PropertyPaneWebpart,
      {
       ListName:this.properties.ListName,
       ToggleOption:this.properties.ToggleOption,
       DepartmentOptions:this.properties.DepartmentOptions,
        SliderOptions:this.properties.SliderOptions,
        GenderOptions:this.properties.GenderOptions
      }
    );

    ReactDom.render(element, this.domElement);
  }



// Non Reactive Propert pane Function
// protected get disableReactivePropertyChanges(): boolean {
//   return true;
// }


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
                }),
                PropertyPaneToggle('ToggleOption',{
                  label:"Toggle Option",
                  onText:"Yes",
                  offText:"No"
                }),
                PropertyPaneDropdown('DepartmentOptions',{
                  label:'Department',
                  options:[
                    {key:'HR',text:'HR'},
                    {key:'IT',text:'IT'},
                    {key:'Finance',text:'Finance'},
                  ]
                }),
                PropertyPaneChoiceGroup('GenderOptions',{
                  label:'Gender',
                  options:[
                    {key:'Male',text:'Male'},
                    {key:'Female',text:'Female'}
                  ]
                }),
                PropertyPaneSlider('SliderOptions',{
                  label:'Select Pages',
                  min:1,
                  max:100,
                  step:1,
                  showValue:true
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
