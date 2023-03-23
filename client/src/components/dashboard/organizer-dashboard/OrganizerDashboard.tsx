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
import { useSelector } from 'react-redux';
import { getClub } from '../../auth/organizerAuthSlice';
import store from '../../../app/state';

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

  const clubData = getClub(store.getState());

  console.log(clubData);

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
              {/* {links.map((item) => {
                return (
                  <a onClick={() => handleNewsClick(item)} href={item.href}>
                    <Typography
                      sx={{ py: '2px' }}
                      onMouseOver={(e) => {
                        const target = e.target as HTMLSpanElement;
                        target.style.color = 'black';
                        handleNewsClick(item);
                      }}
                      onMouseOut={(e) => {
                        const target = e.target as HTMLSpanElement;
                        target.style.color = 'white';
                      }}
                      color='white'
                      variant='subtitle1'
                    >
                      {item.title}
                    </Typography>
                  </a>
                );
              })} */}
            </Box>
          </Box>
          <Box display='flex' justifyContent='center' mt={[1, 3, 5]}>
            <Button
              variant='contained'
              color='primary'
              sx={{
                boxShadow:
                  '-1px -3px 4px rgba(245, 245, 245, 0.4), 1px 3px 4px rgba(102, 102, 102, 0.4)',
                textTransform: 'uppercase',
              }}
              endIcon={<ArrowForwardIosIcon />}
              href='/'
            >
              view all events
            </Button>
            <Button
              variant='contained'
              color='primary'
              sx={{
                boxShadow:
                  '-1px -3px 4px rgba(245, 245, 245, 0.4), 1px 3px 4px rgba(102, 102, 102, 0.4)',
                textTransform: 'uppercase',
              }}
              endIcon={<ArrowForwardIosIcon />}
              href='/'
            >
              create event
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
