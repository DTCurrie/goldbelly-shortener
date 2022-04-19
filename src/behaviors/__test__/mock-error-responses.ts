import { ResponseComposition, RestContext, RestRequest } from 'msw';

export const createErrorMock = (
  _req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext
) => res(ctx.status(403, 'Access denied!'));
