import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null); // null | 'success' | 'error'

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    try {
      // Replace with your actual endpoint
      await axios.post('url', form);
      setSuccess('success');
      setForm({ name: '', email: '', phone: '' });
    } catch (err) {
      console.error(err);
      setSuccess('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        minHeight: '100vh',
        py: 6,
        color: (theme) => theme.palette.text.primary,
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Contact Us
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          We'd love to hear from you! Fill out the form below and we'll get in touch.
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            backgroundColor: (theme) => theme.palette.background.paper,
            p: 4,
            borderRadius: 3,
            boxShadow: 3,
            mx: 'auto',
            maxWidth: 400,
          }}
        >
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            fullWidth
            autoComplete="name"
            variant="outlined"
            sx={{ input: { color: 'text.primary' } }}
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            type="email"
            fullWidth
            autoComplete="email"
            variant="outlined"
            sx={{ input: { color: 'text.primary' } }}
          />
          <TextField
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            type="tel"
            fullWidth
            autoComplete="tel"
            variant="outlined"
            sx={{ input: { color: 'text.primary' } }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting}
            sx={{
              fontWeight: 700,
              fontSize: '1rem',
              borderRadius: 2,
              px: 3,
              py: 1,
              letterSpacing: 1,
              mt: 2,
              '&:hover': {
                backgroundColor: (theme) => theme.palette.secondary.main,
                color: (theme) => theme.palette.background.default,
              },
            }}
          >
            {submitting ? 'Submitting...' : 'Send'}
          </Button>
        </Box>

        <Fade in={!!success} timeout={550} unmountOnExit>
          <Box sx={{ mt: 3 }}>
            {success === 'success' && (
              <Alert severity="success">Your message has been sent successfully!</Alert>
            )}
            {success === 'error' && (
              <Alert severity="error">There was an error submitting your message. Please try again.</Alert>
            )}
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}
