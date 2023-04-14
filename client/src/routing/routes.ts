export enum AppRoutes {
  LOGIN = '/auth/log-in',
  ORGANIGER_LOGIN = '/auth/organizer-log-in',
  LOGOUT = '/logout',
  SIGNUP = '/auth/sign-up',
  DEFAULT = '/',
  OTP_VERIFICATION = '/auth/sign-up/otp-verification',

  EVENT = '/evnts/event',
  EVENTS = '/evnts',
  EVENT_DETAILS = '/events/event-details',

  //user routes
  USER_DASHBOARD = '/user/dashboard',
  USER_ALL_EVENTS = '/user/all-events',
  USER_EVENT_DETAILS = '/user/event-details',

  //organizer routes
  ORGANIZER_DASHBOARD = '/organizer/dashboard',
  CLUB_DETAILS = '/club',
  CLUB_EVENT_DETAILS = '/club/event-details',
  CREATE_EVENT = '/evnts/event/create',
  UPDATE_EVENT = '/evnts/event/update',
  ALL_EVENTS = '/events/all-events',
  CLUB_ALL_EVENTS = '/club/all-events',
  CREATE_CLUB = '/club/create',

  //general common routes
  COMMONN_CLUB_DETAILS = '/common/club/details',

  ABOUT = '/about',
  TESTIMONIALS = '/testimonial',
  CONTACT_US = '/contact',
}
