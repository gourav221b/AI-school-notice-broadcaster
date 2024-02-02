import {CallsApi} from '@dynopii/callchimp'
import { callchimpConfig } from './callchimp';
export const callsConfig = new CallsApi(callchimpConfig);