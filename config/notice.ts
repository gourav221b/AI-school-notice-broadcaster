import {CampaignsApi} from '@dynopii/callchimp'
import { callchimpConfig } from './callchimp';
export const noticeConfig = new CampaignsApi(callchimpConfig);