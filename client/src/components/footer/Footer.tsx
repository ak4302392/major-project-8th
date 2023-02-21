import { makeStyles } from '@material-ui/styles';
import { Container, Typography, Link, Box, IconButton } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';

const useStyles = makeStyles({
  button: {
    '&.hover': {
      color: 'blue',
    },
  },
});

export const Footer = () => {
  const classes = useStyles();
  return (
    <Box
      mt={[1, 2, 4, 5]}
      px={[1, 4, 10, 50]}
      sx={{ backgroundColor: '#fafafb', padding: '30px 0 5px 0', borderTop: '1px solid #eee' }}
    >
      <Box display='flex' gap={[1, 3, 8]} flexWrap='wrap'>
        <Box display='flex' flexDirection='column' gap={1}>
          <Box display='flex' gap={1} alignItems='center'>
            <Box height='1.5rem' width='1.5rem'>
              <img src='/images/titles/manit-logo.png' alt='logo'></img>
            </Box>
            <Typography variant='h5' color='primary'>
              Major Project
            </Typography>
          </Box>
          <Box>
            <Typography variant='subtitle2'>© 2023, Major Project All rights reserved.</Typography>
          </Box>
          <Box display='flex' gap={[1, 2]}>
            <IconButton className={(classes.button, 'my-custom-class')}>
              <TwitterIcon />
            </IconButton>
            <IconButton className={(classes.button, 'my-custom-class')}>
              <FacebookIcon />
            </IconButton>
            <IconButton>
              <InstagramIcon />
            </IconButton>
            <IconButton>
              <LinkedInIcon />
            </IconButton>
            <IconButton>
              <TelegramIcon />
            </IconButton>
          </Box>
        </Box>
        <Box display='flex' flexDirection='column'>
          <Box mb={[1, 2]}>
            <Typography variant='h6'>Company</Typography>
          </Box>
          <Box mb={[1, 2]}>
            <Typography variant='subtitle1'>About Us</Typography>
            <Typography variant='subtitle1'>Contact</Typography>
            <Typography variant='subtitle1'>Email</Typography>
          </Box>
        </Box>
        <Box display='flex' flexDirection='column'>
          <Box mb={[1, 2]}>
            <Typography variant='h6'>Support</Typography>
          </Box>
          <Box mb={[1, 2]}>
            <Typography variant='subtitle1'>Support</Typography>
            <Typography variant='subtitle1'>Contact</Typography>
            <Typography variant='subtitle1'>Email</Typography>
          </Box>
        </Box>
        <Box display='flex' flexDirection='column'>
          <Box mb={[1, 2]}>
            <Typography variant='h6'>Account</Typography>
          </Box>
          <Box mb={[1, 2]}>
            <Typography variant='subtitle1'>Account</Typography>
            <Typography variant='subtitle1'>Sing Up</Typography>
            <Typography variant='subtitle1'>Log In</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
