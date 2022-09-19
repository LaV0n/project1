import { NavLink } from 'react-router-dom';
import { appPath } from '../../common/path/appPath';
import style from './loginInfo.module.scss'
export const LoginInfo = () => {
   const userAvatar = false
   const userName = 'Dream Team'
   const defaultAvatar = "https://static.vecteezy.com/system/resources/thumbnails/008/215/293/small/funny-funky-monkey-line-pop-art-logo-colorful-design-with-dark-background-abstract-illustration-isolated-black-background-for-t-shirt-poster-clothing-merch-apparel-badge-design-vector.jpg"
   return (
      <div className={style.login_info}>
         <NavLink className={style.login_info__nickname} to={appPath.PROFILE}>
            {userName}
         </NavLink>
         <img
            className={style.login_info__avatar}
            src={userAvatar ? userAvatar : defaultAvatar}
            alt="" />
      </div>
   )
}