import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./Navbar.module.css"

export const Navbar = () => {
    return (
        <nav>
           <div className={styles.panel}>
               <NavLink to="/login" className={styles.link}>login</NavLink>
               <NavLink to="/registration" className={styles.link}>registration</NavLink>
               <NavLink to="/profile" className={styles.link}>profile</NavLink>
               <NavLink to="/error" className={styles.link}>404</NavLink>
               <NavLink to="/restorepassword" className={styles.link}>restore password</NavLink>
               <NavLink to="/newpassword/:token" className={styles.link}>new password</NavLink>
               <NavLink to="/testpage" className={styles.link}>test page</NavLink>
           </div>
        </nav>
    )
}