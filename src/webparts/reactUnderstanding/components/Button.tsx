import * as React from 'react';
// import { IReactUnderstandingProps } from './IReactUnderstandingProps';
import { Label, PivotItem, PrimaryButton, TextField } from '@fluentui/react';
// import { <StyleSet></StyleSet> } from '@fluentui/react';
import { IStyleSet,ILabelStyles,Pivot } from '@fluentui/react';

const labelStyles:Partial<IStyleSet<ILabelStyles>>={
    root:{
        marginTop: 10,
    }
}
const ButtonClick:React.FC<any>=(props)=>{
    return(
<>
{/* Button Declaration */}
<PrimaryButton text="Save" onClick={()=>alert("I am child component")} iconProps={{iconName:'save'}}/>
    <Pivot aria-label='Basic Pivot Item'>

        <PivotItem headerText='My Files' headerButtonProps={{
            'data-order': 1,
            'data-title': 'My Files',
            'aria-label': 'My Files'
        }}
        itemCount={101}
        itemIcon='Globe'>
            <Label styles={labelStyles}>Content for My Files</Label>
        </PivotItem>
         <PivotItem headerText='Recent' headerButtonProps={{
            'data-order': 2,
            'data-title': 'Recent',
            'aria-label': 'Recent'
        }} itemCount={56}
        itemIcon='Recent'>
            <Label styles={labelStyles}>Content for My Recent Files</Label>
            <TextField label='Name'
            placeholder='enter your name'
            iconProps={{iconName:'Contact'}}
            />
            <TextField
            label='Comments'
            placeholder='enter your comments'
            rows={4}
            multiline
            />
            <br/>
            <PrimaryButton text='Upload' onClick={()=>alert('File Uploaded')} iconProps={{iconName:'Upload'}}/>
        </PivotItem>
         <PivotItem headerText='Shared with me' headerButtonProps={{
            'data-order': 3,
            'data-title': 'Shared with me',
            'aria-label': 'Shared with me'
        }}
        itemCount={23}
        itemIcon='Ringer'>
            <Label styles={labelStyles}>Content for My shared with meFiles</Label>
        </PivotItem>
    </Pivot>
</>
    )

}
export default ButtonClick;