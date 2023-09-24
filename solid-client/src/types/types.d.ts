declare type UnknownType = () => unknown | Promise<unknown>;
declare type VoidType = () => void | Promise<void>;
declare type StringType = () => string | Promise<String>;
declare type SolidInputRef =
  | HTMLInputElement
  | ((el: HTMLInputElement) => undefined)
  | undefined;
