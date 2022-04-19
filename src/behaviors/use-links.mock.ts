import { rest } from 'msw';
import { Link } from '../utils/shapes';
import { createErrorMock } from './__test__/mock-error-responses';

const endpoint = `${process.env.REACT_APP_API_URL}links`;

export const getLinksMock: Link[] = [
  {
    url: 'https://test.com',
    slug: 'check-this-cool-test',
    short_url: 'http://bely.me/check-this-cool-test',
  },
  {
    url: 'https://example.com',
    slug: 'check-this-other-test',
    short_url: 'http://bely.me/check-this-other-test',
  },
];

export const getLinksApiMock = () =>
  rest.get(endpoint, (_req, res, ctx) => res(ctx.json(getLinksMock)));

export const getLinksApiErrorMock = () => rest.get(endpoint, createErrorMock);
