import store from '../../../app/state';
import { getClub } from '../../auth/organizerAuthSlice';
import { makeStyles } from '@material-ui/styles';
import { Box, Typography, Button } from '@mui/material';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { styled } from '@mui/material/styles';
import ImageCarousel from '../../utils/carousel/ImageCarousel';
import { images } from '../../home/Home';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { AppRoutes } from '../../../routing/routes';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import { formatDate } from '../../evnt/CreateEvent';
import { getUser, isUserAuthenticated, registerEventAsync } from '../../auth/authSlice';
import { AppDispatch } from '../../../app/type';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useDispatch } from 'react-redux';

const BlogPostCardMediaWrapper = styled('div')({
  paddingTop: 'calc(100% * 4 / 4)',
  position: 'relative',
});

export const UserEventDetails = () => {
  const event = useLocation().state.event;

  const isLoggedIn = isUserAuthenticated(store.getState());
  const user = getUser(store.getState());

  const dispatch = useDispatch<AppDispatch>();

  const handleRegisterClick = (eventId: string) => {
    Swal.fire({
      title: 'Are you sure, you want to register to the event?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, register!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(registerEventAsync({ userId: user.id, eventId: eventId }));
          Swal.fire('Registered!', 'You have successfully to the event', 'success');
        } catch (err) {
          console.log('the error is ', err);
        }
      }
    });
  };

  return (
    <Box
      mx={[1, 5, 10]}
      my={[1, 3, 5]}
      sx={{ backgroundColor: '#45B3D6', borderRadius: '9px' }}
      py={[1, 3, 5]}
      px={[1, 3]}
    >
      <Box display='flex' flexDirection='column'>
        <Box display='flex' justifyContent='center'>
          <Typography variant='h5' sx={{ color: 'white' }} textTransform='uppercase'>
            {event.name}
          </Typography>
        </Box>
        <Box mt={[1, 3]} display='flex' gap={2} flexWrap='wrap'>
          <Box flexBasis={['100%', '100%', '70%']} order={[2, 1]}>
            <Typography variant='h6' sx={{ color: 'white' }} textTransform='uppercase'></Typography>
            <Box mr={[2, 3]} mt={[2, 3]}>
              <Typography variant='body1' sx={{ color: 'white' }}>
                {event.desc}
              </Typography>
            </Box>
            <Box mt={[2, 3]} display='flex' flexDirection='column' justifyContent='flex-start'>
              <Box display='flex' gap={2}>
                <Typography variant='subtitle2' sx={{ fontsize: '2rem', fontWeight: 'bold' }}>
                  Event Date:
                </Typography>
                <Typography
                  variant='subtitle2'
                  fontSize={16}
                  fontWeight={600}
                  sx={{ color: 'white' }}
                >
                  {formatDate(event.eventDate)}
                </Typography>
              </Box>
              <Box display='flex' gap={2}>
                <Typography variant='subtitle2' sx={{ fontsize: '2rem', fontWeight: 'bold' }}>
                  Associated Club:
                </Typography>
                <Typography
                  variant='subtitle2'
                  fontSize={16}
                  fontWeight={600}
                  sx={{ color: 'white' }}
                >
                  {event.clubName}
                </Typography>
              </Box>

              {/* buttons */}
              <Box display='flex' justifyContent='center' mt={[1, 3, 5]} gap={[2, 3, 5]}>
                <Button
                  variant='contained'
                  color='primary'
                  sx={{
                    boxShadow:
                      '-1px -3px 4px rgba(245, 245, 245, 0.4), 1px 3px 4px rgba(102, 102, 102, 0.4)',
                    textTransform: 'uppercase',
                  }}
                  endIcon={<ArrowForwardIosIcon />}
                  // onClick={handleViewAllEventsClick}
                  href={AppRoutes.USER_ALL_EVENTS}
                >
                  view all events
                </Button>
                {isLoggedIn ? (
                  user.eventsRegistered.includes(event.id) ? (
                    <Button type='submit' variant='contained' disabled>
                      Registered!
                    </Button>
                  ) : (
                    <Button
                      type='submit'
                      variant='contained'
                      onClick={(e) => {
                        e.preventDefault();
                        handleRegisterClick(event.id);
                      }}
                    >
                      Register
                    </Button>
                  )
                ) : (
                  <Button
                    variant='contained'
                    color='primary'
                    sx={{
                      boxShadow:
                        '-1px -3px 4px rgba(245, 245, 245, 0.4), 1px 3px 4px rgba(102, 102, 102, 0.4)',
                      textTransform: 'uppercase',
                    }}
                    href={AppRoutes.LOGIN}
                  >
                    Login to register
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
          <Box height={['10rem', '20rem']} order={[1, 2]}>
            <BlogPostCardMediaWrapper sx={{ paddingTop: 0, height: '8rem', width: '20rem' }}>
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
                autoPlaySpeed={1000}
              >
                {event.images.map((img: string) => {
                  return <img src={img} style={{ height: '25rem', paddingBottom: '1rem' }}></img>;
                })}
              </Carousel>
            </BlogPostCardMediaWrapper>
          </Box>
        </Box>
        <Box
          mt={[1, 7, 12]}
          display='flex'
          flexDirection='column'
          sx={{
            backgroundColor: '#45B3D6',
            marginTop: '4rem',
            paddingLeft: '20px',
            paddingRight: '20px',
            borderRadius: '25px',
            paddingBottom: '25px',
          }}
        >
          <Typography variant='h6' sx={{ color: '#1E1E1E' }} textTransform='uppercase'>
            events over the years
          </Typography>
          <Box mt={[1, 3]}>
            <ImageCarousel data={event.images} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
