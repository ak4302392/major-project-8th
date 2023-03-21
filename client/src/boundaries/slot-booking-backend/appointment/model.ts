export interface GetAvailabilityForDateRequest {
  dateAsNumber: number;
  token: string;
}

export interface GetAvailabilityForDateResponse {
  status: string;
  message: string;
  data: {
    slots: {
      startTime: number;
      endTime: number;
    }[];
    startTimeOffset: number;
  };
}
