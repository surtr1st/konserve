declare type TAuthContent = {
  bearer: string;
  user: string;
  secret: string;
};
declare type TRequestHeaders = {
  authContent: TAuthContent;
  headers: HeadersInit;
};
