import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';

function AboutPage() {
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
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        {/* Page Title */}
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          About
        </Typography>

        {/* Band Name */}
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 700,
            letterSpacing: 2,
            fontFamily: 'monospace',
            color: (theme) => theme.palette.secondary.main,
          }}
        >
          The Generics
        </Typography>

        {/* Band Picture */}
        <CardMedia
          component="img"
          src="https://images.pexels.com/photos/1778810/pexels-photo-1778810.jpeg"
          alt="The Generics Band"
          sx={{
            borderRadius: 3,
            maxWidth: '100%',
            height: 'auto',
            mb: 4,
            boxShadow: 3,
            mx: 'auto',
          }}
        />

        {/* Description / Content */}
        <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.6, mb: 2 }}>
          The Generics are a renowned band known for their unique blend of musical styles, captivating performances, and
          memorable melodies. Founded in the early 2000s, their passion for music shines through every track,
          delivering a fresh yet timeless sound that resonates with fans worldwide.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
          Over the years, The Generics have released several albums, toured internationally, and
          built a loyal community that appreciates authenticity and musical artistry.
          Join us on this journey and discover the soul of The Generics.
        </Typography>
      </Container>
    </Box>
  );
}

export default AboutPage;
