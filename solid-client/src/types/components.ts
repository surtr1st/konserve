import { JSXElement } from 'solid-js';

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
  onClick?: UnknownType;
  customClass?: string;
  icon?: JSXElement;
  title?: string;
};

export type TInput = {
  ref: SolidInputRef;
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
  onBackdropClick?: UnknownType;
};

export type TNode = {
  src: string;
  onView: VoidType;
  onViewDetail: VoidType;
};

export type TNodeCreator = {
  onAdd: UnknownType;
};
