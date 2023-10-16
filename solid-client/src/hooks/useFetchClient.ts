export function useFetchClient(baseUrl: string) {
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const onGet = (url: string, init?: RequestInit): Promise<Response> =>
    fetch(`${baseUrl}${url}`, {
      method: 'GET',
      ...init,
      headers: init?.headers || defaultHeaders,
    });

  const onPost = <T>(
    url: string,
    init?: Omit<RequestInit, 'body'>,
    body?: T,
  ): Promise<Response> =>
    fetch(`${baseUrl}${url}`, {
      method: 'POST',
      ...init,
      headers: init?.headers || defaultHeaders,
      body: JSON.stringify(body),
    });

  const onPut = <T>(
    url: string,
    init?: Omit<RequestInit, 'body'>,
    body?: T,
  ): Promise<Response> =>
    fetch(`${baseUrl}${url}`, {
      method: 'PUT',
      ...init,
      headers: init?.headers || defaultHeaders,
      body: JSON.stringify(body),
    });

  const onDelete = (url: string, init?: RequestInit): Promise<Response> =>
    fetch(`${baseUrl}${url}`, {
      method: 'DELETE',
      ...init,
      headers: init?.headers || defaultHeaders,
    });

  return {
    onGet,
    onPost,
    onPut,
    onDelete,
  };
}
