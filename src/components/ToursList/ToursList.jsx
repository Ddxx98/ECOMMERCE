import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Button from '@mui/material/Button';

const tours = [
  {
    name: 'Monsoon Magic Tour',
    date: '2025-08-06',
    place: 'Mumbai, India',
    venue: 'NSCI Dome',
  },
  {
    name: 'London Calling Tour',
    date: '2025-08-15',
    place: 'London, UK',
    venue: 'O2 Arena',
  },
  {
    name: 'Berlin Beat Fest',
    date: '2025-09-02',
    place: 'Berlin, Germany',
    venue: 'Mercedes-Benz Arena',
  },
  {
    name: 'New York Nights',
    date: '2025-09-18',
    place: 'New York City, USA',
    venue: 'Madison Square Garden',
  },
  {
    name: 'Sydney Sunsets Live',
    date: '2025-10-05',
    place: 'Sydney, Australia',
    venue: 'Sydney Opera House',
  },
];

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function ToursList() {
  return (
    <Box sx={{ mt: 8, maxWidth: 700, mx: 'auto' }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}
        color="text.primary"
      >
        Upcoming Tours
      </Typography>
      <List>
        {tours.map((tour, idx) => (
          <ListItem
            key={idx}
            sx={{
              backgroundColor: (theme) => theme.palette.background.paper,
              borderRadius: 2,
              boxShadow: 3,
              mb: 2,
              alignItems: 'flex-start',
              flexDirection: 'column',
              py: 2,
              px: 3,
              color: (theme) => theme.palette.text.primary,
            }}
            divider={idx !== tours.length - 1}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: (theme) => theme.palette.secondary.main,
                fontWeight: 700,
                letterSpacing: 1,
                mb: 1,
              }}
            >
              {tour.name}
            </Typography>
            <ListItemText
              primary={
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {formatDate(tour.date)}
                </Typography>
              }
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    sx={{ color: (theme) => theme.palette.text.secondary, display: 'block' }}
                  >
                    {tour.place}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ fontStyle: 'italic', display: 'block', mt: 0.5 }}
                  >
                    Venue: {tour.venue}
                  </Typography>
                </>
              }
            />
            <ListItemSecondaryAction sx={{ mt: 1 }}>
              <Button
                variant="outlined"
                color="secondary"
                sx={{
                  fontWeight: 700,
                  letterSpacing: 1,
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  minWidth: 110,
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.secondary.main,
                    color: (theme) => theme.palette.background.default,
                  },
                }}
                // Add actual buy tickets handler/link here
              >
                Buy Tickets
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
