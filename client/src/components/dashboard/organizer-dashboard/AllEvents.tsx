import type { FC } from 'react';
import { format, subHours, subMinutes, subSeconds } from 'date-fns';
import { Box, Card, CardMedia, Chip, Grid, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getAllEvents } from '../../auth/organizerAuthSlice';
import store from '../../../app/state';
import { GetEventPayload } from '../../../boundaries/event-backend/model';
import { AppRoutes } from '../../../routing/routes';
import { Link } from 'react-router-dom';

const BlogPostCardMediaWrapper = styled('div')({
  paddingTop: 'calc(100% * 4 / 4)',
  position: 'relative',
});

export const AllEvents = () => {
  const events = getAllEvents(store.getState());

  return (
    <Box
      sx={{
        minHeight: '100%',
        p: 3,
      }}
    >
      <Grid container spacing={3}>
        {events.map((event: GetEventPayload) => (
          <Grid item mb={[2, 4]} md={4} xs={12}>
            <a href={AppRoutes.EVENT}>
              <Card
                sx={{
                  height: '100%',
                  p: 2,
                }}
              >
                <BlogPostCardMediaWrapper sx={{ paddingTop: 0 }}>
                  <Carousel
                    responsive={{
                      superLargeDesktop: {
                        breakpoint: { max: 4000, min: 3000 },
                        items: 1,
                      },
                      desktop: {
                        breakpoint: { max: 3000, min: 1024 },
                        items: 1,
                      },
                      tablet: {
                        breakpoint: { max: 1024, min: 464 },
                        items: 1,
                      },
                      mobile: {
                        breakpoint: { max: 464, min: 0 },
                        items: 1,
                      },
                    }}
                    swipeable={true}
                    draggable={true}
                    showDots={true}
                    autoPlay
                    infinite
                    removeArrowOnDeviceType={['desktop', 'tablet', 'mobile']}
                    autoPlaySpeed={3000}
                  >
                    {event.images.map((image: string) => {
                      return (
                        <img src={image} style={{ height: '25rem', paddingBottom: '1rem' }}></img>
                      );
                    })}
                  </Carousel>
                </BlogPostCardMediaWrapper>
                <Box sx={{ mt: 2 }}>
                  <div>
                    <Chip label={event.category} variant='outlined' />
                  </div>
                  <Link to={AppRoutes.EVENT_DETAILS} state={{ event: event }}>
                    {event.name}
                  </Link>
                  <Typography
                    color='textSecondary'
                    sx={{
                      height: 72,
                      mt: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                    }}
                    variant='body1'
                  >
                    {event.desc}
                  </Typography>
                </Box>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                  <Box
                    textAlign='center'
                    sx={{ backgroundColor: '' }}
                    mt={[2]}
                    display='flex'
                    justifyContent='flex-start'
                  >
                    <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
                      Date: 04/04/2022
                    </Typography>
                  </Box>
                  <Box mt={[2]}>
                    <Button type='submit' variant='contained'>
                      <Link to={AppRoutes.EVENT_DETAILS} state={{ event: event }}>
                        See Details
                      </Link>
                    </Button>
                  </Box>
                </Box>
              </Card>
            </a>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
