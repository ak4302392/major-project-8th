import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Button, Typography } from '@mui/material';
import { button } from '../event-box/EventBox';

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
  eventLink: string;
  images: string[];
  content: string;
  button?: button;
};
export default function EventOverview({
  title,
  eventLink,
  images,
  content,
  button,
}: overviewBoxProps) {
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
        <a href={eventLink}>
          <Typography variant='h6' color='white' textTransform='uppercase'>
            {title}
          </Typography>
        </a>
      </Box>
      <Box>
        {images.map((img) => {
          return <img src={img}></img>;
        })}
      </Box>
      <Box height='100px' overflow='auto' px={[1, 2, 3]} className={classes.invisibleScrollBar}>
        <Typography color='white' variant='subtitle1'>
          {content}
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
          {button?.name}
        </Button>
      </Box>
    </Box>
  );
}
