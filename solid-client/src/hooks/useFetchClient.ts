export function useFetchClient() {
  const useDefaultHeaders = ({
    authContent,
    headers,
  }: Partial<TRequestHeaders>) => {
    const defaultHeaders = {
      Accept: 'application/json',
      Authorization: `Bearer ${authContent?.bearer || ''} ${
        authContent?.user || ''
      } ${authContent?.secret || ''}`,
      'Content-Type': 'application/json',
    } satisfies HeadersInit;
    return headers || defaultHeaders;
  };

  const onGet = (url: string, init?: RequestInit): Promise<Response> =>
    fetch(url, { method: 'GET', ...init });

  const onPost = <T>(
    url: string,
    init?: RequestInit,
    body?: T,
  ): Promise<Response> =>
    fetch(url, { method: 'POST', ...init, body: JSON.stringify(body) });

  const onPut = <T>(
    url: string,
    init?: RequestInit,
    body?: T,
  ): Promise<Response> =>
    fetch(url, { method: 'PUT', ...init, body: JSON.stringify(body) });

  const onDelete = (url: string, init?: RequestInit): Promise<Response> =>
    fetch(url, { method: 'DELETE', ...init });

  return {
    useDefaultHeaders,
    onGet,
    onPost,
    onPut,
    onDelete,
  };
}
