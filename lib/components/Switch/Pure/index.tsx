import './styles.scss';

import { SwitchProps } from './types';


export const PureSwitch: React.FC<SwitchProps> = ({ 
	isActive, 
	label, 
	id, 
	disabled,
	activateCallBack, 
	deactivateCallBack 
}) => {
	const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
		const isActivated = event.target.checked;

    if(isActivated) return activateCallBack();

		return deactivateCallBack?.()
  };
	
	return (
    <div className="au-switch">
      <label htmlFor={id} className="au-switch-label">
				<span>{label}</span>
				<div className="au-switch-container">
					<input
						id={id}
						type="checkbox"
						className="au-switch-checkbox"
						checked={isActive}
						onChange={handleToggle}
						role="switch"
						disabled={disabled}
					/>

					<div className="au-switch-track">
						<div className="au-switch-thumb" />
					</div>
				</div>
    </label>
    </div>
  )
}
