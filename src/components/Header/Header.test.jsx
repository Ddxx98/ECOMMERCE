// Header.test.jsx
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Mock react-redux useSelector
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useSelector: vi.fn(),
  };
});
import { useSelector } from 'react-redux';

// Mock AuthContext
vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));
import { useAuth } from '../../context/AuthContext';

// Mock CartDialog to avoid rendering full dialog in tests
vi.mock('../Cart/Cart', () => ({
  __esModule: true,
  default: ({ open }) => (open ? <div data-testid="mock-cart-dialog">CartDialog Open</div> : null),
}));

import Header from './Header';

describe('Header Component', () => {
  const mockedUseSelector = useSelector;
  const mockedUseAuth = useAuth;

  beforeEach(() => {
    // Default mocks before each test
    mockedUseSelector.mockImplementation(() => ({ totalQuantity: 0 }));

    mockedUseAuth.mockImplementation(() => ({
      isLoggedIn: false,
      logout: vi.fn(),
      setIsLoggedIn: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('renders all navigation links/buttons', () => {
    render(<Header />, { wrapper: MemoryRouter });

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Store/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });

  it('shows Login button when user is not authenticated', () => {
    render(<Header />, { wrapper: MemoryRouter });
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows Logout button when user is authenticated', () => {
    mockedUseAuth.mockImplementation(() => ({
      isLoggedIn: true,
      logout: vi.fn(),
      setIsLoggedIn: vi.fn(),
    }));

    render(<Header />, { wrapper: MemoryRouter });
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('disables the cart button when totalQuantity is 0', () => {
    mockedUseSelector.mockImplementation(() => ({ totalQuantity: 0 }));

    render(<Header />, { wrapper: MemoryRouter });

    const cartButton = screen.getByLabelText(/open shopping cart/i);
    expect(cartButton).toBeDisabled();
  });

  it('enables the cart button when totalQuantity is greater than 0', () => {
    mockedUseSelector.mockImplementation(() => ({ totalQuantity: 3 }));

    render(<Header />, { wrapper: MemoryRouter });

    const cartButton = screen.getByLabelText(/open shopping cart/i);
    expect(cartButton).not.toBeDisabled();

    // Badge shows correct quantity
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('opens the CartDialog when cart icon is clicked', () => {
    mockedUseSelector.mockImplementation(() => ({ totalQuantity: 2 }));

    render(<Header />, { wrapper: MemoryRouter });

    const cartButton = screen.getByLabelText(/open shopping cart/i);
    fireEvent.click(cartButton);

    // The mocked CartDialog should be visible when open
    expect(screen.getByTestId('mock-cart-dialog')).toBeInTheDocument();
  });

  it('closes the CartDialog when dialog onClose is called', () => {
    mockedUseSelector.mockImplementation(() => ({ totalQuantity: 1 }));

    render(<Header />, { wrapper: MemoryRouter });

    // Open dialog
    const cartButton = screen.getByLabelText(/open shopping cart/i);
    fireEvent.click(cartButton);
    expect(screen.getByTestId('mock-cart-dialog')).toBeInTheDocument();

    // Close dialog
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(screen.queryByTestId('mock-cart-dialog')).toBeNull();
  });
});
