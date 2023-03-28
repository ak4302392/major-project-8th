import { useLocation } from 'react-router';
import { GetEventPayload } from '../../../boundaries/event-backend/model';

export const EventDetails = () => {
  const location = useLocation();
  const { event } = location.state;
  console.log(event);
  return <h1>Hello world</h1>;
};
