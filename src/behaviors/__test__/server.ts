import { setupServer } from 'msw/node';
import { createLinkApiMock } from '../use-create-links.mock';
import { getLinksApiMock } from '../use-links.mock';
import { removeLinkApiMock } from '../use-remove-link.mock';

const handlers = [createLinkApiMock(), getLinksApiMock(), removeLinkApiMock()];

export const server = setupServer(...handlers);
