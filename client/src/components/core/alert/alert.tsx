/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { getMessage, getStatus, reset } from '../coreSlice';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
));

export default function CustomizedSnackbars() {
  const dispatch = useDispatch();

  const status = useSelector(getStatus);
  const message = useSelector(getMessage);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(reset());
  };

  if (!(status && message && message !== '')) {
    return <></>;
  }

  if (status === 'failure') {
    return (
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open onClose={handleClose}>
          <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    );
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
