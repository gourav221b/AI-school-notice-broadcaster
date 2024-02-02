import { Configuration } from '@dynopii/callchimp';

export const callchimpConfig = new Configuration({
    basePath: process.env.API_URL,
    apiKey: process.env.API_KEY
});