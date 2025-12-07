import * as React from 'react';
// import styles from './SpfxFunctionalForm.module.scss';
import type { ISpfxFunctionalFormProps } from './ISpfxFunctionalFormProps';
import type { ISpfxFunctionalFormState } from './ISpfxFunctionalFormState';
import {Web} from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Dialog } from '@microsoft/sp-dialog';
import { ChoiceGroup, DatePicker, Dropdown, IDatePickerStrings, IDropdownOption, PrimaryButton, Slider, TextField } from '@fluentui/react';
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
    AdminId:"",
    Gender:"",
    Department:"",
    City:"",
    Skills:[],
    DOB:null
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
  ManagerId:{results:formdata.ManagerId},
  CityId:formdata.City,
  Department:formdata.Department,
  Gender:formdata.Gender,
  Skills:{results:formdata.Skills},
  DOB:new Date(formdata.DOB)
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
  AdminId:"",
   Gender:"",
    Department:"",
    City:"",
    Skills:[],
    DOB:null
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
//skills change event
const onSkillsChange=(event:React.FormEvent<HTMLInputElement>,option:IDropdownOption):void=>{
  const selectedkey=option.selected?[...formdata.Skills,option.key as string]:formdata.Skills.filter((key)=>key!==option.key);
  setFormData(prev=>({...prev,Skills:selectedkey}));
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
    {/* Dropdown */}
    <Dropdown
    placeholder='--select--'
    options={props.departmentOptions}
    label='Department'
    selectedKey={formdata.Department}
    onChange={(_,val)=>handleChange("Department",val?.key as string)}
    />
       <Dropdown
    placeholder='--select--'
    options={props.cityOptions}
    label='City'
    selectedKey={formdata.City}
    onChange={(_,val)=>handleChange("City",val?.key as string)}
    />
       <ChoiceGroup
   
    options={props.genderOptions}
    label='Gender'
    selectedKey={formdata.Gender}
    onChange={(_,val)=>handleChange("Gender",val?.key as string)}
    />
      <Dropdown
    placeholder='--select--'
    options={props.skillsOptions}
    label='Skills'
    // selectedKey={formdata.City}
    defaultSelectedKeys={formdata.Skills}
    // onChange={(_,val)=>handleChange("City",val?.key as string)}
    onChange={onSkillsChange}
    multiSelect
    />
    <DatePicker
    label='Date of Birth'
    value={formdata.DOB}
    strings={DatePickerStrings}
    formatDate={FormaeDate}
    onSelectDate={(date)=>setFormData(prev=>({...prev,DOB:date}))}
    />
    <br/>
    <PrimaryButton text="Save" onClick={createItems} iconProps={{iconName:'Save'}}/>
    </>
  )
}
export default SpfxFunctionalForm;

export const DatePickerStrings:IDatePickerStrings={
  months:["January","February","March","April","May","June","July","August","September","October","November","December"],
  shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
  shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
  goToToday:"Go to today",
  prevMonthAriaLabel:"Go to previous month",
  nextMonthAriaLabel:"Go to next month",
  prevYearAriaLabel:"Go to previous year",
  nextYearAriaLabel:"Go to next year",
  
  
}

export const FormaeDate=(date:any):string=>{
  var date1=new Date(date);
  //get year
  var year =date1.getFullYear();
  //get month
  var month =(1+date1.getMonth()).toLocaleString();
  month=month.length>1?month:'0'+month;
  //get day
  var day =date1.getDate().toLocaleString();
  day=day.length>1?day:'0'+day;
  return month +"/"+day+"/"+year;
}