import { fireEvent, render, screen } from '@testing-library/react';
import { SwrWrapper } from '../behaviors/__test__/swr-wrapper';
import { CreateLinkForm } from './CreateLinkForm';

describe('CreateLinkForm', () => {
  it('should render header', () => {
    render(<CreateLinkForm />, { wrapper: SwrWrapper });
    const linkElement = screen.getByText(/url shortener/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('should submit a new link', async () => {
    jest.spyOn(global, 'fetch');

    render(<CreateLinkForm />, {
      wrapper: SwrWrapper,
    });

    fireEvent.change(screen.getByPlaceholderText(/url to shorten/i), {
      value: 'https://test.com',
    });

    fireEvent.change(screen.getByPlaceholderText(/slug \(optional\)/i), {
      value: 'test',
    });

    fireEvent.click(screen.getByText(/go!/i));

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}links`,
      {
        headers: {
          'Content-Type': 'application/json',
          'GB-Access-Token': process.env.REACT_APP_API_KEY,
        },
      }
    );
  });
});
