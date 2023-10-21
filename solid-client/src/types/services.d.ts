declare type TAuthContent = {
  bearer: string;
  user: string;
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
declare type TUserParams = {
  email: string;
  username: string;
  password: string;
  displayName: string;
  secretCode: string;
};
declare type TUserId = {
  userId?: number;
};
declare type TNodeParams = {
  name: string;
  uid: number;
};
declare type TLeafParams = TAuthParams & {
  nodeId: number;
};
declare type Nod3 = {
  id: number;
  name: string;
  uid: number;
};
declare type Leaf = {
  id: number;
  username: string;
  password: string;
  nodeId: number;
};
declare type ResponseError = {
  message: string;
};
