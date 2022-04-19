import { renderHook } from '@testing-library/react';
import { FetcherError } from '../utils/fetcher';
import { server } from './__test__/server';
import { SwrWrapper } from './__test__/swr-wrapper';
import { useRemoveLink } from './use-remove-link';
import { removeLinkApiErrorMock } from './use-remove-link.mock';

describe('useRemoveLink()', () => {
  it('should remove a link and return the data', async () => {
    const { result } = renderHook(() => useRemoveLink(), {
      wrapper: SwrWrapper,
    });

    const data = await result.current('test');

    expect((data as Response).ok).toEqual(true);
  });

  it('should return an error', async () => {
    server.use(removeLinkApiErrorMock());

    const { result } = renderHook(() => useRemoveLink(), {
      wrapper: SwrWrapper,
    });

    const data = await result.current('test');

    expect((data as unknown as FetcherError).status).toEqual(403);
  });
});
