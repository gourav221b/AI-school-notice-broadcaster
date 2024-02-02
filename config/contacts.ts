import {ListsApi, SubscribersApi} from '@dynopii/callchimp'
import { callchimpConfig } from './callchimp';
export const contactsConfig = new ListsApi(callchimpConfig);
export const contactConfig= new SubscribersApi(callchimpConfig)