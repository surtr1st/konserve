declare type UnknownCallback = () => unknown | Promise<unknown>;
declare type VoidCallback = () => void | Promise<void>;
declare type StringCallback = () => string | Promise<string>;
declare type SolidInputRef =
  | HTMLInputElement
  | ((el: HTMLInputElement) => undefined)
  | undefined;