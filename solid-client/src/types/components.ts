import { JSXElement } from 'solid-js';

export type TDialog = {
  open: () => boolean;
  onClose?: UnknownCallback;
  onBackdropClick?: UnknownCallback;
};

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
  textSize: TextSize;
};

export type TModal = TDialog & {
  fill?: BackColor;
  color?: ForeColor;
  children?: JSXElement;
  className?: string;
  label?: string;
  bodyClass?: string;
  zIndex?: string;
  backdropZIndex?: string;
};

export type TNode = {
  src: string;
  onView: VoidCallback;
  onViewDetail: VoidCallback;
  onEdit: VoidCallback;
  onDelete: VoidCallback;
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

export type TDetailNodePopup = TDialog & {
  data: Leaf[];
};

export type TNodeActionPopup = TDialog & {
  type?: CreateOrUpdate;
  placeholder?: string;
};

export type TLeafActionPopup = TNodeActionPopup;
export type TVerifySecretCodePopup = TDialog;
export type TDeleteNodePopup = TDialog;
export type TAccountRegister = TAccount & {
  email: string;
  displayName: string;
};
