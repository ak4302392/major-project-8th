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
// import { DateTimePicker } from '@mui/x-date-pickers';

export const CreateEvent: FC = (props) => {
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  return (
    <Box
      sx={{
        minHeight: '100%',
        p: 3,
      }}
      mt={[2, 3, 7]}
    >
      <form>
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
                <TextField fullWidth label='Name' margin='normal' name='name' type='text' />
                <TextField
                  fullWidth
                  label='Associated'
                  margin='normal'
                  name='password'
                  type='password'
                />

                {/* <Box sx={{ mt: 2 }}>
                  <DateTimePicker
                    onChange={(newDate: Date) => setEndDate(newDate)}
                    label='End date'
                    renderInput={(inputProps: any) => <TextField fullWidth {...inputProps} />}
                    value={endDate}
                  />
                </Box> */}

                <Box sx={{ mt: 2 }}>
                  <Typography color='error' variant='subtitle2'>
                    {/* {error} */}
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
