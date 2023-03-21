import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Button, Typography } from '@mui/material';
import { button } from '../event-box/EventBox';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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

export type overviewBoxProps = {
  title: string;
  href: string;
  desc: string;
  images: string[];
  button?: button;
};
export default function EventOverview({ title, href, desc, images, button }: overviewBoxProps) {
  const classes = useStyles();
  const isLoggedIN: Boolean = true;
  return (
    <Box
      p={[0.5, 1, 2]}
      sx={{ backgroundColor: '#45B3D6', width: '40%' }}
      display='flex'
      alignItems='center'
      flexDirection='column'
    >
      <Box mb={[1, 2]}>
        <a href={href}>
          <Typography variant='h6' color='white' textTransform='uppercase'>
            {title}
          </Typography>
        </a>
      </Box>
      <Box sx={{ height: '10rem', width: '16rem' }}>
        <img src={images[0]} />
      </Box>
      <Box
        height='100px'
        overflow='auto'
        px={[1, 2, 3]}
        mt={[2, 4]}
        className={classes.invisibleScrollBar}
      >
        <Typography color='white' variant='subtitle1'>
          {desc}
        </Typography>
      </Box>
      <Box display='flex' justifyContent='center' mt={[1, 3, 5]}>
        <Button
          variant='contained'
          color='primary'
          href={button?.href}
          sx={{
            boxShadow:
              '-1px -3px 4px rgba(245, 245, 245, 0.4), 1px 3px 4px rgba(102, 102, 102, 0.4)',
          }}
        >
          LOGIN TO REGISTER
        </Button>
      </Box>
    </Box>
  );
}
