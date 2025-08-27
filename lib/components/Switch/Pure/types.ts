export type SwitchProps = {
  isActive: boolean;
	label: string;
	id: string;
	disabled: boolean;
	activateCallBack: () => void;
	deactivateCallBack?: () => void;
}