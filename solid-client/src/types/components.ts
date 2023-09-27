import { JSXElement } from 'solid-js';

export type TButton = {
  label: string;
  fill: BackColor;
  hoverFill: HoveredBackColor;
  color: ForeColor;
  textSize: TextSize;
  minWidth: MinimumWidth;
  maxWidth: MaxinumWidth;
  minHeight: MininumHeight;
  maxHeight: MaxinumHeight;
  disabled: boolean;
  onClick: UnknownCallback;
  className: string;
  icon: JSXElement;
  title: string;
};

export type TInput = {
  ref: SolidInputRef;
  value: string;
  name: string;
  label: string;
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
  children?: JSXElement;
  onBackdropClick?: UnknownCallback;
  onClose: UnknownCallback;
  className?: string;
  label?: string;
};

export type TNode = {
  src: string;
  onView: VoidCallback;
  onViewDetail: VoidCallback;
  className: string;
};

export type TNodeCreator = {
  onAdd: UnknownCallback;
};

export type TLeafCreator = TNodeCreator;

export type TLeaf = {
  type: 'full' | 'minimal';
  username: string;
  password: string;
  onCopyUsername: StringCallback;
  onCopyPassword: StringCallback;
  onExtraAction: VoidCallback;
};

export type TSection = {
  type: 'free' | 'toolbar' | 'body' | 'heading';
  children: JSXElement;
  className: string;
  label: string;
};

export type TAccount = {
  username: string;
  password: string;
};

export type TDetailNodePopup = {
  open: () => boolean;
  onClose: UnknownCallback;
  onBackdropClick: UnknownCallback;
  data: TAccount[];
};
