import { Box } from '@mui/system';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export type image = {
  id: number;
  src: string;
  alt: string;
};
export interface carouselProps {
  data: string[];
}

export default function ImageCarousel({ data }: carouselProps) {
  return (
    <Carousel
      responsive={{
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
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
      autoPlaySpeed={1000}
    >
      {data.map((image, index) => (
        <Box mr={[1, 2, 3]} sx={{ height: '10rem' }}>
          <img key={index} src={image} alt='image' style={{ objectFit: 'contain' }} />
        </Box>
      ))}
    </Carousel>
  );
}
