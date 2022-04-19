import { useState } from 'react';
import { useRemoveLink } from '../behaviors/use-remove-link';
import { Link } from '../utils/shapes';

export interface LinkListItemProps {
  link: Link;
  onRemove: (link: Link) => void;
}

export const LinkListItem = ({ link, onRemove }: LinkListItemProps) => {
  const removeLink = useRemoveLink();

  const [removingLink, setRemovingLink] = useState(false);

  return (
    <li className="rounded-lg">
      <div className="w-full flex align-middle flex-col lg:flex-row">
        <div className="w-full p-2 flex flex-col">
          <dl className="flex flex-row">
            <dt className="font-bold pr-2">Shortened:</dt>
            <dd>{link.short_url}</dd>
          </dl>
          <dl className="flex flex-row">
            <dt className="font-bold pr-2">Original:</dt>
            <dd className="truncate w-full lg:w-96">{link.url}</dd>
          </dl>
        </div>
        <div className="my-auto">
          <button
            className="w-full lg:w-20  text-rose-500 border-2 border-rose-500 p-2 rounded-lg"
            onClick={(e) => {
              e.preventDefault();
              setRemovingLink(true);
            }}>
            <span>Remove</span>
          </button>
        </div>
      </div>
      <hr className="mt-2" />
      {removingLink && (
        <div className="fixed top-0 left-0 h-screen w-full flex flex-col items-center justify-center bg-cyan-500">
          <div
            className="h-screen w-full absolute flex items-center justify-center bg-modal"
            onClick={(e) => {
              e.preventDefault();
              setRemovingLink(false);
            }}>
            <div className="bg-white rounded shadow p-8 m-4 max-w-xs max-h-full text-center">
              <div className="mb-4">
                <h1>Remove Link?</h1>
              </div>
              <div className="mb-8">
                <p>
                  Are you sure you want to remove the shortened link for{' '}
                  {link.slug}?
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  className="w-full lg:w-20 flex-no-shrink text-white py-2 px-4 rounded bg-rose-500 hover:bg-rose-500"
                  onClick={async (e) => {
                    e.preventDefault();

                    await removeLink(link.slug);
                    onRemove(link);
                  }}>
                  Let's Do It
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};
