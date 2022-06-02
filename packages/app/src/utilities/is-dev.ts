import { Environments } from '../interfaces';
const env = process.env.NODE_ENV;
function determineDev() {
  switch (env) {
  case Environments.PRODUCTION:
  case Environments.STAGE:
  case Environments.TEST:
    return false;

  default:
    return true;
  }
}
export const isDev = determineDev();
