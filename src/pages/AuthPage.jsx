import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // ADDED

export default function AuthPage() {
  const [view, setView] = useState('login'); // 'login' | 'signup' | 'forgot'
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    newPassword: '', // for password reset
  });

  const { login, logout, isLoggedIn, token } = useAuth()

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (view === 'login') {
        // *** Replace with your actual login API URL ***
        const response = await axios.post(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]',
          {
            email: form.email,
            password: form.password,
            returnSecureToken: true,
          }
        );
        login(response.data.idToken); // Save token in Context!
        isLoggedIn(true);
        setMessage({ type: 'success', text: 'Login successful!' });
      } else if (view === 'signup') {
        // *** Replace with your actual signup API ***
        await axios.post('http://localhost:3000/register', {
          name: form.name,
          email: form.email,
          password: form.password,
        });
        setMessage({ type: 'success', text: 'Account created! Please login.' });
        setView('login');
      } else if (view === 'forgot') {
        // *** Password reset endpoint & payload will depend on your backend ***
        await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=[API_KEY]', {
          requestType: 'PASSWORD_RESET',
          email: form.email,
        });
        setMessage({ type: 'success', text: 'Password reset email sent. Check your inbox!' });
        // Optionally: return to login after a few seconds
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        error.message ||
        'An error occurred. Please try again.';
      setMessage({ type: 'error', text: errMsg });
    }
    setLoading(false);
  };

  const switchView = (v) => {
    setView(v);
    setForm({ name: '', email: '', password: '', newPassword: '' });
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
            {
              view === 'login'
                ? 'Login'
                : view === 'forgot'
                  ? 'Reset Password'
                  : 'Sign Up'
            }
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
            {view === 'forgot'
              ? (
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
              )
              : (
                <>
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
                </>
              )}

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
                ? (view === 'login'
                  ? 'Logging in...'
                  : view === 'signup'
                    ? 'Signing up...'
                    : 'Processing...')
                : (view === 'login'
                  ? 'Login'
                  : view === 'signup'
                    ? 'Sign Up'
                    : 'Reset Password')}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 1 }}>
              {view === 'login' && (
                <>
                  <Typography>
                    <Link
                      href="#"
                      onClick={e => { e.preventDefault(); switchView('forgot'); }}
                      color="secondary"
                      sx={{ cursor: 'pointer', fontWeight: 500 }}
                    >
                      Forgot password?
                    </Link>
                  </Typography>
                  <Typography>
                    New user?{' '}
                    <Link
                      href="#"
                      onClick={e => { e.preventDefault(); switchView('signup'); }}
                      color="secondary"
                      sx={{ cursor: 'pointer', fontWeight: 500 }}
                    >
                      Create an account
                    </Link>
                  </Typography>
                </>
              )}
              {view === 'signup' && (
                <Typography>
                  Already registered?{' '}
                  <Link
                    href="#"
                    onClick={e => { e.preventDefault(); switchView('login'); }}
                    color="secondary"
                    sx={{ cursor: 'pointer', fontWeight: 500 }}
                  >
                    Login
                  </Link>
                </Typography>
              )}
              {view === 'forgot' && (
                <Typography>
                  Back to{' '}
                  <Link
                    href="#"
                    onClick={e => { e.preventDefault(); switchView('login'); }}
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
