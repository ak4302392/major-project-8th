import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  TextField,
  Typography,
  Link,
} from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/type';
import * as Yup from 'yup';
import { emailOtpVerificationAsync } from './authSlice';

export const OtpVerification = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const userId = searchParams.get('userId');

  const dispatch = useDispatch<AppDispatch>();
  const formik = useFormik({
    initialValues: {
      otp: '',
      submit: null,
    },
    validationSchema: Yup.object({
      otp: Yup.string().required('Pleae enter 4 digits otp'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        console.log(values);
        dispatch(emailOtpVerificationAsync({ userId: userId??"", otp: values.otp }));
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
        mt:10,
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
                <Typography variant='h4'>OTP Verification</Typography>
                <Typography color='textSecondary' sx={{ mt: 1 }} variant='body2'>
                  Enter the four digit OTP sent on your email.
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
                  label='Enter 4 digits OTP'
                  error={Boolean(formik.touched.otp && formik.errors.otp)}
                  helperText={formik.touched.otp && formik.errors.otp}
                  margin='normal'
                  name='otp'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.otp}
                />
                <Box sx={{ mt: 2 }}>
                  <Button fullWidth size='large' type='submit' variant='contained'>
                    Submit
                  </Button>
                </Box>
              </form>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Link color='textSecondary' href='#' variant='body2'>
              Resend OTP
            </Link>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
