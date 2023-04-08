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
import { formatDate } from '../../evnt/CreateEvent';

const BlogPostCardMediaWrapper = styled('div')({
  paddingTop: 'calc(100% * 4 / 4)',
  position: 'relative',
});

export const ClubAllEvents = () => {
  const events = getAllEvents(store.getState());
  console.log(events);

  return (
    <Box
      sx={{
        minHeight: '100%',
        p: 3,
      }}
    >
      <Grid container spacing={3}>
        {events.length ? (
          events.map((event: GetEventPayload) => (
            <Grid item mb={[2, 4]} md={4} xs={12}>
              <Link to={AppRoutes.CLUB_EVENT_DETAILS} state={{ event: event }}>
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
                      showDots={false}
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
                      <Chip label={event.clubName} variant='outlined' />
                    </div>
                    <Typography sx={{ marginTop: '10px' }} variant='h6' color='primary'>
                      {event.name}
                    </Typography>
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
                        Date: {formatDate(event.eventDate)}
                      </Typography>
                    </Box>
                    <Box mt={[2]}>
                      <Button type='submit' variant='contained'>
                        <Link
                          style={{ color: 'white' }}
                          to={AppRoutes.CLUB_EVENT_DETAILS}
                          state={{ event: event }}
                        >
                          See Details
                        </Link>
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Link>
            </Grid>
          ))
        ) : (
          <Box
            display='flex'
            height='100%'
            width='100%'
            justifyContent='center'
            alignItems='center'
            mt={[2, 4, 8]}
          >
            <Typography variant='h6'>No upcoming events to show</Typography>
          </Box>
        )}
      </Grid>
    </Box>
  );
};
