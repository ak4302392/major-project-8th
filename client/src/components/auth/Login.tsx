import { FC, useEffect, useState } from 'react';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { loginAsync } from './authSlice';
import { AppDispatch } from '../../app/type';
import { AppRoutes } from '../../routing/routes';
import { push } from 'connected-react-router';
import { unwrapResult } from '@reduxjs/toolkit';
import { LoginResponsePayload } from '../../boundaries/ad-lnx-backend/auth/model';

const Login: FC = (props) => {
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      password: Yup.string().max(255).required('Password is required'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await dispatch(loginAsync({ email: values.email, password: values.password }));
      } catch (err: any) {
        console.log(err);
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: '100%',
        p: 3,
      }}
      mt={[2, 3, 7]}
    >
      <Container maxWidth='sm'>
        <Card>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: 400,
              p: 4,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <Typography variant='h4'>Log in</Typography>
                <Typography color='textSecondary' sx={{ mt: 1 }} variant='body2'>
                  Log in on the internal platform
                </Typography>
              </div>
              <img
                alt='manit-logo'
                src='/images/titles/manit-logo.png'
                style={{
                  maxWidth: '53.62px',
                  width: '100%',
                }}
              />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              <form noValidate onSubmit={formik.handleSubmit} {...props}>
                <TextField
                  fullWidth
                  label='Email Address'
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  margin='normal'
                  name='email'
                  type='email'
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <TextField
                  fullWidth
                  label='Password'
                  error={Boolean(formik.touched.password && formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  margin='normal'
                  name='password'
                  type='password'
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <Box sx={{ mt: 2 }}>
                  <Button fullWidth size='large' type='submit' variant='contained'>
                    Log In
                  </Button>
                </Box>
              </form>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box display='flex' justifyContent='space-between'>
              <Link color='textSecondary' href={AppRoutes.SIGNUP} variant='body2'>
                Create new account
              </Link>
              <Link color='textSecondary' variant='body2' href={AppRoutes.ORGANIGER_LOGIN}>
                Organizer login
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
