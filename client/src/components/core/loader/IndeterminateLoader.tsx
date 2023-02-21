/* eslint-disable jsx-a11y/alt-text */
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import { isLoading } from '../coreSlice';

export default function IndeterminateLoader() {
  const isLoadingConst = useSelector(isLoading);

  if (isLoadingConst) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoadingConst}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    );
  }

  return <></>;
}
