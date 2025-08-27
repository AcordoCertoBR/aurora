import classNames from 'classnames';
import { PureSwitch } from '../Pure';

import './styles.scss';
import { CardSwitchProps } from './types';

export const CardSwitch: React.FC<CardSwitchProps> = ({ isActive, label, id, disabled, activateCallBack, deactivateCallBack , shouldFadeOut }) => {
	
	const cardSwitchClassNames = classNames("au-card-switch",  {
		"au-card-switch--active": isActive,
		"au-card-switch--fade-out": shouldFadeOut
	});

	return (
    <div className={cardSwitchClassNames}>
			<PureSwitch 
				isActive={isActive}
				label={label}
				id={id}
				activateCallBack={activateCallBack}
				deactivateCallBack={deactivateCallBack}
				disabled={disabled}
			/>
    </div>
  )
}
