import { makeStyles } from '@material-ui/styles';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import Carousel from 'react-material-ui-carousel';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ImageCarousel from '../../utils/carousel/ImageCarousel';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/type';
import store from '../../../app/state';

import { GetEventPayload } from '../../../boundaries/event-backend/model';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { AppRoutes } from '../../../routing/routes';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getAllEvents, GetAllEventsAsync } from '../../auth/organizerAuthSlice';
import {
  getAllRegisteredEventsAsync,
  getUser,
  isUserAuthenticated,
  getRegisteredEvents,
} from '../../auth/authSlice';
import { images } from '../../home/Home';
import { getEventById } from '../../../boundaries/event-backend/api';

const useStyles = makeStyles({
  newsBox: {
    '&::-webkit-scrollbar': {
      width: '6px',
      background: '#D9D9D9',
      borderRadius: '20px',
      margin: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(30, 30, 30, 0.5)',
      borderRadius: '20px',
    },
  },
  invisibleScrollBar: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

export const UserDashboard = () => {
  const isLoggedIN = isUserAuthenticated(store.getState());
  const classes = useStyles();

  const dispatch = useDispatch<AppDispatch>();

  const user = getUser(store.getState());

  const eventsArray = user.eventsRegistered;

  useEffect(() => {
    async function fetchEvents() {
      await dispatch(getAllRegisteredEventsAsync({ eventsArray: eventsArray }));
    }
    fetchEvents();
  }, []);

  const events = getRegisteredEvents(store.getState());

  const memories = [];

  for (let i = 0; i < events.length; i++) {
    for (let j = 0; j < events[i].images.length; j++) {
      memories.push(events[i].images[j]);
    }
  }

  const [eventToShow, setEventToShow] = useState<GetEventPayload>(events[0]);

  return (
    <Box mx={[1, 3, 5, 10]} mt={[3, 4, 7]}>
      <Box display='flex'>
        {/* <EventOverview {...newsToShow} /> */}
        <Box width='60%' p={[0.5, 1, 2]} mr={[1, 5, 7]} sx={{ backgroundColor: '#45B3D6' }}>
          <Box mb={[1, 2]}>
            <Typography variant='h6' color='white' textTransform='uppercase'>
              registered EVENTS
            </Typography>
          </Box>
          <Box overflow='auto' className={classes.newsBox} height='auto'>
            <Box display='flex' flexDirection='column'>
              {events.map((event) => {
                return (
                  <Button onClick={() => setEventToShow(event)}>
                    <Typography
                      sx={{ py: '2px' }}
                      onMouseOver={(e) => {
                        const target = e.target as HTMLSpanElement;
                        target.style.color = 'black';
                        setEventToShow(event);
                      }}
                      onMouseOut={(e) => {
                        const target = e.target as HTMLSpanElement;
                        target.style.color = 'white';
                      }}
                      color='white'
                      variant='subtitle1'
                    >
                      {event.name}
                    </Typography>
                  </Button>
                );
              })}
            </Box>
          </Box>
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
              href={AppRoutes.USER_ALL_EVENTS}
            >
              
              view all events
            </Button>
          </Box>
        </Box>
        {/* the event overview */}
        <Box
          p={[0.5, 1, 2]}
          sx={{ backgroundColor: '#45B3D6', width: '40%' }}
          display='flex'
          alignItems='center'
          flexDirection='column'
          mb={[0]}
        >
          <Box mb={[1, 2]}>
            <a href='{href}'>
              <Typography variant='h6' color='white' textTransform='uppercase'>
                {eventToShow.name}
              </Typography>
            </a>
          </Box>
          <Box sx={{ height: '10rem', width: '16rem' }}>
            <img src={eventToShow.images[0]} />
          </Box>
          <Box
            height='100px'
            overflow='auto'
            px={[1, 2, 3]}
            mt={[2, 4]}
            className={classes.invisibleScrollBar}
          >
            <Typography color='white' variant='subtitle1'>
              {eventToShow.desc}
            </Typography>
          </Box>
          <Box display='flex' justifyContent='center' mt={[1, 3, 5]}>
            <Button
              variant='contained'
              color='primary'
              // href={button?.href}
              sx={{
                boxShadow:
                  '-1px -3px 4px rgba(245, 245, 245, 0.4), 1px 3px 4px rgba(102, 102, 102, 0.4)',
                textTransform: 'uppercase',
              }}
            >
              <Link
                style={{ color: 'white' }}
                to={AppRoutes.USER_EVENT_DETAILS}
                state={{ event: eventToShow }}
              >
                See details
              </Link>
            </Button>
          </Box>
        </Box>
      </Box>

      <Box display='flex' flexDirection='column'>
        <Box my={[2]}>
          <Typography
            variant='body1'
            sx={{ color: ' #1E1E1E', fontWeight: '700', fontsize: '22px' }}
          >
            DOWN THE MEMORY LANE
          </Typography>
        </Box>

        <Box>
          <ImageCarousel data={memories} />
        </Box>
      </Box>
    </Box>
  );
};
