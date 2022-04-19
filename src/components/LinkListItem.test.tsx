import { fireEvent, render, screen } from '@testing-library/react';
import { SwrWrapper } from '../behaviors/__test__/swr-wrapper';
import { createLinkMock } from '../behaviors/use-create-links.mock';
import { LinkListItem } from './LinkListItem';

describe('LinkListItem', () => {
  it('should render header', () => {
    render(<LinkListItem link={createLinkMock} onRemove={jest.fn()} />, {
      wrapper: SwrWrapper,
    });

    const linkElement = screen.getByText(createLinkMock.url);

    expect(linkElement).toBeInTheDocument();
  });

  it('should open the remove modal', () => {
    render(<LinkListItem link={createLinkMock} onRemove={jest.fn()} />, {
      wrapper: SwrWrapper,
    });

    fireEvent.click(screen.getByText(/remove/i));

    expect(screen.getByText(/remove Link\?/i)).toBeInTheDocument();
  });

  it('should remove a link', async () => {
    jest.spyOn(global, 'fetch');

    render(<LinkListItem link={createLinkMock} onRemove={jest.fn()} />, {
      wrapper: SwrWrapper,
    });

    fireEvent.click(screen.getByText(/remove/i));
    fireEvent.click(screen.getByText(/let's do it/i));

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}links/check-this-cool-test`,
      {
        headers: {
          'Content-Type': 'application/json',
          'GB-Access-Token': process.env.REACT_APP_API_KEY,
        },
        method: 'DELETE',
      }
    );
  });
});
