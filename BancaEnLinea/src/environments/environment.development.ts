import { environment } from './environment';

export const environmentDevelopment = {
  ...environment,
  production: false,
  debug: true
};
