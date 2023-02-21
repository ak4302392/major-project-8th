import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Button, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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

type link = {
  title: string;
  href: string;
};

export type button = {
  name: string;
  href: string;
};

export type eventBoxprops = {
  heading: string;
  links: link[];
  button?: button;
};

export default function EventBox({ heading, links, button }: eventBoxprops) {
  const classes = useStyles();
  return (
    <Box width='60%' p={[0.5, 1, 2]} mr={[1, 5, 7]} sx={{ backgroundColor: '#45B3D6' }}>
      <Box mb={[1, 2]}>
        <Typography variant='h6' color='white' textTransform='uppercase'>
          {heading}
        </Typography>
      </Box>
      <Box overflow='auto' className={classes.newsBox} height=' 100px'>
        <Box display='flex' flexDirection='column'>
          {links.map((item) => {
            return (
              <a href={item.href}>
                <Typography
                  onMouseOver={(e) => {
                    const target = e.target as HTMLSpanElement;
                    target.style.color = 'black';
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
          })}
        </Box>
      </Box>
      {button ? (
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
            href={button?.href}
          >
            {button?.name}
          </Button>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}
