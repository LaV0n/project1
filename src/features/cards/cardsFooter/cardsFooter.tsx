import {FC} from "react";
import style from "./CardsFooter.module.scss";
import {CustomPagination} from "../../../components/CustomPagination/CustomPagination";
import {CustomSelect} from "../../../components/CustomSelect/CustomSelect";

export const CardsFooter: FC<CardsFooterPropsType> = ({ onChangePage, onChangePageCount, page, cardsTotalCount, pageCount }) => {
    return (
        <div className={style.footer}>
            <CustomPagination
                onClick={onChangePage}
                page={page}
                totalCount={cardsTotalCount}
                pageCount={pageCount}
            />
            <CustomSelect title={'Cards per Page'} onChange={onChangePageCount} defaultValue={pageCount} />
        </div>
    )
}
type CardsFooterPropsType = {
    onChangePage: (page: number) => void
    onChangePageCount: (pageCount: number) => void
    page: number
    cardsTotalCount: number
    pageCount: number
}