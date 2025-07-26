import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CardMedia from '@mui/material/CardMedia';

import { useCart } from '../../context/CartContext';

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

const allProducts = [
  ...merchProducts,
  ...musicProducts
];

export default function ProductDetails() {
  const { id } = useParams();
  const product = allProducts.find(p => p.title === id);

  // Cart context
  const { addItem } = useCart();

  // Snackbar for feedback
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  if (!product) {
    return (
      <Box p={5} sx={{ textAlign: 'center' }}>
        <Typography variant="h5" color="error">Product not found.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        minHeight: '100vh',
        py: 6,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.paper,
          borderRadius: 3,
          boxShadow: 4,
          p: 5,
          maxWidth: 600,
          width: '100%',
          mx: 'auto',
          textAlign: 'center',
        }}
      >
        <CardMedia
          component="img"
          sx={{ borderRadius: 2, mb: 3, maxHeight: 320, objectFit: 'cover', mx: 'auto' }}
          src={product.imageUrl}
          alt={product.title}
        />
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          {product.title}
        </Typography>
        {product.description && (
          <Typography sx={{ mb: 2 }}>{product.description}</Typography>
        )}
        <Typography variant="h5" sx={{ color: (theme) => theme.palette.secondary.main, mb: 2 }}>
          ₹{product.price.toLocaleString('en-IN')}
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="primary"
          sx={{
            fontWeight: 700,
            borderRadius: 2,
            px: 4,
            py: 1,
            letterSpacing: 1,
            '&:hover': {
              backgroundColor: (theme) => theme.palette.secondary.main,
              color: (theme) => theme.palette.background.default,
            },
          }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </Box>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Added "{product.title}" to cart.
        </Alert>
      </Snackbar>
    </Box>
  );
}