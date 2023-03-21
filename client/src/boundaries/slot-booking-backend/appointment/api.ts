import axios from "axios";
import { GetAvailabilityForDateRequest, GetAvailabilityForDateResponse } from "./model";

const CLIENT_SERVICE_URL = "http://localhost:4001";

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
