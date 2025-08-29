export type CardSwitchProps = {
	label: string;
	id: string;
	isActive: boolean;
	disabled: boolean;
	activateCallBack: () => void;
	deactivateCallBack?: () => void;
	shouldFadeOutAfterActivate?: boolean;
	fadeOutDelayInSeconds?: number;
}