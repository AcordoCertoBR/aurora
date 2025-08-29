import classNames from 'classnames';
import { PureSwitch } from '../Pure';

import './styles.scss';
import { CardSwitchProps } from './types';

export const CardSwitch: React.FC<CardSwitchProps> = ({ isActive, label, id, disabled, activateCallBack, deactivateCallBack , shouldFadeOutAfterActivate }) => {
	
	const cardSwitchClassNames = classNames("au-card-switch",  {
		
	});

	const cardSwitchWrapperClassNames = classNames("au-card-switch-wrapper",  {
		"au-card-switch-wrapper--fade-out": shouldFadeOutAfterActivate && isActive,
		"au-card-switch-wrapper--active": isActive
	});

	return (
    <div className={cardSwitchClassNames}>
    <div className={cardSwitchWrapperClassNames}>
			<PureSwitch 
				isActive={isActive}
				label={label}
				id={id}
				activateCallBack={activateCallBack}
				deactivateCallBack={deactivateCallBack}
				disabled={disabled}
			/>
    </div>
</div>
  )
}
