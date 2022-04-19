import { FormEventHandler, useRef, useState } from 'react';
import { useLinks } from '../behaviors/use-links';
import { Link } from '../utils/shapes';
import {
  useCreateLink,
  UseCreateLinkError,
} from '../behaviors/use-create-link';

export const CreateLinkForm = () => {
  const { data: links, mutate } = useLinks();
  const createLink = useCreateLink();

  const formRef = useRef<HTMLFormElement | null>();

  const urlRef = useRef<HTMLInputElement | null>();
  const slugRef = useRef<HTMLInputElement | null>();

  const [urlError, setUrlError] = useState<string | undefined>();
  const [slugError, setSlugError] = useState<string | undefined>();

  const handleSubmit: FormEventHandler = async (e) => {
    const valid = formRef.current?.checkValidity();

    e.preventDefault();
    e.stopPropagation();

    if (!valid || !urlRef.current || !slugRef.current) {
      setUrlError(
        'Unable to shorten your link at this moment, please try again.'
      );
      return;
    }

    setUrlError(undefined);
    setSlugError(undefined);

    const response = await createLink({
      url: urlRef.current.value,
      slug: slugRef.current.value,
    });

    if ((response as UseCreateLinkError).errors) {
      const {
        errors: { url, slug },
      } = response as UseCreateLinkError;

      if (url) {
        setUrlError(url.join(', '));
      }

      if (slug) {
        setSlugError(slug.join(', '));
      }

      return;
    }

    urlRef.current.value = '';
    slugRef.current.value = '';

    const next = [...(links || []), response as Link];
    mutate([...next]);
  };

  return (
    <div className="create-link-form">
      <h1 className="text-3xl font-bold text-center">URL Shortener</h1>
      <div className="flex w-full">
        <form
          className="w-full flex flex-col lg:flex-row justify-center"
          ref={(instance) => (formRef.current = instance)}
          onSubmit={handleSubmit}>
          <div className="w-full p-2">
            <label id="urlLabel" htmlFor="url">
              <span className="sr-only">URL to shorten</span>
              <input
                aria-labelledby="urlLabel"
                className="w-full p-2 border-b-2 border-cyan-500 focus:outline-cyan-500 text-black"
                id="url"
                name="url"
                placeholder="URL to shorten"
                ref={(instance) => (urlRef.current = instance)}
                required
                type="url"
              />
            </label>

            {urlError && <p className="text-rose-500">{urlError}</p>}
          </div>

          <div className="p-2">
            <label id="slugLabel" htmlFor="slug">
              <span className="sr-only">Slug (optional)</span>
              <input
                aria-labelledby="slugLabel"
                className="w-full lg:w-40 p-2 border-b-2 border-cyan-500 focus:outline-cyan-500 text-black"
                id="slug"
                name="slug"
                pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
                placeholder="Slug (optional)"
                ref={(instance) => (slugRef.current = instance)}
                type="text"
              />
            </label>

            {slugError && <p className="text-rose-500">{slugError}</p>}
          </div>

          <div className="my-auto">
            <button
              className="w-full lg:w-20 lg:ml-2 border-2 border-cyan-500 p-2 text-cyan-500 hover:text-white hover:bg-cyan-500 rounded-lg"
              type="submit">
              <span>Go!</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
