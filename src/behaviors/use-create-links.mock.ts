import { rest } from 'msw';
import { Link } from '../utils/shapes';

const endpoint = `${process.env.REACT_APP_API_URL}links`;

export const createLinkMock: Link = {
  url: 'https://test.com',
  slug: 'check-this-cool-test',
  short_url: 'http://bely.me/check-this-cool-test',
};

export const createLinkApiMock = () =>
  rest.post(endpoint, (_req, res, ctx) => res(ctx.json(createLinkMock)));

export const createLinkApiErrorMock = () =>
  rest.post(endpoint, (_req, res, ctx) =>
    res(
      ctx.json({
        errors: {
          url: ['has already been taken'],
          slug: ['has already been taken'],
        },
      })
    )
  );
