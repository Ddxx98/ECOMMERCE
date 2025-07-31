import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AdbIcon from '@mui/icons-material/Adb';

import CartDialog from '../Cart/Cart';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext'; 

import { useSelector } from 'react-redux';

const pages = ['Home', 'Store', 'About', 'Contact'];

function Header() {
  const { totalQuantity } = useSelector((state) => state.cart);
  const [cartOpen, setCartOpen] = useState(false);
  // const { totalQuantity } = useCart();
  const { isLoggedIn, logout, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate('/'); 
  };

  return (
    <>
      <AppBar
        position="sticky"
        color="primary"
        elevation={1}
        sx={{
          background: (theme) =>
            `linear-gradient(90deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main} 100%)`,
          color: (theme) => theme.palette.text.primary,
        }}
      >
        <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Left: Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Home
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 2, display: 'flex', justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  backgroundColor: (theme) => theme.palette.primary.main,
                  fontWeight: 700,
                  mx: 1,
                  letterSpacing: 1,
                  borderRadius: 2,
                  transition: 'background 0.2s, color 0.2s',
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.secondary.main,
                    color: (theme) => theme.palette.background.default,
                  },
                  textDecoration: 'none',
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
            {isLoggedIn ? (
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleLogout}
                sx={{
                  fontWeight: 700,
                  px: 2,
                  borderRadius: 2,
                  mr: 2,
                  height: 40,
                  borderColor: (theme) => theme.palette.secondary.main,
                  color: (theme) => theme.palette.secondary.main,
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.secondary.main,
                    color: (theme) => theme.palette.background.default,
                  },
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                color="secondary"
                variant="contained"
                component={Link}
                to="/auth"
                sx={{
                  fontWeight: 700,
                  px: 2,
                  borderRadius: 2,
                  mr: 2,
                  height: 40,
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  color: (theme) => theme.palette.background.default,
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.background.default,
                    color: (theme) => theme.palette.secondary.main,
                    border: '1px solid',
                  },
                }}
              >
                Login
              </Button>
            )}

            {/* Shopping Cart Icon */}
            <IconButton
              color="secondary"
              aria-label="open shopping cart"
              sx={{ position: 'relative' }}
              disabled={totalQuantity === 0}
              onClick={() => setCartOpen(true)}
            >
              <AddShoppingCartIcon />
              {totalQuantity > 0 && (
                <Box
                  component="span"
                  sx={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    backgroundColor: 'error.main',
                    borderRadius: '50%',
                    px: 0.6,
                    py: 0,
                    fontSize: '0.75rem',
                    color: 'white',
                    fontWeight: 'bold',
                    userSelect: 'none',
                  }}
                >
                  {totalQuantity}
                </Box>
              )}
            </IconButton>
          </Box>
        </Container>
      </AppBar>

      {/* Cart Dialog */}
      <CartDialog open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export default Header;
