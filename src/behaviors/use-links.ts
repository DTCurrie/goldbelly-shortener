import useSwr from 'swr';
import { fetcher, FetcherError } from '../utils/fetcher';
import { Link } from '../utils/shapes';

export const useLinks = () => {
  return useSwr<Link[], FetcherError>('links', fetcher);
};
