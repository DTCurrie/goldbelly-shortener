export type FetcherError = {
  status: number;
  statusText: string;
};

export const fetcher = async <
  Data extends unknown,
  FetchError extends FetcherError | unknown
>(
  url: string,
  init?: RequestInit
) => {
  const headers = {
    'Content-Type': 'application/json',
    'GB-Access-Token': process.env.REACT_APP_API_KEY || '',
    ...init?.headers,
  };

  const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
    ...init,
    headers,
  });

  if (!response.ok) {
    try {
      const error = (await response.json()) as FetchError;
      console.error(`Error fetching ${url}`, error);
      return error;
    } catch (e) {
      const error = response.statusText;
      console.error(`Error fetching ${url}`, error);
      return {
        status: response.status,
        statusText: response.statusText,
      } as FetchError;
    }
  }

  try {
    return (await response.json()) as Data;
  } catch (e) {
    return response as Data;
  }
};
