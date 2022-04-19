import { renderHook } from '@testing-library/react-hooks';
import { server } from './__test__/server';
import { SwrWrapper } from './__test__/swr-wrapper';
import { useLinks } from './use-links';
import { getLinksApiErrorMock, getLinksMock } from './use-links.mock';

describe('useLinks()', () => {
  it('should fetch the links', async () => {
    const { result, waitForValueToChange } = renderHook(() => useLinks(), {
      wrapper: SwrWrapper,
    });

    await waitForValueToChange(() => result.current.data);

    expect(result.current.data).toEqual(getLinksMock);
  });

  it('should return an error', async () => {
    server.use(getLinksApiErrorMock());
    jest.spyOn(console, 'error');

    renderHook(() => useLinks(), {
      wrapper: SwrWrapper,
    });

    expect(console.error).toHaveBeenCalled();
  });
});
