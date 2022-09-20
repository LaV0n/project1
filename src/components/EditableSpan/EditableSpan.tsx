import React, {ChangeEvent, useState} from 'react';
import edit from "../../assets/icons/Edit.png";
import {Button, TextField} from "@mui/material";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <div><TextField value={title}
                     onChange={changeTitle}
                     autoFocus
                     label="Nickname"
                     variant="standard"
                    />
            <Button variant='contained'
                    onClick={activateViewMode}
                    size='small'
            >SAVE</Button>
        </div>
        : <span>{props.value}<img src={edit}
                                  style={{marginLeft:'15px',marginBottom:'-10px',cursor:'pointer'}}
                                  alt={'0'}
                                  onClick={activateEditMode}/></span>
});