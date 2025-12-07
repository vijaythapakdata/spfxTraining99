import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISpfxFunctionalFormProps {
  ListName:string;
  siteurl:string;
  context:WebPartContext;
  departmentOptions:any; // single selected dropdwon
  skillsOptions:any; //multi selected dropdown
  genderOptions:any; //radio button
  cityOptions:any; //lookup

}
