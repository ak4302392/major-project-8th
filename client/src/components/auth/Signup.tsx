import { FC, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  FormHelperText,
  Link,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerAsync } from './authSlice';
import { AppDispatch } from '../../app/type';

export const Signup: FC = () => {
  const [isManitStudent, setIsManitStudent] = useState(false);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsManitStudent(event.target.checked);
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const dispatch = useDispatch<AppDispatch>();
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      phone: '',
      isManitStudent: false,
      scholarNumber: '',
      password: '',
      passwordConfirm: '',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      name: Yup.string().max(255).required('Name is required'),
      isManitStudent: Yup.string().required('College is required'),
      password: Yup.string().min(7).max(255).required('Password is required'),
      passwordConfirm: Yup.string().min(7).max(255).required('Confirm password is required'),
      scholarNumber: Yup.string().when('isManitStudent', {
        is: true,
        then: Yup.string().nullable().min(9).max(9).required('Scholar number is required'),
      }),
      phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        console.log(values);
        dispatch(registerAsync(values));
      } catch (err) {
        console.error(err);
      }
    },
  });
  return (
    <Box
      sx={{
        minHeight: '100%',
        p: 3,
      }}
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
                <Typography variant='h4'>Register</Typography>
                <Typography color='textSecondary' sx={{ mt: 1 }} variant='body2'>
                  Register on the internal platform
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
              <form noValidate onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  label='Name'
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  margin='normal'
                  name='name'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <TextField
                  fullWidth
                  label='Email Address'
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  margin='normal'
                  name='email'
                  type='email'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <TextField
                  fullWidth
                  label='Phone Number'
                  error={Boolean(formik.touched.phone && formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  name='phone'
                  margin='normal'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
                <TextField
                  fullWidth
                  label='Password'
                  error={Boolean(formik.touched.password && formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  margin='normal'
                  name='password'
                  type='password'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <TextField
                  fullWidth
                  label='Password Confirmation'
                  error={Boolean(formik.touched.passwordConfirm && formik.errors.passwordConfirm)}
                  helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                  name='passwordConfirm'
                  type='password'
                  margin='normal'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.passwordConfirm}
                />
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                  }}
                  margin='normal'
                >
                  <FormControlLabel
                    control={
                      <Switch
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        edge='start'
                        name='isManitStudent'
                        checked={formik.values.isManitStudent}
                        value={formik.values.isManitStudent}
                      />
                    }
                    label={<Typography variant='subtitle2'>MANIT Student</Typography>}
                    {...(formik.touched.isManitStudent && (
                      <FormHelperText>{formik.errors.isManitStudent}</FormHelperText>
                    ))}
                  />
                </Box>
                {formik.values.isManitStudent ? (
                  <TextField
                    fullWidth
                    label='Scholar Number'
                    error={Boolean(formik.touched.scholarNumber && formik.errors.scholarNumber)}
                    helperText={formik.touched.scholarNumber && formik.errors.scholarNumber}
                    name='scholarNumber'
                    margin='normal'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.scholarNumber}
                  />
                ) : (
                  <></>
                )}
                <Box sx={{ mt: 2 }}>
                  <Button fullWidth size='large' type='submit' variant='contained'>
                    Register
                  </Button>
                </Box>
              </form>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Link color='textSecondary' href='#' variant='body2'>
              Already have an account
            </Link>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
