import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './Theme';
import App from './App';
import { store } from './store/index';

// Mock useAuth to avoid needing AuthProvider in tests
vi.mock('./context/AuthContext', () => ({
  useAuth: () => ({ isLoggedIn: true }),
}));

describe('App Component', () => {
  it('renders "Home" text in the app', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={Theme}>
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    const homeElements = screen.getAllByText(/home/i);
    expect(homeElements.length).toBeGreaterThan(0);

  });
});
