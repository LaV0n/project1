import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import editIcon from "../../../assets/icons/packs/edit.svg"
import deleteIcon from "../../../assets/icons/packs/trash.svg"
import learnIcon from "../../../assets/icons/packs/teach.svg"
import { useNavigate } from "react-router-dom";
import { appPath } from "../../../common/path/appPath";
import { deletePackFromCards, editPackNameFromCards, getCardsTC } from "../cardsReducer";
import { DeletePackModal } from '../../packs/PackModals/DeletePackModal/DeletePackModal';
import { EditPackModal } from '../../packs/PackModals/EditPackModal/EditPackModal';

const ITEM_HEIGHT = 36;

type BurgerMenuType = {
    _id: string
    packName: string
    status: boolean
}

export const BurgerMenu: FC<BurgerMenuType> = ({ _id, status, packName }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const cardsCount = useAppSelector(state => state.cards.data.cardsTotalCount)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const learnHandler = () => {
        setAnchorEl(null)
        navigate(appPath.LEARNINGDEFAULT + _id)
    }
    //delete pack
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
    const openDeleteModal = () => { setIsOpenDeleteModal(true) }
    const closeDeleteModal = () => { setIsOpenDeleteModal(false) }
    const deleteHandler = async () => {
        setAnchorEl(null)
        const action = await dispatch(deletePackFromCards(_id))
        if (deletePackFromCards.fulfilled.match(action)) {
            navigate(appPath.PACKS)
        }
    }
    //edit pack
    const [newPackName, setNewPackName] = useState('')
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const onChangePackName = (value: string) => { setNewPackName(value) }
    const openEditModal = () => {
        setNewPackName(packName)
        setIsOpenEditModal(true)
    }
    const closeEditModal = () => { setIsOpenEditModal(false) }
    const editHandler = async (isPrivate: boolean) => {
        setAnchorEl(null)
        const action = await dispatch(editPackNameFromCards({ name: newPackName, _id, private: isPrivate }))
        if (editPackNameFromCards.fulfilled.match(action)) {
            closeEditModal()
            dispatch(getCardsTC({ cardsPack_id: _id }))
        }
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
                <MoreVertIcon />
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
                <MenuItem onClick={openEditModal}>
                    <img src={editIcon} alt={'0'} style={{ marginRight: '10px' }} />
                    Edit
                </MenuItem>
                <MenuItem onClick={openDeleteModal}>
                    <img src={deleteIcon} alt={'0'} style={{ marginRight: '10px' }} />
                    Delete
                </MenuItem>
                <MenuItem onClick={learnHandler} disabled={cardsCount === 0}>
                    <img src={learnIcon} alt={'0'} style={{ marginRight: '10px' }} />
                    Learn
                </MenuItem>
            </Menu>
            <DeletePackModal
                isLoading={status}
                packName={packName}
                isOpen={isOpenDeleteModal}
                onClose={closeDeleteModal}
                onDeletePack={deleteHandler}
            />
            <EditPackModal
                cover='123'
                isLoading={status}
                packName={newPackName}
                isOpen={isOpenEditModal}
                onClosehandler={closeEditModal}
                setEditedPackHandler={editHandler}
                onChangeHandler={onChangePackName}
            />
        </div>
    );
}
