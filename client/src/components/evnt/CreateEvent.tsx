import { FC, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker, MobileDatePicker, StaticDatePicker } from '@mui/x-date-pickers';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { CreateEventAsync, getClub, OrganizerLoginAsync } from '../auth/organizerAuthSlice';
import store from '../../app/state';
import { AppDispatch } from '../../app/type';
import { useField, useFormikContext } from 'formik';

// import { DateTimePicker } from '@mui/x-date-pickers';

export const CreateEvent: React.FC<{}> = (props) => {
  const [eventDate, setEventDate] = useState<Date | null>(new Date());

  const clubData = getClub(store.getState());

  const dispatch = useDispatch<AppDispatch>();

  // const { setFieldValue } = useFormikContext();
  // // const [field] = useField(props);

  const formik = useFormik({
    initialValues: {
      name: '',
      desc: '',
      clubName: clubData.name,
      clubId: clubData.clubId,
      registeredMembers: [],
      eventDate: null,
      images: [],
      category: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required('Event name is required'),
      desc: Yup.string().min(200).max(2000).required('Event short description is required'),
      category: Yup.string().max(50).required('Event category is required'),
      images: Yup.object().required('Images are required'),
      eventDate: Yup.date().required('Date is required'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        console.log(values);
        // await dispatch(CreateEventAsync());
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
      <form noValidate onSubmit={formik.handleSubmit}>
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
                  <Typography variant='h4'>Create an Event</Typography>
                </div>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 3,
                }}
              >
                <TextField
                  fullWidth
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  label='Name of the event'
                  margin='normal'
                  name='name'
                  type='text'
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />

                <TextField
                  fullWidth
                  error={Boolean(formik.touched.category && formik.errors.category)}
                  helperText={formik.touched.category && formik.errors.category}
                  label='Category of the event'
                  margin='normal'
                  name='category'
                  type='text'
                  value={formik.values.category}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {/* <MobileDatePicker label='Start Date' renderInput={<TextField />} /> */}
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker renderInput={(params: any) => <TextField {...params} />} />
                </LocalizationProvider> */}

                <TextField
                  fullWidth
                  error={Boolean(formik.touched.desc && formik.errors.desc)}
                  helperText={formik.touched.desc && formik.errors.desc}
                  margin='normal'
                  label='Write short description'
                  name='desc'
                  type='text'
                  multiline
                  rows={6}
                  value={formik.values.desc}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />

                <Box my={[1, 2]}>
                  <Typography mb={[1]}>Select images for the event</Typography>
                  <input
                    // error={Boolean(formik.touched.images && formik.errors.images)}
                    // helperText={formik.touched.images && formik.errors.images}
                    name='images'
                    type='file'
                    accept='image/png, image/gif, image/jpeg'
                    multiple={true}
                    value={formik.values.images}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Button fullWidth size='large' type='submit' variant='contained'>
                    Create
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </form>
    </Box>
  );
};

export default CreateEvent;
