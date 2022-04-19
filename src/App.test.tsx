import { render, screen } from '@testing-library/react';
import App from './App';
import { SwrWrapper } from './behaviors/__test__/swr-wrapper';

test('renders Shortened URLs header', () => {
  render(<App />, { wrapper: SwrWrapper });
  const linkElement = screen.getByText(/Shortened URLs/i);
  expect(linkElement).toBeInTheDocument();
});
