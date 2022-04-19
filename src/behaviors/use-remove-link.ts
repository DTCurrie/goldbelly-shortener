import { fetcher } from '../utils/fetcher';

export const useRemoveLink = () => {
  return (slug: string) =>
    fetcher(`links/${slug}`, {
      method: 'DELETE',
    });
};
