import { FC, useEffect, useState } from 'react';
import * as Yup from 'yup';
import {
  Autocomplete,
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

type Option = {
  text: string;
  value: string;
};

const clubs: Option[] = [
  { text: 'Robaroo', value: 'Robaroo' },
  { text: 'Tooryanad', value: 'JO' },
  { text: 'Ae-se-Aenak', value: 'KZ' },
  { text: 'E-cell', value: 'KE' },
  { text: 'Rotra Club', value: 'KI' },
];

const OrganizerLogin: FC = (props) => {
  const [errMsg, setErrMsg] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const formik = useFormik({
    initialValues: {
      club: '',
      id: '',
      password: '',
      submit: null,
    },
    validationSchema: Yup.object({
      club: Yup.string().required('Please select a club'),
      id: Yup.string().email('Must be a valid id').max(255).required('Id is required'),
      password: Yup.string().max(255).required('Password is required'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      // await dispatch(loginAsync({ email: values.email, password: values.password }));

      if (
        values.club === 'Robaroo' &&
        values.id === 'robaroo@gmail.com' &&
        values.password === '12345'
      ) {
        console.log('verified');
        
      } else {
        console.log('not verified');
      }

      // } catch (err: any) {
      //   console.log(err);
      // }
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
                <Typography variant='h4'>Organizer Log in</Typography>
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
                {/* <Autocomplete
                  getOptionLabel={(option: Option) => option.text}
                  options={clubs}
                  renderInput={(params): JSX.Element => (
                    <TextField
                      {...params}
                      fullWidth
                      label='Select a club'
                      name='club'
                      error={Boolean(formik.touched.club && formik.errors.club)}
                      helperText={formik.touched.club && formik.errors.club}
                      margin='normal'
                      type='text'
                      value={formik.values.club}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  )}
                /> */}

                <TextField
                  fullWidth
                  label='Select a club'
                  name='club'
                  error={Boolean(formik.touched.club && formik.errors.club)}
                  helperText={formik.touched.club && formik.errors.club}
                  margin='normal'
                  type='text'
                  value={formik.values.club}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />

                <TextField
                  fullWidth
                  label='Club Id'
                  error={Boolean(formik.touched.id && formik.errors.id)}
                  helperText={formik.touched.id && formik.errors.id}
                  margin='normal'
                  name='id'
                  type='email'
                  value={formik.values.id}
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
                  <Typography color='error' variant='subtitle2'>
                    {/* {error} */}
                  </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Button fullWidth size='large' type='submit' variant='contained'>
                    Log In
                  </Button>
                </Box>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default OrganizerLogin;
