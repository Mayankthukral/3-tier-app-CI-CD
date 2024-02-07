// App.test.js

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import App from './App';

// Mocking axios post, get, and delete methods
jest.mock('axios');

test('renders the task manager app', () => {
  const { getByText, getByPlaceholderText } = render(<App />);

  expect(getByText('Task Manager')).toBeInTheDocument();
  expect(getByPlaceholderText('Task title')).toBeInTheDocument();
  expect(getByPlaceholderText('Task description')).toBeInTheDocument();
  expect(getByText('Add Task')).toBeInTheDocument();
});

test('adds a new task', async () => {
  // Mocking axios post method
  axios.post.mockResolvedValueOnce({ data: { _id: '1', title: 'New Task', description: 'New Description' } });

  const { getByText, getByPlaceholderText } = render(<App />);

  fireEvent.change(getByPlaceholderText('Task title'), { target: { value: 'New Task' } });
  fireEvent.change(getByPlaceholderText('Task description'), { target: { value: 'New Description' } });
  fireEvent.click(getByText('Add Task'));

  // Wait for the asynchronous operation to complete
  await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

  expect(getByText('New Task')).toBeInTheDocument();
  expect(getByText('New Description')).toBeInTheDocument();
});

// Add more tests for editing and deleting tasks if needed
