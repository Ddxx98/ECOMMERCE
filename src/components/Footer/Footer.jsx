import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';

import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import SpotifyIcon from '@mui/icons-material/Lyrics';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        color: (theme) => theme.palette.text.primary,
        py: 3,
        mt: 'auto',
        borderTop: `1px solid ${theme => theme.palette.divider}`,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        {/* Website Name */}
        <Typography variant="h6" component="div" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
          The Generics
        </Typography>

        {/* Social Media Icons */}
        <Box>
          {[
            { icon: <YouTubeIcon />, label: 'YouTube', href: 'https://www.youtube.com' },
            { icon: <InstagramIcon />, label: 'Instagram', href: 'https://www.instagram.com' },
            { icon: <FacebookIcon />, label: 'Facebook', href: 'https://www.facebook.com' },
            { icon: <SpotifyIcon />, label: 'Spotify', href: 'https://www.spotify.com' },
          ].map(({ icon, label, href }) => (
            <IconButton
              key={label}
              aria-label={label}
              component="a"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: (theme) => theme.palette.text.primary,
                mx: 0.5,
                transition: 'color 0.3s, transform 0.3s',
                '&:hover': {
                  color: (theme) => theme.palette.secondary.main,
                  transform: 'scale(1.2)',
                },
              }}
            >
              {icon}
            </IconButton>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
