//import './styles.scss'

type SwitchProps = {
  isActive: boolean;
	activateCallBack: () => void;
	deactivateCallBack?: () => void;
	shouldFadeOut?: boolean;
	fadeOutDelayInSeconds?: number;
}

export const Switch: React.FC<SwitchProps> = ({ isActive, activateCallBack, deactivateCallBack , shouldFadeOut, fadeOutDelayInSeconds}) => {
  console.log(isActive)
  console.log(activateCallBack)
  console.log(deactivateCallBack)
  console.log(shouldFadeOut)
  console.log(fadeOutDelayInSeconds)
	
	return (
    <div className="au-spinner">
      
    </div>
  )
}
