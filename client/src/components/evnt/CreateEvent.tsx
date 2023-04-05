import { ChangeEvent, FC, useState } from 'react';
import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { CreateEventAsync, getClub, OrganizerLoginAsync } from '../auth/organizerAuthSlice';
import store from '../../app/state';
import { AppDispatch } from '../../app/type';
import { DatePicker } from 'react-responsive-datepicker';
import 'react-responsive-datepicker/dist/index.css';
import { storage } from '../../firebase';
// import { DateTimePicker } from '@mui/x-date-pickers';

export function formatDate(date: Date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

export const CreateEvent: React.FC<{}> = (props) => {
  const clubData = getClub(store.getState());

  const dispatch = useDispatch<AppDispatch>();
  //things to upload images of the event
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    console.log(files);
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const newImage = files[i];
        setImages((prevState) => [...prevState, newImage]);
      }
    }
  };

  const handleImageUpload = () => {
    if (!images) return;

    const promises: any[] = [];

    images.map((image: File) => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      promises.push(uploadTask);
      uploadTask.on(
        'state_changed',
        (snapshot: any) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(progress);
        },
        (error: any) => {
          console.log(error);
        },
        async () => {
          await storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then((urls) => {
              setImageUrls((prevState) => [...prevState, urls]);
              console.log('urls', imageUrls);
            });
        }
      );
    });

    Promise.all(promises)
      .then(() => alert('All images uploaded'))
      .catch((err) => console.log(err));
  };

  //event date handling
  const [eventDate, setEventDate] = useState<Date>(new Date());

  //error message
  const [errMsg, setErrMsg] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      desc: '',
      clubName: clubData.name,
      clubId: clubData.clubId,
      registeredMembers: [],
      eventDate: eventDate,
      images: imageUrls,
      category: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required('Event name is required'),
      desc: Yup.string().min(200).max(2000).required('Event short description is required'),
      category: Yup.string().max(50).required('Event category is required'),
      // images: Yup.object().required('Images are required'),
      // eventDate: Yup.date().required('Date is required'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        values.eventDate = eventDate;
        values.images = imageUrls;
        if (values.images.length === 0) {
          setErrMsg('Please select images for the event');
        } else {
          console.log(values);
          await dispatch(CreateEventAsync(values));
        }
      } catch (err: any) {
        console.log(err);
      }
    },
  });

  const [isOpen, setIsOpen] = useState(false);

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

                <Box
                  display='flex'
                  justifyContent='space-between'
                  margin='normal'
                  alignItems='center'
                  zIndex={10}
                  sx={{ position: 'relative' }}
                >
                  <Button
                    onClick={() => {
                      setIsOpen(true);
                    }}
                    variant='contained'
                  >
                    Select Event Date
                  </Button>
                  <Box>
                    <DatePicker
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                      minDate={new Date(2022, 10, 10)}
                      maxDate={new Date(2050, 0, 10)}
                      headerFormat='DD, MM dd'
                      onChange={(date: Date | null) => {
                        setEventDate(date ?? new Date());
                      }}
                      showTitle={false}
                    />
                  </Box>
                  <Typography variant='subtitle2' fontWeight='bold' fontSize={20}>
                    {formatDate(eventDate)}
                  </Typography>
                </Box>

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
                  <Box display='flex' flexWrap='wrap' justifyContent='space-between'>
                    <input
                      // error={Boolean(formik.touched.images && formik.errors.images)}
                      // helperText={formik.touched.images && formik.errors.images}
                      name='images'
                      type='file'
                      accept='image/png, image/gif, image/jpeg'
                      multiple={true}
                      onBlur={formik.handleBlur}
                      onChange={handleImageChange}
                    />
                    <progress value={progress} max='100' />
                    <Button size='small' variant='contained' onClick={handleImageUpload}>
                      Upload
                    </Button>
                  </Box>
                </Box>
                <Box margin='normal'>
                  <Typography variant='subtitle2' color='error'>
                    {errMsg}
                  </Typography>
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
