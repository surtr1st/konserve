export type TButton = {
  label?: string;
  fill?: BackColor;
  hoverFill?: HoveredBackColor;
  color?: ForeColor;
  textSize?: TextSize;
  minWidth?: MinimumWidth;
  maxWidth?: MaxinumWidth;
  minHeight?: MininumHeight;
  maxHeight?: MaxinumHeight;
  disabled?: boolean;
  onClick?: () => unknown | Promise<unknown>;
};

export type TInput = {
  ref: HTMLInputElement | ((el: HTMLInputElement) => undefined) | undefined;
  value: string;
  name: string;
  type: 'text' | 'email' | 'password';
  readonly: boolean;
  disabled: boolean;
  fill: BackColor;
  hoverFill: HoveredBackColor;
  color: ForeColor;
  textSize: TextSize;
};

export type TModal = {
  open: () => boolean;
  fill?: BackColor;
  color?: ForeColor;
  children?: Element;
  onBackdropClick?: () => unknown | Promise<unknown>;
};
