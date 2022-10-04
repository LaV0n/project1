import React from "react";
import styles from "./ErrorPage.module.css"
import gif from "../../assets/image/419.gif"

export const ErrorPage = () => {
    return (
        <div className={styles.block}>
            <div>
                ERROR -=404=- PAGE
            </div>
            <img src={gif} alt={'0'}/>
        </div>
    )
}