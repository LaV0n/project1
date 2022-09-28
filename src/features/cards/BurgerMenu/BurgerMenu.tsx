import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {FC} from "react";
import {useAppDispatch} from "../../../app/store";
import editIcon from "../../../assets/icons/packs/edit.svg"
import deleteIcon from "../../../assets/icons/packs/trash.svg"
import learnIcon from "../../../assets/icons/packs/teach.svg"
import {useNavigate} from "react-router-dom";
import {appPath} from "../../../common/path/appPath";
import {deletePackFromCards, editPackNameFromCards, getCardsTC} from "../cardsReducer";

const ITEM_HEIGHT = 36;

type BurgerMenuType = {
    _id: string
}

export const BurgerMenu: FC<BurgerMenuType> = ({_id}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const dispatch=useAppDispatch()
    const navigate = useNavigate()

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const editHandler = async () => {
        setAnchorEl(null)
       await dispatch(editPackNameFromCards({_id , name: 'illis legio' }))
        dispatch(getCardsTC({cardsPack_id:_id}))
    }
    const deleteHandler = () => {
        setAnchorEl(null)
        dispatch(deletePackFromCards(_id))
        navigate(appPath.PACKS)
    }
    const learnHandler = () => {
        setAnchorEl(null)
        alert(`learn pack#${_id}`)
    }

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem onClick={editHandler}>
                    <img src={editIcon} alt={'0'} style={{marginRight: '10px'}}/>
                    Edit
                </MenuItem>
                <MenuItem onClick={deleteHandler}>
                    <img src={deleteIcon} alt={'0'} style={{marginRight: '10px'}}/>
                    Delete
                </MenuItem>
                <MenuItem onClick={learnHandler}>
                    <img src={learnIcon} alt={'0'} style={{marginRight: '10px'}}/>
                    Learn
                </MenuItem>
            </Menu>
        </div>
    );
}
