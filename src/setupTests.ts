import '@testing-library/jest-dom';
import { server } from './behaviors/__test__/server';

beforeAll(() => server.listen());
beforeEach(() => (global.console.error = jest.fn()));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
