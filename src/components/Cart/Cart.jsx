// CartDialog.js
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../../context/CartContext';

export default function CartDialog({ open, onClose }) {
  const { items, totalQuantity, totalPrice, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Shopping Cart
        <IconButton aria-label="close" onClick={onClose} size="large">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {items.length === 0 ? (
          <Typography variant="body1" align="center" sx={{ py: 4 }}>
            Your cart is empty.
          </Typography>
        ) : (
          <List>
            {items.map(({ product, quantity }) => (
              <ListItem key={product.title} divider sx={{ alignItems: 'center' }}>
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    src={product.imageUrl}
                    alt={product.title}
                    sx={{ width: 56, height: 56, mr: 2, borderRadius: 2 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={product.title}
                  secondary={`₹${product.price.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                  })} x ${quantity} = ₹${(product.price * quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton
                    aria-label="decrease quantity"
                    onClick={() => updateQuantity(product.title, quantity - 1)}
                    size="large"
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <Typography>{quantity}</Typography>
                  <IconButton
                    aria-label="increase quantity"
                    onClick={() => updateQuantity(product.title, quantity + 1)}
                    size="large"
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                  <IconButton
                    aria-label="remove item"
                    onClick={() => removeItem(product.title)}
                    size="large"
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>

      <DialogActions sx={{ flexDirection: 'column', alignItems: 'stretch', px: 3, py: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight={700}>
            Total Items:
          </Typography>
          <Typography variant="subtitle1">{totalQuantity}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" fontWeight={700}>
            Total Price:
          </Typography>
          <Typography variant="h6" fontWeight={700}>
            ₹{totalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={clearCart} color="error">
            Clear Cart
          </Button>
          <Button variant="contained" onClick={onClose} color="primary">
            Close
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
