import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

// import { useCart } from '../../context/CartContext';
import CartDialog from '../Cart/Cart';

import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../store/Cart';

const merchProducts = [
  {
    title: 'The Generics Classic T-Shirt',
    price: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    description: 'Comfortable cotton tee with band logo.',
  },
  {
    title: 'The Generics Baseball Cap',
    price: 800,
    imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
    description: 'Stylish embroidered cap to shield you from the sun.',
  },
  {
    title: 'Limited Edition Band Poster',
    price: 500,
    imageUrl: 'https://images.unsplash.com/photo-1468071174046-657d9d351a40?auto=format&fit=crop&w=600&q=80',
    description: 'High-quality print poster for collectors.',
  },
  {
    title: 'The Generics Hoodie',
    price: 2500,
    imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
    description: 'Warm and cozy hoodie perfect for cold concerts.',
  },
  {
    title: 'Band Enamel Pin Set',
    price: 400,
    imageUrl: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80',
    description: 'Collectible pin set featuring band icons.',
  },
  {
    title: 'The Generics Tote Bag',
    price: 1000,
    imageUrl: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    description: 'Eco-friendly and practical tote bag for everyday use.',
  }
];

// Music products array (example)
const musicProducts = [
  {
    title: 'Jazz Classics',
    price: 200,
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Rock Anthems',
    price: 150,
    imageUrl: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Pop Hits',
    price: 120,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Classical Faves',
    price: 180,
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
  }
];

function ProductPage() {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalPrice } = useSelector((state) => state.cart);

  // const { addItem, totalQuantity } = useCart();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [cartOpen, setCartOpen] = useState(false);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setSnackbarMessage(`Added "${product.title}" to cart.`);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  // ENHANCED: Use title as id in the URL (encodeURIComponent for safety)
  const renderSection = (title, icon, products) => (
    <Box sx={{ mb: 6 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 3,
        }}
      >
        {icon}
        <Typography
          variant="h5"
          sx={{
            color: (theme) => theme.palette.text.primary,
            fontWeight: 700,
            letterSpacing: 1,
            borderBottom: (theme) => `3px solid ${theme.palette.secondary.main}`,
            pb: 1,
            maxWidth: 'fit-content',
            mx: 2,
            textAlign: 'center',
          }}
        >
          {title}
        </Typography>
      </Box>
      <Grid container spacing={4} justifyContent="center">
        {products.map((product, idx) => (
          <Grid item xs={12} sm={6} md={6} lg={6} key={idx}> {/* <-- Add Grid sizing */}
            <Card
              sx={{
                maxWidth: 345,
                backgroundColor: (theme) => theme.palette.background.paper,
                borderRadius: 3,
                boxShadow: 3,
                mx: 'auto',
              }}
            >
              {/* Wrap image in Link to product details */}
              <Link
                to={`/product/${encodeURIComponent(product.title)}`}
                style={{ textDecoration: "none" }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.imageUrl}
                  alt={product.title}
                  sx={{ objectFit: 'cover', cursor: 'pointer', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 6 } }}
                />
              </Link>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ color: (theme) => theme.palette.text.primary, fontWeight: 600 }}
                >
                  {product.title}
                </Typography>
                {/* Optionally show a description */}
                {product.description && (
                  <Typography
                    variant="body2"
                    sx={{ color: (theme) => theme.palette.text.secondary, mb: 1 }}
                  >
                    {product.description}
                  </Typography>
                )}
                <Typography variant="body1" sx={{ color: (theme) => theme.palette.secondary.main }}>
                  ₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: '#fff',
                    fontWeight: 700,
                    letterSpacing: 1,
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.secondary.main,
                      color: (theme) => theme.palette.background.default,
                    },
                  }}
                  onClick={() => handleAddToCart(product)}
                >
                  Add To Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <>
      <Box sx={{ backgroundColor: (theme) => theme.palette.background.default, minHeight: '100vh', py: 4 }}>
        {renderSection('Merch', <LocalMallIcon sx={{ color: (theme) => theme.palette.secondary.main, mr: 1 }} />, merchProducts)}
        {renderSection('Music', <MusicNoteIcon sx={{ color: (theme) => theme.palette.secondary.main, mr: 1 }} />, musicProducts)}

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            size="large"
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 700,
              backgroundColor: (theme) => theme.palette.background.paper,
              color: (theme) => theme.palette.text.primary,
              borderColor: (theme) => theme.palette.secondary.main,
              '&:hover': {
                backgroundColor: (theme) => theme.palette.secondary.main,
                color: (theme) => theme.palette.background.default,
              },
            }}
            onClick={() => setCartOpen(true)}
            disabled={totalQuantity === 0}
          >
            Show Cart ({totalQuantity})
          </Button>
        </Box>
      </Box>

      {/* Cart Dialog */}
      <CartDialog open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ProductPage;
