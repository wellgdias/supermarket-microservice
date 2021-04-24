interface CustomHeaders {
  'user-agent'?: string;
  referer?: string;
  'x-ip': string;
  'x-malware': boolean;
  'x-root': boolean;
  'x-behavioral-biometrics': string;
  'x-geolocation': string;
  'x-customer-token': string;
  'x-device-id': string;
  'x-request-id'?: string;
}

declare module 'http' {
  interface IncomingHttpHeaders extends CustomHeaders {}
}
