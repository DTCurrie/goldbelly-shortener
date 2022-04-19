import { rest } from 'msw';
import { createErrorMock } from './__test__/mock-error-responses';

const endpoint = `${process.env.REACT_APP_API_URL}links/:slug`;

export const removeLinkApiMock = () =>
  rest.delete(endpoint, (_req, res, ctx) => res(ctx.status(200)));

export const removeLinkApiErrorMock = () =>
  rest.delete(endpoint, createErrorMock);
