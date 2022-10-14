import {CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material"
import styles from "./UsersTable.module.scss"
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import React, {useEffect} from "react";
import {getUsersTC, setPage, setPageCount} from "../usersReducer";
import {CustomSelect} from "../../../../components/CustomSelect/CustomSelect";
import {CustomPagination} from "../../../../components/CustomPagination/CustomPagination";
import defaultAvatar from "../../../../assets/image/ava.png"

const formatDate = (dateCard: string) => {
    const date = new Date(dateCard)
    const yyyy = date.getFullYear();
    let mm: any = date.getMonth() + 1;
    let dd: any = date.getDate();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return `${dd}.${mm}.${yyyy}`
}

export const UsersTable = () => {

    const users = useAppSelector(state => state.users.data.users)
    const dispatch = useAppDispatch()
    const page = useAppSelector(state => state.users.page)
    const usersTotalCount = useAppSelector(state => state.users.data.usersTotalCount)
    const pageCount = useAppSelector(state => state.users.pageCount)
    const status = useAppSelector(state => state.users.status)

    const onChangePage = (page: number) => {
        dispatch(setPage(page))
    }
    const onChangePageCount = (pageCount: number) => {
        dispatch(setPageCount(pageCount))
    }

    useEffect(() => {
        dispatch(getUsersTC({pageCount, page}))
    }, [page, pageCount])

    return (
        <div className={styles.container}>
            {status && <CircularProgress style={{zIndex: '3', position: 'absolute', left: '50vw', top: '50vh'}}/>}
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead className={styles.tableHeader}>
                        <TableRow>
                            <TableCell>Users</TableCell>
                            <TableCell align="right">email</TableCell>
                            <TableCell align="right">date</TableCell>
                            <TableCell align="right">cards packs</TableCell>
                            <TableCell align="right">is Admin</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell className={styles.nameBlock}>
                                    <img src={user.avatar ? user.avatar : defaultAvatar} alt={'0'}
                                         className={styles.avatar} />
                                    <div>{user.name}</div>
                                </TableCell>
                                <TableCell align="right">{user.email}</TableCell>
                                <TableCell align="right">{formatDate(user.updated)}</TableCell>
                                <TableCell align="right">{user.publicCardPacksCount}</TableCell>
                                <TableCell align="right">{user.isAdmin ? 'admin' : 'user'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={styles.paginator}>
                <CustomPagination onClick={onChangePage}
                                  page={page}
                                  totalCount={usersTotalCount}
                                  pageCount={pageCount}/>
                <CustomSelect title={'Users per Page'} onChange={onChangePageCount} defaultValue={pageCount}/>
            </div>
        </div>
    )
}