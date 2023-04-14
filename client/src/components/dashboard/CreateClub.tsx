import { ChangeEvent, FC, useState } from 'react';
import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createClubAsync } from '../auth/organizerAuthSlice';
import { AppDispatch } from '../../app/type';
import 'react-responsive-datepicker/dist/index.css';
import { storage } from '../../firebase';
import { createClubDataType } from '../../boundaries/club-backend/model';

export const CreateClub = () => {
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

  //error message
  const [errMsg, setErrMsg] = useState('');

  const formik = useFormik({
    initialValues: {
      clubId: '',
      name: '',
      desc: '',
      images: imageUrls,
      industryType: '',
      organizerId: '',
      organizerPassword: '',
      cordinatorId: '',
      cordPassword: '',
      upcomingEvents: [],
      cordinatorName: '',
      memorires: [],
    },
    validationSchema: Yup.object({
      clubId: Yup.string().max(255).required('Club Id is required'),
      name: Yup.string().max(255).required('Club Name is required'),
      desc: Yup.string().min(200).max(2000).required('Event short description is required'),
      organizerId: Yup.string().required('Organizer id is required'),
      organizerPassword: Yup.string().required('Organizer password is required'),
      cordinatorId: Yup.string().required('Cordinator id is required'),
      cordPassword: Yup.string().required('Cordinator password is required'),
      cordinatorName: Yup.string().required('Organizer password is required'),
      // images: Yup.object().required('Images are required'),
      // eventDate: Yup.date().required('Date is required'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      console.log(values);
      try {
        values.images = imageUrls;
        if (values.images.length === 0) {
          setErrMsg('Please select images for the event');
        } else {
          console.log(values);

          const payload: createClubDataType = {
            clubId: values.clubId,
            name: values.name,
            desc: values.desc,
            images: values.images,
            industryType: values.industryType,
            accounts: {
              orgAccount: {
                id: values.organizerId,
                password: values.organizerPassword,
              },
              corAccount: {
                id: values.cordinatorId,
                password: values.cordPassword,
              },
            },
            upcomingEvents: values.upcomingEvents,
            memories: values.memorires,
            cordinatorName: values.cordinatorName,
          };
          await dispatch(createClubAsync(payload));
          helpers.resetForm();
          setImages([]);
        }
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
                  <Typography variant='h4'>Create a Club</Typography>
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
                  error={Boolean(formik.touched.clubId && formik.errors.clubId)}
                  helperText={formik.touched.clubId && formik.errors.clubId}
                  label='Id of the club'
                  margin='normal'
                  name='clubId'
                  type='text'
                  value={formik.values.clubId}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />

                <TextField
                  fullWidth
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  label='Name of the club'
                  margin='normal'
                  name='name'
                  type='text'
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />

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

                <TextField
                  fullWidth
                  error={Boolean(formik.touched.industryType && formik.errors.industryType)}
                  helperText={formik.touched.industryType && formik.errors.industryType}
                  margin='normal'
                  label='The industry type'
                  name='industryType'
                  type='text'
                  multiline
                  value={formik.values.industryType}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />

                <TextField
                  fullWidth
                  error={Boolean(formik.touched.organizerId && formik.errors.organizerId)}
                  helperText={formik.touched.organizerId && formik.errors.organizerId}
                  margin='normal'
                  label='Organizer Id'
                  name='organizerId'
                  type='text'
                  multiline
                  value={formik.values.organizerId}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />

                <TextField
                  fullWidth
                  error={Boolean(
                    formik.touched.organizerPassword && formik.errors.organizerPassword
                  )}
                  helperText={formik.touched.organizerPassword && formik.errors.organizerPassword}
                  margin='normal'
                  label='Organizer Password'
                  name='organizerPassword'
                  type='text'
                  multiline
                  value={formik.values.organizerPassword}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />

                <TextField
                  fullWidth
                  error={Boolean(formik.touched.cordinatorId && formik.errors.cordinatorId)}
                  helperText={formik.touched.cordinatorId && formik.errors.cordinatorId}
                  margin='normal'
                  label='Cordinator Id'
                  name='cordinatorId'
                  type='text'
                  multiline
                  value={formik.values.cordinatorId}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />

                <TextField
                  fullWidth
                  error={Boolean(formik.touched.cordPassword && formik.errors.cordPassword)}
                  helperText={formik.touched.cordPassword && formik.errors.cordPassword}
                  margin='normal'
                  label='Cordinator Password'
                  name='cordPassword'
                  type='text'
                  multiline
                  value={formik.values.cordPassword}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />

                <TextField
                  fullWidth
                  error={Boolean(formik.touched.cordinatorName && formik.errors.cordinatorName)}
                  helperText={formik.touched.cordinatorName && formik.errors.cordinatorName}
                  margin='normal'
                  label='Cordinator Name'
                  name='cordinatorName'
                  type='text'
                  multiline
                  value={formik.values.cordinatorName}
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
