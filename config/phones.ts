import {PhoneNumbersApi} from '@dynopii/callchimp'
import { callchimpConfig } from './callchimp';
export const phoneNumbersConfig = new PhoneNumbersApi(callchimpConfig);