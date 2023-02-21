import { makeStyles } from '@material-ui/styles';
import { Box, Typography } from '@mui/material';
import React from 'react';
// import Carousel from 'react-material-ui-carousel';
import EventBox, { eventBoxprops } from '../utils/event-box/EventBox';
import EventOverview, { overviewBoxProps } from '../utils/event-overview/EventOverview';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ImageCarousel from '../utils/carousel/ImageCarousel';

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

const items1 = [
  {
    name: 'Item 1',
    description: 'Description 1',
    image: 'https://via.placeholder.com/300',
  },
  {
    name: 'Item 2',
    description: 'Description 2',
    image: 'https://via.placeholder.com/300',
  },
  {
    name: 'Item 3',
    description: 'Description 3',
    image: 'https://via.placeholder.com/300',
  },
];

const news: eventBoxprops = {
  heading: 'news highlights',
  links: [
    {
      title: 'Lorem ipsum lorem ipsum it is',
      href: '',
    },
    {
      title: 'Lorem ipsum lorem ipsum it is',
      href: '',
    },
    {
      title: 'Lorem ipsum lorem ipsum it is',
      href: '',
    },
    {
      title: 'Lorem ipsum lorem ipsum it is',
      href: '',
    },
    {
      title: 'Lorem ipsum lorem ipsum it is',
      href: '',
    },
  ],
  button: {
    name: 'view all events',
    href: '',
  },
};

const newsOverview: overviewBoxProps = {
  title: 'news overview',
  eventLink: '',
  images: [''],
  content:
    "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum. lorem ipsum's",
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
  },
  invisibleScrollBar: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

export const HomePage = () => {
  //temp data
  const isLoggedIN: Boolean = false;
  const classes = useStyles();
  return (
    <Box mx={[1, 3, 5, 10]} mt={[3, 4, 7]}>
      <Box display='flex'>
        <EventBox {...news} />
        <EventOverview {...newsOverview} />
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
