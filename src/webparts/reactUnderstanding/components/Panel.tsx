import * as React from 'react';
import { DefaultButton, Panel,TextField,PrimaryButton, Dropdown, ChoiceGroup } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
const PanelItem:React.FC<any>=()=>{
    const[isOpen,{setTrue:openPanel,setFalse:dismissPanel}]=useBoolean(false);
    return(
        <>
        <DefaultButton text="Open Panel" onClick={openPanel}/>
        <Panel
        headerText='Basic Panel'
        isOpen={isOpen}
        onDismiss={dismissPanel}
        closeButtonAriaLabel='Close'
        >
            <p>Write your content here</p>
              <TextField label='Name'
                        placeholder='enter your name'
                        iconProps={{iconName:'Contact'}}
                        />
                        <Dropdown
                        placeholder='--select--'
                        label='Department'
                        options={[
                            {key:'hr',text:'HR'},
                            {key:'it',text:'IT'},
                            {key:'finance',text:'Finance'},
                        ]}
                        />
                        <ChoiceGroup
                        label='Gender'
                        options={[
                            {key:'male',text:'Male'},
                            {key:'female',text:'Female'}
                        ]}
                        />
                        <TextField
                        label='Comments'
                        placeholder='enter your comments'
                        rows={4}
                        multiline
                        />
                        <br/>
                        <PrimaryButton text='Upload' onClick={()=>alert('File Uploaded')} iconProps={{iconName:'Upload'}}/>
            </Panel>
        </>
    )
}
export default PanelItem;