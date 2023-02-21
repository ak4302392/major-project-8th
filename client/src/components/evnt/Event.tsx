import { Box, Typography } from '@mui/material';
import React from 'react';
import { images } from '../home/Home';
import ImageCarousel from '../utils/carousel/ImageCarousel';

export default function Event() {
  return (
    <Box position='relative'>
      <Box position='relative'>
        <Box
          width='100%'
          height='20rem'
          sx={{ backgroundColor: '#45B3D6', position: 'absolute', top: '5rem', zIndex: 1 }}
          px={[1, 2, 5, 10]}
          py={[1, 2, 4]}
          overflow='hidden'
        >
          <Typography variant='h6' color='white' textTransform='uppercase'>
            club overview
          </Typography>
        </Box>
        <Box
          position='absolute'
          sx={{
            backgroundColor: '#45B3D6',
            left: '70%',
            zIndex: 2,
            height: '50rem',
            width: '20rem',
          }}
          py={[1, 2, 4]}
          px={[1, 2, 5]}
        >
          <Typography variant='h5' color='white' textTransform='uppercase' textAlign='center'>
            roobaroo
          </Typography>
        </Box>
        {/* <Box position='absolute' zIndex={5}>
          <ImageCarousel data={images} />
        </Box> */}
      </Box>
    </Box>
  );
}
