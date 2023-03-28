// import Carousel from 'react-material-ui-carousel';
// import EventBox, { eventBoxprops, link } from '../utils/event-box/EventBox';
// import EventOverview, { overviewBoxProps } from '../utils/event-overview/EventOverview';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { images } from '../../home/Home';
import ImageCarousel from '../../utils/carousel/ImageCarousel';
import React, { useState, Dispatch, SetStateAction } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Button, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSelect } from '@mui/base';
import { getAllEvents, getClub } from '../../auth/organizerAuthSlice';
import store from '../../../app/state';
import { GetEventPayload } from '../../../boundaries/event-backend/model';
import { useAppDispatch } from '../../../app/hooks';
import { push } from 'connected-react-router';
import { AppRoutes } from '../../../routing/routes';
import history from '../../../app/history';

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

export const OrganizerDashboard = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const clubData = getClub(store.getState());
  const events = getAllEvents(store.getState());

  const [eventToShow, setEventToShow] = useState<GetEventPayload>(events[0]);

  const handleViewAllEventsClick = () => {
    console.log('i am here');
    history.push(AppRoutes.EVENTS);
  };

  return (
    <Box mx={[1, 3, 5, 10]} mt={[3, 4, 7]}>
      <Box display='flex'>
        {/* <EventOverview {...newsToShow} /> */}

        <Box width='60%' p={[0.5, 1, 2]} mr={[1, 5, 7]} sx={{ backgroundColor: '#45B3D6' }}>
          <Box mb={[1, 2]}>
            <Typography variant='h6' color='white' textTransform='uppercase'>
              UPCOMING EVENTS
            </Typography>
          </Box>
          <Box overflow='auto' className={classes.newsBox} height='auto'>
            <Box display='flex' flexDirection='column'>
              {events.map((event) => {
                return (
                  <a onClick={() => setEventToShow(event)} href='{item.href}'>
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
                  </a>
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
              // onClick={handleViewAllEventsClick}
              href={AppRoutes.ALL_EVENTS}
            >
              view all events
            </Button>
            <Button
              variant='contained'
              color='secondary'
              sx={{
                boxShadow:
                  '-1px -3px 4px rgba(245, 245, 245, 0.4), 1px 3px 4px rgba(102, 102, 102, 0.4)',
                textTransform: 'uppercase',
              }}
              endIcon={<ArrowForwardIosIcon />}
              href={AppRoutes.CREATE_EVENT}
            >
              create event
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
              href={AppRoutes.EVENT}
            >
              See Details
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
          <ImageCarousel data={images} />
        </Box>
      </Box>
    </Box>
  );
};
