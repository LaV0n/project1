import { ReactComponent as FilterRemove } from '../../../assets/icons/packs/filterRemove.svg'
import style from './packsResetSettings.module.scss'
import { FC } from 'react';
export const PacksResetSettings: FC<PacksResetSettingsPropsType> = ({ onClick }) => (
   <button className={style.reset} onClick={onClick}>
      <FilterRemove className={style.reset__icon} />
   </button>
)
type PacksResetSettingsPropsType = {
   onClick: () => void
}