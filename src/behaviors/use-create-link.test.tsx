import { renderHook } from '@testing-library/react';
import { server } from './__test__/server';
import { SwrWrapper } from './__test__/swr-wrapper';
import { useCreateLink, UseCreateLinkError } from './use-create-link';
import {
  createLinkApiErrorMock,
  createLinkMock,
} from './use-create-links.mock';

describe('useCreateLink()', () => {
  it('should create a link and return the data', async () => {
    const { result } = renderHook(() => useCreateLink(), {
      wrapper: SwrWrapper,
    });

    const data = await result.current({ ...createLinkMock });

    expect(data).toEqual(createLinkMock);
  });

  it('should return an error', async () => {
    server.use(createLinkApiErrorMock());

    const { result } = renderHook(() => useCreateLink(), {
      wrapper: SwrWrapper,
    });

    const data = await result.current({ ...createLinkMock });

    expect((data as UseCreateLinkError).errors.url?.[0]).toEqual(
      'has already been taken'
    );
  });
});
