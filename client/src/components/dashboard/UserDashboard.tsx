import { Box } from '@mui/material';
import React from 'react';
import EventBox, { eventBoxprops } from '../utils/event-box/EventBox';
import EventOverview, { overviewBoxProps } from '../utils/event-overview/EventOverview';

const events: eventBoxprops = {
  heading: 'registered events',
  links: [
    {
      title: 'Event name Pseudo testing 1',
      href: '',
    },
    {
      title: 'Event name Pseudo testing 2',
      href: '',
    },
    {
      title: 'Event name Pseudo testing 3',
      href: '',
    },
    {
      title: 'Event name Pseudo testing 4',
      href: '',
    },
    {
      title: 'Event name Pseudo testing 5',
      href: '',
    },
  ],
};

const eventOverview: overviewBoxProps = {
  title: 'event name',
  eventLink:"/events/event",
  images: [''],
  content:
    "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum. lorem ipsum's",
  button: {
    name: 'De-Register',
    href: '',
  },
};

export const UserDashboard = () => {
  return (
    <Box mx={[1, 3, 5, 10]} mt={[3, 4, 7]}>
      <Box display='flex'>
        <EventBox {...events} />
        <EventOverview {...eventOverview} />
      </Box>
    </Box>
  );
};
