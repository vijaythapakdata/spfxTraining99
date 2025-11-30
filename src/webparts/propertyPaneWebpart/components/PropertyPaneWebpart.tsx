import * as React from 'react';
// import styles from './PropertyPaneWebpart.module.scss';
import type { IPropertyPaneWebpartProps } from './IPropertyPaneWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { PrimaryButton } from '@fluentui/react';

const PropertyPaneWebpart:React.FC<IPropertyPaneWebpartProps>=(props)=>{
const [results,setResults]=React.useState<string>("");
  // declaration of function or method in functional componnt

  const myInfo=async()=>{
    const myName="Vijay Thapak";
    console.log(myName);
  
    let age=36;
    console.log(age);
    age=age+5;
    console.log(age); //41
    var name="Vijay";
    console.log(name);
    name="Vijay Thapak"
    console.log(name);
    return "Hello I am vijay thapak"
   
  }

  // call the function on the onlick propety of button
  const handleClick=async()=>{
    const result=await myInfo();
    setResults(result);
  

  }
  return(
    <>
    <div>
      <strong>ListName: </strong>{escape(props.ListName)}
    </div>
    <div>
      <strong>Toggle Options:</strong>{props.ToggleOption?'Yes':'No'}
    </div>
    <div><strong>Department:</strong>{escape(props.DepartmentOptions)}</div>
      <div><strong>Gender:</strong>{escape(props.GenderOptions)}</div>
        <div><strong>Pages:</strong>{escape(props.SliderOptions)}</div>
        <br/>
       <PrimaryButton text='Click me' onClick={handleClick}/>
        <div>
          <strong>Result:</strong>{results}
        </div>
        {}
    </>
  )
}
export default PropertyPaneWebpart; 
