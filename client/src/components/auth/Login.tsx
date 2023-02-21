import { Box, Typography, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import React, { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      px={[1, 2, 3, 4]}
      py={[2, 3, 5]}
      alignItems='center'
      justifyContent='cetner'
      sx={{ backgroundColor: '#45B3D6', borderRadius: '4px' }}
      mt={[1, 3, 5, 7]}
      width='20%'
      mx='auto'
    >
      <Box mb={[2, 3, 4]}>
        <Typography className='uppercase' variant='h6' color='white'>
          Account Login
        </Typography>
      </Box>
      <Box display='flex' flexDirection='column' gap={2}>
        <TextField
          sx={{ color: 'white' }}
          name='email'
          type='email'
          value={email}
          placeholder='E-mail'
          onChange={handleEmailChange}
        />
        <TextField
          name='password'
          placeholder='password'
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box pt={[1, 5]}>
        <Button
          variant='contained'
          color='secondary'
          className='uppercase'
          sx={{
            boxShadow:
              '-1px -3px 4px rgba(245, 245, 245, 0.4), 1px 3px 4px rgba(102, 102, 102, 0.4)',
          }}
        >
          log in
        </Button>
      </Box>
      <Box pt={[1, 3]}>
        <Button
          variant='contained'
          color='primary'
          sx={{
            boxShadow:
              '-1px -3px 4px rgba(245, 245, 245, 0.4), 1px 3px 4px rgba(102, 102, 102, 0.4)',
          }}
        >
          Not a User? Sign Up!
        </Button>
      </Box>

      <Box sx={{ marginLeft: 'auto', marginTop: '1rem' }}>
        <a href=''>
          <Typography
            className='uppercase'
            sx={{ textDecoration: 'underline' }}
            variant='subtitle2'
          >
            organizer login
          </Typography>
        </a>
      </Box>
    </Box>
  );
}
