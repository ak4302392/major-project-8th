import { Box, Button, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const [state, setState] = React.useState({
    checked: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, checked: event.target.checked });
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
          sign up
        </Typography>
      </Box>

      <Box width='100%' display='flex' flexDirection='column' gap={2}>
        <TextField
          sx={{ color: 'white' }}
          label='Name'
          name='name'
          type='text'
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          name='email'
          label='E-mail'
          type='text'
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          name='phone'
          label='Mobile Number'
          type='text'
          value={phone}
          onChange={handlePhoneChange}
        />
        <TextField
          name='password'
          label='Password'
          type='text'
          value={password}
          onChange={handlePasswordChange}
        />
        <TextField
          label='Re-enter password'
          name='confirmPassword'
          type='password'
          value={confirmPassword}
          onChange={handleConfirmPassword}
        />
      </Box>

      <Box width='100%' my={[2]}>
        <FormControlLabel
          control={<Switch checked={state.checked} onChange={handleChange} />}
          label={
            <Typography variant='subtitle1' sx={{ color: 'white', fontWeight: 600 }}>
              MANIT Student
            </Typography>
          }
        />
      </Box>

      {state.checked ? (
        <Box width='100%' display='flex' flexDirection='column' mb={[2]}>
          <TextField name='scholarNumber' label='Scholar Number' />
        </Box>
      ) : (
        <></>
      )}

      <Box>
        <Button
          variant='contained'
          color='secondary'
          className='uppercase'
          sx={{
            boxShadow:
              '-1px -3px 4px rgba(245, 245, 245, 0.4), 1px 3px 4px rgba(102, 102, 102, 0.4)',
          }}
        >
          sign up
        </Button>
      </Box>
    </Box>
  );
};
