import { IActivity } from './../models/activity';
import axios, { AxiosResponse } from 'axios';

// File for defining api calls


// set baseURL
axios.defaults.baseURL = 'http://localhost:5000/api';

// Store request in a constant
const responseBody = (response: AxiosResponse) => response.data;

// create an object of common reusable requests
const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody)
};

// Activities object for our activies requests
const Activities = {
    list: (): Promise<IActivity[]> => requests.get('/activities'),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post('/activities', activity),
    update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del(`/activities/${id}`)
};

export default { Activities }