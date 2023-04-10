import { makeStyles } from '@material-ui/styles';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { images } from '../home/Home';
import ImageCarousel from '../utils/carousel/ImageCarousel';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { styled } from '@mui/material/styles';

const BlogPostCardMediaWrapper = styled('div')({
  paddingTop: 'calc(100% * 4 / 4)',
  position: 'relative',
});

const robarooImages = [
  'https://scontent.fdel29-1.fna.fbcdn.net/v/t39.30808-6/331019069_1183146505709901_5017334633546871179_n.jpg?stp=dst-jpg_s960x960&_nc_cat=103&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=p0erzgHMf1IAX_nOqI0&_nc_ht=scontent.fdel29-1.fna&oh=00_AfDntcI3qFL_ScDvAJ7gevgOIeio2KGYfHMmB-1044XdIA&oe=641EA781',
  'https://scontent.fdel29-1.fna.fbcdn.net/v/t39.30808-6/327340648_920376729155913_3915145391008624100_n.jpg?stp=dst-jpg_s960x960&_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=nBeyNi7VuN4AX_SoK4O&_nc_ht=scontent.fdel29-1.fna&oh=00_AfA2VwRFOSdmSliVEZ7eEX3zsWE2Fx1ZvweyO_6Q4aYipg&oe=641D6981',
];

export default function Event() {
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
            ROBAROO
          </Typography>
        </Box>
        <Box mt={[1, 3]} display='flex' gap={2} flexWrap='wrap'>
          <Box flexBasis={['100%', '100%', '70%']} order={[2, 1]}>
            <Typography variant='h6' sx={{ color: 'white' }} textTransform='uppercase'>
              Club Overview
            </Typography>
            <Box mr={[2, 3]} mt={[2, 3]}>
              <Typography variant='body1' sx={{ color: 'white' }}>
                "Roobaroo is the cultural society of MANIT. A nexus of the variegated talent of the
                college, Roobaroo provides a platform for individuals endowed with artist abilities,
                abilities, ranging from music, dance, art, anchoring, writing, designin gn to other
                to other unconventional talents. Established in 2008 by creative enthu st society
                has society has grown significantly in the period, and in prevalent ti m es,
                organises several events. Monthly live dance and music sessions, titled 'GIG -
                A-NIGHT' are he to facilitate a platform for honing local talent and to provide en t
                n youth body. youth body. Selections for the society are done through annual au d
                ition events, entitled 'TICKET TO ROOBAROO’. The society also performs in ns of
                Republic day, Republic day, Independence day and Engineers' day. Teams of artis ts
                from Roobaroo also participate in Inter-college cultural events and fests."
              </Typography>
            </Box>
            <Box mt={[2, 3]} display='flex' flexDirection='column' justifyContent='flex-start'>
              <Box display='flex' gap={2}>
                <Typography variant='subtitle2' sx={{ fontsize: '2rem', fontWeight: 'bold' }}>
                  Faculty Cordinator:
                </Typography>
                <Typography>Dr. Ravi Dwivedi</Typography>
              </Box>
              <Box display='flex' gap={2}>
                <Typography variant='subtitle2' sx={{ fontsize: '2rem', fontWeight: 'bold' }}>
                  Co-cordinator:
                </Typography>
                <Typography variant='body2'>
                  Dr. Chandan K Verma, Dr. Jyoti Rani, Dr. Neha Kolhe
                </Typography>
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
                {robarooImages.map((img) => {
                  return <img src={img} style={{ height: '25rem', paddingBottom: '1rem' }}></img>;
                })}
              </Carousel>
            </BlogPostCardMediaWrapper>
          </Box>
        </Box>
        <Box mt={[1, 7,12]} display='flex' flexDirection='column'>
          <Typography variant='h6' sx={{ color: '#1E1E1E' }} textTransform='uppercase'>
            events over the years
          </Typography>
          <Box mt={[1, 3]}>
            <ImageCarousel data={robarooImages} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
