import { FC, useEffect, useState } from 'react';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { loginAsync } from './authSlice';
import { AppDispatch } from '../../app/type';
import { AppRoutes } from '../../routing/routes';
import { push } from 'connected-react-router';
import { OrganizerLoginAsync } from './organizerAuthSlice';
import { makeStyles } from '@material-ui/styles';

type Option = {
  text: string;
  value: string;
};

const clubs: Option[] = [
  { text: 'Roobaroo', value: '101' },
  { text: 'A se Aenak', value: '102' },
  { text: 'Maffick', value: '103' },
  { text: 'Spic Macay', value: '104' },
  { text: 'Robotics', value: '201' },
  { text: 'Vision', value: '202' },
  { text: 'Think India', value: '203' },
  { text: 'Pixel', value: '204' },
  { text: 'Technosearch', value: '205' },
  { text: 'Rajbhasha Cell', value: '301' },
  { text: 'Drishtant Cell', value: '302' },
  { text: 'Magazine Editorial Cell', value: '303' },
  { text: 'Debating Cell', value: '304' },
  { text: 'Quizzers Cell', value: '305' },
  { text: 'ISTE', value: '401' },
  { text: 'IEEE', value: '402' },
  { text: 'Purge', value: '403' },
  { text: 'Inspire', value: '405' },
  { text: 'NSS', value: '406' },
  { text: 'EBSB', value: '407' },
];

const useStyles = makeStyles(() => ({
  scrollbar: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));

const OrganizerLogin: FC = (props) => {
  const classes = useStyles();
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
      await dispatch(
        OrganizerLoginAsync({ clubId: values.club, email: values.id, password: values.password })
      );
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
                <FormControl
                  margin='normal'
                  error={Boolean(formik.touched.club && formik.errors.club)}
                  fullWidth
                  variant='outlined'
                >
                  <InputLabel>Club</InputLabel>
                  <Select
                    value={formik.values.club}
                    label='club'
                    name='club'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    MenuProps={{
                      style: {
                        maxHeight: '300px',
                        minWidth: '150px',
                      },
                      PaperProps: {
                        className: classes.scrollbar,
                        style: {
                          width: '1px',
                        },
                      },
                    }}
                    inputProps={{
                      autoComplete: 'on',
                    }}
                    defaultValue='Pacific Standard Time'
                  >
                    {clubs.map((club) => {
                      return <MenuItem value={club.value}>{club.text}</MenuItem>;
                    })}
                  </Select>
                  {formik.touched.club && <FormHelperText>{formik.errors.club}</FormHelperText>}
                </FormControl>

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
