export type CardSwitchProps = {
	label: string;
	id: string;
	isActive: boolean;
	disabled: boolean;
	activateCallBack: () => void;
	deactivateCallBack?: () => void;
	shouldFadeOut?: boolean;
	fadeOutDelayInSeconds?: number;
}