declare type TAuthContent = {
  bearer: string;
  user?: string;
  secret?: string;
};
declare type TRequestHeaders = {
  authContent: TAuthContent;
  headers: HeadersInit;
};
declare type TAuthHeaders = Omit<Partial<TAuthContent>, 'secret'>;
declare type TAuthParams = {
  username: string;
  password: string;
};