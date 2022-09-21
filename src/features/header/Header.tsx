import logo from '../../assets/image/incubatorLogo.svg'
import style from './header.module.scss'
import {NavLink} from 'react-router-dom';
import {appPath} from '../../common/path/appPath';
import {LoginInfo} from '../../components/LoginInfo/LoginInfo';
import {useAppSelector} from '../../app/store';

export const Header = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)

    return (
        <div className={style.header}>
            <div className={style.container}>
                <NavLink to={isAuth ? appPath.PROFILE : appPath.LOGIN}>
                    <img className={style.header__logo} src={logo} alt="incubator logo"/>
                </NavLink>
                {
                    isAuth ? <LoginInfo/>
                        :
                        <NavLink className={style.header__link} to={appPath.LOGIN}>
                     <span>
                        Sign in
                     </span>
                        </NavLink>
                }
            </div>
        </div>
    )
}

