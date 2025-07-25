import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Container from '@mui/material/Container';

import ToursList from '../components/ToursList/ToursList'; // The tours component (see below)

export default function Home() {
  const handlePlay = () => {
    // logic to play music or open playlist
    // could use audio API, open Spotify/YouTube, etc.
  };

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        minHeight: '100vh',
        py: 6,
        color: (theme) => theme.palette.text.primary,
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        {/* H2 Heading */}
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 700,
            fontFamily: 'monospace',
            letterSpacing: 2,
            mb: 4,
            color: (theme) => theme.palette.secondary.main,
          }}
        >
          The Generics
        </Typography>

        {/* Play Button */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<PlayArrowIcon />}
          sx={{
            mb: 6,
            fontWeight: 700,
            px: 4,
            py: 1.5,
            borderRadius: 3,
            letterSpacing: 1,
            fontSize: '1.2rem',
            '&:hover': {
              backgroundColor: (theme) => theme.palette.secondary.main,
              color: (theme) => theme.palette.background.default,
            },
          }}
          onClick={handlePlay}
        >
          Play Songs
        </Button>

        {/* Tours List Section */}
        <ToursList />
      </Container>
    </Box>
  );
}
