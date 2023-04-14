import { makeStyles } from '@material-ui/styles';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import Carousel from 'react-material-ui-carousel';
import EventBox, { eventBoxprops, link } from '../utils/event-box/EventBox';
import EventOverview, { overviewBoxProps } from '../utils/event-overview/EventOverview';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ImageCarousel from '../utils/carousel/ImageCarousel';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/type';
import { getAllEvents, GetAllEventsAsync } from '../auth/organizerAuthSlice';
import store from '../../app/state';
import { getUser, isUserAuthenticated } from '../auth/authSlice';
import { GetEventPayload } from '../../boundaries/event-backend/model';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { AppRoutes } from '../../routing/routes';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const images = [
  {
    id: 1,
    src: 'https://images.pexels.com/photos/4434465/pexels-photo-4434465.jpeg',
    alt: 'Image 1',
  },
  {
    id: 2,
    src: 'https://images.pexels.com/photos/5394443/pexels-photo-5394443.jpeg',
    alt: 'Image 2',
  },
  {
    id: 3,
    src: 'https://picsum.photos/id/1018/1000/600/',
    alt: 'Image 3',
  },
  {
    id: 4,
    src: 'https://images.pexels.com/photos/6589268/pexels-photo-6589268.jpeg',
    alt: 'Image 4',
  },
  {
    id: 5,
    src: 'https://images.pexels.com/photos/1059894/pexels-photo-1059894.jpeg',
    alt: 'Image 5',
  },
];

export const news = {
  heading: 'news highlights',
  links: [
    {
      title: 'Robaroo is going to happen on this monday',
      href: '',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley',
      images: [
        'https://images.pexels.com/photos/6589268/pexels-photo-6589268.jpeg',
        'https://images.pexels.com/photos/1059894/pexels-photo-1059894.jpeg',
        'https://images.pexels.com/photos/5394443/pexels-photo-5394443.jpeg',
      ],
    },
    {
      title: 'Hell there how are you',
      href: '',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley',
      images: [
        'https://images.pexels.com/photos/6589268/pexels-photo-6589268.jpeg',
        'https://images.pexels.com/photos/1059894/pexels-photo-1059894.jpeg',
        'https://images.pexels.com/photos/5394443/pexels-photo-5394443.jpeg',
      ],
    },
    {
      title: 'Here is the link to a fake news',
      href: '',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley',
      images: [
        'https://images.pexels.com/photos/6589268/pexels-photo-6589268.jpeg',
        'https://images.pexels.com/photos/1059894/pexels-photo-1059894.jpeg',
        'https://images.pexels.com/photos/5394443/pexels-photo-5394443.jpeg',
      ],
    },
    {
      title: 'Lorem ipsum lorem ipsum it is',
      href: '',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley',
      images: [
        'https://images.pexels.com/photos/6589268/pexels-photo-6589268.jpeg',
        'https://images.pexels.com/photos/1059894/pexels-photo-1059894.jpeg',
        'https://images.pexels.com/photos/5394443/pexels-photo-5394443.jpeg',
      ],
    },
    {
      title: 'Lorem ipsum lorem ipsum it is',
      href: '',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley',
      images: [
        'https://images.pexels.com/photos/6589268/pexels-photo-6589268.jpeg',
        'https://images.pexels.com/photos/1059894/pexels-photo-1059894.jpeg',
        'https://images.pexels.com/photos/5394443/pexels-photo-5394443.jpeg',
      ],
    },
  ],
  button: {
    name: 'view all events',
    href: '/evnts',
  },
};

export const newsOverview: overviewBoxProps = {
  title: news.links[0].title,
  href: news.links[0].href,
  desc: news.links[0].desc,
  images: news.links[0].images,
  button: {
    name: 'LOGIN to REGISTER',
    href: '',
  },
};

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
    borderRadius: '25px',
  },
  invisibleScrollBar: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

export const HomePage = () => {
  //temp data
  const isLoggedIN = isUserAuthenticated(store.getState());
  const classes = useStyles();

  const dispatch = useDispatch<AppDispatch>();

  // const [events, setEvents] = useState<GetEventPayload[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchEvents() {
      await dispatch(GetAllEventsAsync());
    }
    fetchEvents();
    setLoading(false);
  }, []);

  const events = getAllEvents(store.getState());

  const memories = [];

  for (let i = 0; i < events.length; i++) {
    for (let j = 0; j < events[i].images.length; j++) {
      memories.push(events[i].images[j]);
    }
  }

  console.log('events', events);

  const [eventToShow, setEventToShow] = useState<GetEventPayload>(events[0]);

  const user = getUser(store.getState());

  return (
    <Box mx={[1, 3, 5, 10]} mt={[3, 4, 7]}>
      <Box display='flex'>
        {/* <EventOverview {...newsToShow} /> */}
        <Box
          width='60%'
          p={[0.5, 1, 2]}
          mr={[1, 5, 7]}
          sx={{
            backgroundColor: '#45B3D6',
            borderRadius: '25px',
            boxShadow:
              ' rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;',
          }}
        >
          <Box mb={[1, 2]}>
            <Typography variant='h6' color='white' textTransform='uppercase'>
              UPCOMING EVENTS
            </Typography>
          </Box>
          <Box overflow='auto' className={classes.newsBox} height='auto'>
            <Box display='flex' flexDirection='column'>
              {events ? (
                events.map((event) => {
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
                })
              ) : (
                <Typography>No upcoming events</Typography>
              )}
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
              style={{ position: 'relative', top: '95px' }}
            >
              view all events
            </Button>
          </Box>
        </Box>
        {/* the event overview */}
        {eventToShow ? (
          <Box
            p={[0.5, 1, 2]}
            sx={{
              backgroundColor: '#45B3D6',
              width: '40%',
              borderRadius: '25px',
              boxShadow:
                ' rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;',
            }}
            display='flex'
            alignItems='center'
            flexDirection='column'
            mb={[0]}
          >
            <Box mb={[1, 2]}>
              <Link to={AppRoutes.USER_EVENT_DETAILS} state={{event:eventToShow}}>
                <Typography variant='h6' color='white' textTransform='uppercase'>
                  {eventToShow.name}
                </Typography>
              </Link>
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

            {isLoggedIN ? (
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
                    See details to register
                  </Link>
                </Button>
              </Box>
            ) : (
              <Box display='flex' justifyContent='center' mt={[1, 3, 5]}>
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
              </Box>
            )}
          </Box>
        ) : (
          <></>
        )}
      </Box>

      <Box
        display='flex'
        flexDirection='column'
        sx={{
          backgroundColor: '#abdaea',
          marginTop: '4rem',
          paddingLeft: '20px',
          paddingRight: '20px',
          borderRadius: '25px',
          paddingBottom: '25px',
        }}
      >
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
