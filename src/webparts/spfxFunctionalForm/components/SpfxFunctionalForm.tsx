import * as React from 'react';
// import styles from './SpfxFunctionalForm.module.scss';
import type { ISpfxFunctionalFormProps } from './ISpfxFunctionalFormProps';
import type { ISpfxFunctionalFormState } from './ISpfxFunctionalFormState';
import {Web} from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Dialog } from '@microsoft/sp-dialog';
import { PrimaryButton, Slider, TextField } from '@fluentui/react';
import {  PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
const SpfxFunctionalForm:React.FC<ISpfxFunctionalFormProps>=(props)=>{
  const [formdata,setFormData]=React.useState<ISpfxFunctionalFormState>({
    Name:"",
    Age:"",
    Score:0,
    Email:"",
    FullAddress:"",
    Salary:"",
    Manager:[],
    ManagerId:[],
    Admin:"",
    AdminId:""
  });
  // Create form Function

  const createItems=async()=>{
    try{
// /get siteurl
const web=Web(props.siteurl);// this will hold url of your site
const list=web.lists.getByTitle(props.ListName);
const item=await list.items.add({
  Title:formdata.Name,
  Age:parseInt(formdata.Age),
  Salary:parseFloat(formdata.Salary),
  Score:formdata.Score,
  EmailAddress:formdata.Email,
  Address:formdata.FullAddress,
  AdminId:formdata.AdminId,
  ManagerId:{results:formdata.ManagerId}
});

Dialog.alert(`Item is created with id ${item.data.Id}`);
console.log(item);
setFormData({
  Name:"",
  Age:"",
  Score:0,
  Email:"",
  FullAddress:"",
  Salary:"",
  Manager:[],
  ManagerId:[],
  Admin:"",
  AdminId:""
})
    }
    catch(err){
Dialog.alert(`Error is ${err}`);
    }
   
  }
  // Event handling
  const handleChange=(fieldValue:keyof ISpfxFunctionalFormState,value:string|number|boolean)=>{
    setFormData(prev=>({...prev,[fieldValue]:value})); //[1,2,3,4] =>[...a[3]]
  }
//Get Admins
const getAdmins=(items:any[])=>{
  if(items.length>0){
    setFormData(prev=>({...prev,Admin:items[0].text,AdminId:items[0].id}));
  }
  else{
    setFormData(prev=>({...prev,Admin:"",AdminId:""}));
  }
}
//get managers
const getManagers=(items:any)=>{
  const managersName=items.map((i:any)=>i.text)
  const managersNameId=items.map((i:any)=>i.id);
  setFormData(prev=>({...prev,Manager:managersName,ManagerId:managersNameId}));
}
  return(
    <>
    <TextField label='Name'
    value={formdata.Name}
    onChange={(_,val)=>handleChange("Name",val||"")}
    />
     <TextField label='Email'
    value={formdata.Email}
    onChange={(_,val)=>handleChange("Email",val||"")}
    />
     <TextField label='Age'
    value={formdata.Age}
    onChange={(_,val)=>handleChange("Age",val||"")}
    />
     <TextField label='Salary'
    value={formdata.Salary}
    onChange={(_,val)=>handleChange("Salary",val||"")}
    prefix="$"
    />
    <Slider
    label='Score'
    min={0}
    max={100}
    value={formdata.Score}
    onChange={(val)=>handleChange("Score",val)}
    />
     <TextField label='Full Address'
    value={formdata.FullAddress}
    onChange={(_,val)=>handleChange("FullAddress",val||"")}
    rows={5}
    multiline
    />
    {/* Single selected people picker */}
    <PeoplePicker
    context={props.context as any}
    titleText="Admin"
    personSelectionLimit={1}
    showtooltip={true}
   ensureUser={true}
    onChange={getAdmins}
  defaultSelectedUsers={[formdata.Admin?formdata.Admin:""]}
    principalTypes={[PrincipalType.User]}
    resolveDelay={1000} 
    webAbsoluteUrl={props.siteurl}
    />
     {/* multi selected people picker */}
    <PeoplePicker
    context={props.context as any}
    titleText="Managers"
    personSelectionLimit={2}
    showtooltip={true}
   ensureUser={true}
    onChange={getManagers}
  defaultSelectedUsers={formdata.Manager}
    principalTypes={[PrincipalType.User]}
    resolveDelay={1000} 
    webAbsoluteUrl={props.siteurl}
    />
    <br/>
    <PrimaryButton text="Save" onClick={createItems} iconProps={{iconName:'Save'}}/>
    </>
  )
}
export default SpfxFunctionalForm;