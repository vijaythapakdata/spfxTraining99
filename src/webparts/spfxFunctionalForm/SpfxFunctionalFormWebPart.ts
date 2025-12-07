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
   cityOptions:any;
}

export default class SpfxFunctionalFormWebPart extends BaseClientSideWebPart<ISpfxFunctionalFormWebPartProps> {

 

  public async render(): Promise<void> {
    const cityopt=await this.getLookupFieldOptions();
    const element: React.ReactElement<ISpfxFunctionalFormProps> = React.createElement(
      SpfxFunctionalForm,
      {
        ListName:this.properties.ListName,
        siteurl:this.context.pageContext.web.absoluteUrl,
        context:this.context,
         departmentOptions:await this.getChoiceFieldsOptions(this.context.pageContext.web.absoluteUrl,this.properties.ListName,'Department'),
         skillsOptions:await this.getChoiceFieldsOptions(this.context.pageContext.web.absoluteUrl,this.properties.ListName,'Skills'),
         genderOptions:await this.getChoiceFieldsOptions(this.context.pageContext.web.absoluteUrl,this.properties.ListName,"Gender"),
         cityOptions:cityopt
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
// get choice
private async getChoiceFieldsOptions(siteurl:string,ListName:string,fieldName:string):Promise<any>{
  try{
const response=await fetch(`${siteurl}/_api/web/lists/getbytitle('${ListName}')/fields?$filter=EntityPropertyName eq '${fieldName}'`,
  {
    method:'GET',
    headers:{
      'Accept':'application/json;odata=nometadata'
    }
  }
);
if(!response.ok){
  throw new Error(`Error fetching choice field options: ${response.status} - ${response.statusText}`);
}
const data=await response.json();
const choices=data.value[0].Choices;
return choices.map((choice:any)=>({
  key:choice,
  text:choice
}));
  }
  catch(err){
console.error('Error in getChoiceFieldsOptions:',err);
return [];
  }
}
//get Lookup
private async getLookupFieldOptions():Promise<any[]>{
  try{
const response=await fetch(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Cities')/items?$select=Title,ID`,{
  method:'GET',
  headers:{
    'Accept':'application/json;odata=nometadata'
  }
});
if(!response.ok){
  throw new Error(`Error fetching lookup field options: ${response.status} - ${response.statusText}`);
}
const data=await response.json();
return data.value.map((city:{ID:string,Title:string})=>({
  key:city.ID,
  text:city.Title
}));
  }
catch(err){
console.error('Error in getLookupFieldOptions:',err);
return [];
}
}
}
