import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

export default function AuthPage() {
  const [view, setView] = useState('login'); 
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); 

  // Handle input changes
  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // Simulated submit handler (replace with real API logic)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Simulate delay
    setTimeout(() => {
      if (view === 'login') {
        if (form.email === 'user@example.com' && form.password === 'password') {
          setMessage({ type: 'success', text: 'Login successful!' });
        } else {
          setMessage({ type: 'error', text: 'Invalid email or password.' });
        }
      } else {
        setMessage({ type: 'success', text: 'Account created! Please login.' });
        setView('login');
      }
      setLoading(false);
    }, 1200);
  };

  // Reset form fields and messages on view switch
  const switchView = (v) => {
    setView(v);
    setForm({ name: '', email: '', password: '' });
    setMessage(null);
  };

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        minHeight: '100vh',
        py: 8,
        color: (theme) => theme.palette.text.primary,
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Typography
            variant="h4"
            component="h1"
            align="center"
            fontWeight={700}
            sx={{ mb: 3 }}
          >
            {view === 'login' ? 'Login' : 'Sign Up'}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            {view === 'signup' && (
              <TextField
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
                fullWidth
                variant="outlined"
                sx={{ input: { color: 'text.primary' } }}
              />
            )}
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              type="email"
              autoComplete="email"
              fullWidth
              variant="outlined"
              sx={{ input: { color: 'text.primary' } }}
            />
            <TextField
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              type="password"
              autoComplete={view === 'login' ? 'current-password' : 'new-password'}
              fullWidth
              variant="outlined"
              sx={{ input: { color: 'text.primary' } }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              disabled={loading}
              fullWidth
              sx={{
                fontWeight: 700,
                letterSpacing: 1,
                mt: 1,
                borderRadius: 2,
                fontSize: '1.05rem',
                py: 1.25,
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  color: (theme) => theme.palette.background.default,
                },
              }}
            >
              {loading
                ? (view === 'login' ? 'Logging in...' : 'Signing up...')
                : (view === 'login' ? 'Login' : 'Sign Up')}
            </Button>
            <Box sx={{ textAlign: 'center', mt: 1 }}>
              {view === 'login' ? (
                <Typography>
                  New user?{' '}
                  <Link
                    href="#"
                    onClick={(e) => { e.preventDefault(); switchView('signup'); }}
                    color="secondary"
                    sx={{ cursor: 'pointer', fontWeight: 500 }}
                  >
                    Create an account
                  </Link>
                </Typography>
              ) : (
                <Typography>
                  Already registered?{' '}
                  <Link
                    href="#"
                    onClick={(e) => { e.preventDefault(); switchView('login'); }}
                    color="secondary"
                    sx={{ cursor: 'pointer', fontWeight: 500 }}
                  >
                    Login
                  </Link>
                </Typography>
              )}
            </Box>
            {message && (
              <Typography
                align="center"
                sx={{
                  mt: 2,
                  color:
                    message.type === 'success'
                      ? 'success.main'
                      : 'error.main',
                  fontWeight: 600,
                }}
              >
                {message.text}
              </Typography>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
