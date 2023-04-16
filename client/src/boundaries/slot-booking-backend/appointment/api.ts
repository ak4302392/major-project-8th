import axios from "axios";
import { GetAvailabilityForDateRequest, GetAvailabilityForDateResponse } from "./model";

const CLIENT_SERVICE_URL = `${ process.env.REACT_APP_BACKEND_URL }`;

class SlotBookingServiceAppointmentApi {
  async getAvailabilityForDate(
    payload: GetAvailabilityForDateRequest
  ): Promise<GetAvailabilityForDateResponse> {
    return await axios.post(`${CLIENT_SERVICE_URL}/api/v1/appointment/availability`, payload, {
      headers: {
        Authorization: `Bearer ${payload.token}`,
      },
    });
  }
}

export const slotBookServiceAppointmentApi = new SlotBookingServiceAppointmentApi();
