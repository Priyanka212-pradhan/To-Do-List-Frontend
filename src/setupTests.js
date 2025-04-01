// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// src/setupTests.js
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  BrowserRouter: MemoryRouter,
  Routes: jest.fn(),
  Route: jest.fn(),
}));

