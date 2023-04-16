import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getClubById } from '../../boundaries/club-backend/api';
import { club } from '../../boundaries/club-backend/model';
import { makeStyles } from '@material-ui/styles';
import { Box, Typography, Button } from '@mui/material';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { styled } from '@mui/material/styles';
import ImageCarousel from '../utils/carousel/ImageCarousel';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { AppRoutes } from '../../routing/routes';
import { images } from '../home/Home';

// import { useNavigate } from 'react-router-dom';

const BlogPostCardMediaWrapper = styled('div')({
  paddingTop: 'calc(100% * 4 / 4)',
  position: 'relative',
});

export const CommonClubDetails = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const clubId = searchParams.get('clubId');

  const [club, setClub] = useState<club | null>(null);

  useEffect(() => {
    console.log('clubid is ', clubId);
    const getClub = async () => {
      try {
        const response = await getClubById({ id: clubId ? clubId : '201' });
        setClub(response.data.club);
        console.log(club);
      } catch (error) {
        console.error(error);
      }
    };
    getClub();
  }, [clubId]);

  console.log(club?.images[0]);

  if (!club) {
    return (
      <Box display='flex' alignItems='center' justifyContent='center'>
        <Typography variant='h6'>Loading...</Typography>
      </Box>
    );
  }

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
            {club.name}
          </Typography>
        </Box>
        <Box mt={[1, 3]} display='flex' gap={2} flexWrap='wrap'>
          <Box flexBasis={['100%', '100%', '70%']} order={[2, 1]}>
            <Typography variant='h6' sx={{ color: 'white' }} textTransform='uppercase'>
              Club Overview
            </Typography>
            <Box mr={[2, 3]} mt={[2, 3]}>
              <Typography variant='body1' sx={{ color: 'white' }}>
                {club.desc}
              </Typography>
            </Box>
            <Box mt={[2, 3]} display='flex' flexDirection='column' justifyContent='flex-start'>
              <Box display='flex' gap={2}>
                <Typography variant='subtitle2' sx={{ fontsize: '2rem', fontWeight: 'bold' }}>
                  Faculty Cordinator:
                </Typography>
                <Typography>{club.cordinatorName}</Typography>
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
                showDots={false}
                autoPlay
                infinite
                removeArrowOnDeviceType={['desktop', 'tablet', 'mobile']}
                autoPlaySpeed={1000}
              >
                {club.images.map((img: string) => {
                  return <img src={img} style={{ height: '25rem', paddingBottom: '1rem' }}></img>;
                })}
              </Carousel>
            </BlogPostCardMediaWrapper>
          </Box>
        </Box>
        <Box
          mt={[1, 7, 20]}
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
          <Typography variant='h6' sx={{ color: '#1E1E1E' }} textTransform='uppercase'>
            events over the years
          </Typography>
          <Box mt={[1, 3]}>
            <ImageCarousel data={club.images} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
