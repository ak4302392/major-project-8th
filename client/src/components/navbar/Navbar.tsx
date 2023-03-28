import { makeStyles } from '@material-ui/styles';
import {
  Box,
  Button,
  Grid,
  Typography,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  IconButton,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import React, { useEffect, useState } from 'react';
import { getToken, isUserAuthenticated, logout } from '../auth/authSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import store from '../../app/state';
import { isOrganizerAuthenticated, organizerLogout } from '../auth/organizerAuthSlice';
import { AppRoutes } from '../../routing/routes';

const useStyles = makeStyles((theme) => {});

const clubData = [
  {
    category: 'Literacy Club',
    clubs: [
      {
        name: 'Rajbhasha Cell',
        clubLink: '',
        externalLink: '',
      },
      {
        name: 'Rajbhasha Cell',
        clubLink: '',
        externalLink: '',
      },
      ,
      {
        name: 'Rajbhasha Cell',
        clubLink: '',
        externalLink: '',
      },
      ,
      {
        name: 'Rajbhasha Cell',
        clubLink: '',
        externalLink: '',
      },
    ],
  },
  {
    category: 'Technical Club',
    clubs: [
      {
        name: 'Rajbhasha Cell',
        clubLink: '',
        externalLink: '',
      },
      {
        name: 'Rajbhasha Cell',
        clubLink: '',
        externalLink: '',
      },
      ,
      {
        name: 'Rajbhasha Cell',
        clubLink: '',
        externalLink: '',
      },
      ,
      {
        name: 'Rajbhasha Cell',
        clubLink: '',
        externalLink: '',
      },
    ],
  },
];

export const Navbar = () => {
  const [value, setValue] = useState('');

  const isLoggedIn = isUserAuthenticated(store.getState());

  const isOrganizerLoggedIn = isOrganizerAuthenticated(store.getState());

  // console.log(isOrganizerLoggedIn);

  //below code is to set the display of the bottom part of
  //the navbar as none when scrolling up
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [navbarBottomHidden, setNavbarBottomHidden] = useState<boolean>(false);

  const [openSelectIndex, setOpenSelectIndex] = useState(-1);

  const handleSelectOpen = (index: number) => () => {
    setOpenSelectIndex(index);
  };

  const handleSelectClose = () => {
    setOpenSelectIndex(-1);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollPos > currentScrollPos) {
        setNavbarBottomHidden(false);
      } else {
        setNavbarBottomHidden(true);
      }
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  // Attach the scroll listener on component mount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Detach the scroll listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    window.location.assign('/');
  };

  const handleOrganizerLogout = () => {
    dispatch(organizerLogout());
    window.location.assign('/');
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      sx={{ left: 0, right: 0, top: 0, zIndex: 100000 }}
      position={isSticky ? 'fixed' : 'static'}
    >
      <Box
        display='flex'
        alignItems='center'
        sx={{ backgroundColor: ' #067DBF', height: '3rem', padding: '1rem 2rem ' }}
        gap={2}
      >
        <Box>
          <img
            src='/images/titles/manit-logo.png'
            style={{ height: '3em', width: '3em' }}
            alt='logo'
          />
        </Box>
        <Box>
          <Typography variant='h5' color='white'>
            Maulana Azad National Institute Of Technology
          </Typography>
        </Box>
        <Box marginLeft='auto'>
          <IconButton sx={{ color: 'white' }} href='/'>
            <HomeIcon sx={{ width: '1em', height: '1em' }} />
          </IconButton>
        </Box>
      </Box>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        sx={{ padding: '0.5rem', backgroundColor: '#043848' }}
      >
        <Box pl={[0.1, 2, 3, 5]}>
          <Typography color='white' variant='h6'>
            STUDENT ACTIVITY PORTAL
          </Typography>
        </Box>

        {isLoggedIn && (
          <Box display='flex' gap={1}>
            <Button variant='contained' href='/user/dashboard' color='secondary'>
              USER PROFILE
            </Button>
            <Button variant='contained' onClick={handleLogout} color='error'>
              LOG OUT
            </Button>
          </Box>
        )}

        {isOrganizerLoggedIn && (
          <Box display='flex' gap={1}>
            <Button variant='contained' href={AppRoutes.CLUB_DETAILS} color='primary'>
              CLUB PROFILE
            </Button>
            <Button variant='contained' onClick={handleOrganizerLogout} color='error'>
              LOG OUT
            </Button>
          </Box>
        )}

        {!isLoggedIn && !isOrganizerLoggedIn && (
          <Box display='flex' gap={1}>
            <Button variant='contained' href='/auth/log-in' color='primary'>
              LOG IN
            </Button>
            <Button variant='contained' href='/auth/sign-up' color='secondary'>
              SIGN UP
            </Button>
          </Box>
        )}
      </Box>

      <Box sx={{ backgroundColor: '#60BEDC' }} display={navbarBottomHidden ? 'none' : 'block'}>
        <Grid container display='flex' flexWrap='wrap'>
          <Grid item xs={6} md={3}>
            <FormControl variant='outlined' sx={{ width: '100%' }}>
              <InputLabel shrink={false} sx={{ color: 'white' }} id='demo-simple-select-label'>
                Technical Club
              </InputLabel>
              <Select
                sx={{ borderRadius: 0 }}
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value=''
                open={openSelectIndex === 0}
                onClose={handleSelectClose}
                onOpen={handleSelectOpen(0)}
              >
                <MenuItem value={10}>Robotics</MenuItem>
                <MenuItem value={20}>Vision</MenuItem>
                <MenuItem value={30}>Think India</MenuItem>
                <MenuItem value={30}>Pixel</MenuItem>
                <MenuItem value={30}>Technosearch</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl variant='outlined' sx={{ width: '100%' }}>
              <InputLabel shrink={false} sx={{ color: 'white' }} id='demo-simple-select-label'>
                Literacy Club
              </InputLabel>
              <Select
                sx={{ borderRadius: 0 }}
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value=''
                open={openSelectIndex === 1}
                onClose={handleSelectClose}
                onOpen={handleSelectOpen(1)}
              >
                <MenuItem value={10}>Rajbhasha Cell</MenuItem>
                <MenuItem value={20}>Drishtant Cell</MenuItem>
                <MenuItem value={30}>Magazine Editorial Cell</MenuItem>
                <MenuItem value={30}>Debating Cell</MenuItem>
                <MenuItem value={30}>Quizzers Cell</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl variant='outlined' sx={{ width: '100%' }}>
              <InputLabel shrink={false} sx={{ color: 'white' }} id='demo-simple-select-label'>
                Cultural Club
              </InputLabel>
              <Select
                sx={{ borderRadius: 0 }}
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value=''
                open={openSelectIndex === 2}
                onClose={handleSelectClose}
                onOpen={handleSelectOpen(2)}
              >
                <MenuItem value={10}>Robaroo</MenuItem>
                <MenuItem value={20}>A se Aenak</MenuItem>
                <MenuItem value={30}>Maffick</MenuItem>
                <MenuItem value={30}>Technosearch</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl variant='outlined' sx={{ width: '100%' }}>
              <InputLabel
                sx={{
                  color: 'white',
                  '& .focused': {
                    position: 'fixed',
                  },
                }}
                id='demo-simple-select-label'
                shrink={false}
              >
                Others
              </InputLabel>
              <Select
                sx={{ borderRadius: 0 }}
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value=''
                open={openSelectIndex === 3}
                onClose={handleSelectClose}
                onOpen={handleSelectOpen(3)}
              >
                <MenuItem value={10}>ISTE</MenuItem>
                <MenuItem value={20}>IEEE</MenuItem>
                <MenuItem value={30}>Purge</MenuItem>
                <MenuItem value={30}>Inspire</MenuItem>
                <MenuItem value={30}>SAE Club</MenuItem>
                <MenuItem value={30}>NSS</MenuItem>
                <MenuItem value={30}>EBSB</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
