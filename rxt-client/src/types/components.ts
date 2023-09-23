import { ReactNode } from 'react';

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
};

export type TInput = {
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
  open: boolean;
  fill: BackColor;
  color: ForeColor;
  children: ReactNode;
};
