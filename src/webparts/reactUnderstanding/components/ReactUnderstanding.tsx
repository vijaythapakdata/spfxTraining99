import * as React from 'react';
// import styles from './ReactUnderstanding.module.scss';
import type { IReactUnderstandingProps } from './IReactUnderstandingProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import ButtonClick from './Button';
// import { Panel } from '@fluentui/react';
import PanelItem from './Panel';
const  ReactUnderstanding:React.FC<IReactUnderstandingProps>=(props)=>{
  return(
    <>
    {/* Calling child component */}
    <p>I am just a paragrpah</p>
    <ButtonClick />
    {/* Calling panel */}
    <br/>
    {/* <Panel/> */}
    <PanelItem/>
    </>
  )
}
export default  ReactUnderstanding;