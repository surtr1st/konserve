declare type CreateOrUpdate = 'create' | 'update';
declare type UnknownCallback = () => unknown | Promise<unknown>;
declare type VoidCallback = () => void | Promise<void>;
declare type StringCallback = () => string | Promise<string>;
declare type BooleanCallback = () => boolean | Promise<boolean>;
declare type SolidInputRef =
  | HTMLInputElement
  | ((el: HTMLInputElement) => undefined)
  | undefined;
