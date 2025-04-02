import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';



describe('App Component', () => {
  it('renders the login page when navigating to /login', () => {
  window.history.pushState({}, 'Login Page', '/login');
  render(<App />);
  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument(); // Find a heading with the text "Login"
});

 it('renders the registration page when navigating to /register', () => {
  window.history.pushState({}, 'Registration Page', '/register');
  render(<App />);
  expect(screen.getByRole('heading', { name: /create an account/i })).toBeInTheDocument();
});


it('renders the task form page when navigating to /taskform', () => {
  window.history.pushState({}, 'Task Form Page', '/taskform');
  render(<App />);
  expect(screen.getByRole('heading', { name: /Create New Task/i })).toBeInTheDocument();
});

it('renders the task list page when navigating to /tasklist', () => {
  window.history.pushState({}, 'Task List Page', '/tasklist');
  render(<App />);
  expect(screen.getByRole('heading', { name: /your tasks/i })).toBeInTheDocument();
});
});
