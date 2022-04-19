import { fetcher } from '../utils/fetcher';
import { Link } from '../utils/shapes';

export interface UseCreateLinkData {
  url: string;
  slug?: string;
}

export interface UseCreateLinkError {
  errors: {
    url?: string[];
    slug?: string[];
  };
}

export const useCreateLink = () => {
  return (data: UseCreateLinkData) =>
    fetcher<Link, UseCreateLinkError>('links', {
      method: 'POST',
      body: JSON.stringify(data),
    });
};
