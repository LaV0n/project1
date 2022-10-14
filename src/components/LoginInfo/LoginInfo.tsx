import { NavLink } from 'react-router-dom';
import { appPath } from '../../common/path/appPath';
import style from './loginInfo.module.scss'
import defaultAvatar from './../../assets/image/ava.png';
import {useAppSelector} from "../../app/store";
import usersIcon from "../../assets/icons/usersIcon.svg"

export const LoginInfo = () => {
   const userAvatar = useAppSelector(state => state.auth.data.avatar)
   const userName = useAppSelector(state => state.auth.data.name)

   return (
      <div className={style.login_info}>
          <NavLink to={appPath.USERS} >
              <img src={usersIcon} alt={'0'} className={style.login_info__users}/>
          </NavLink>
          <div className={style.login_info__profileBlock}>
              <NavLink className={style.login_info__nickname} to={appPath.PROFILE}>
                  {userName}
              </NavLink>
              <img
                  className={style.login_info__avatar}
                  src={userAvatar ? userAvatar : defaultAvatar}
                  alt="" />
          </div>
      </div>
   )
}