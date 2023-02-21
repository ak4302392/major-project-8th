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

const useStyles = makeStyles((theme) => {});

export const Navbar = () => {
  const [value, setValue] = useState('');

  const isLoggedIn: Boolean = false;

  //below code is to set the display of the bottom part of
  //the navbar as none when scrolling up
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [navbarBottomHidden, setNavbarBottomHidden] = useState<boolean>(false);

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

  return (
    <Box
      display='flex'
      flexDirection='column'
      sx={{ position: 'sticky', left: 0, right: 0, top: 0, zIndex: 100000 }}
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
        {isLoggedIn ? (
          <Box display='flex' gap={1}>
            <Button variant='contained' href='/user/dashboard' color='secondary'>
              USER PROFILE
            </Button>
          </Box>
        ) : (
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
                Industry Type
              </InputLabel>
              <Select
                sx={{ borderRadius: 0 }}
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value=''
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl variant='outlined' sx={{ width: '100%' }}>
              <InputLabel shrink={false} sx={{ color: 'white' }} id='demo-simple-select-label'>
                Industry Type
              </InputLabel>
              <Select
                sx={{ borderRadius: 0 }}
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value=''
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl variant='outlined' sx={{ width: '100%' }}>
              <InputLabel shrink={false} sx={{ color: 'white' }} id='demo-simple-select-label'>
                Industry Type
              </InputLabel>
              <Select
                sx={{ borderRadius: 0 }}
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value=''
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
                Industry Type
              </InputLabel>
              <Select
                sx={{ borderRadius: 0 }}
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value=''
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
