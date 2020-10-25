import { IActivity } from './../models/activity';
import { IFood } from '../models/food';
import axios, { AxiosResponse } from 'axios';
import { request } from 'http';

// File for defining api calls


// set baseURL
axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(undefined, error => {
    
})

// Store request in a constant
const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

// create an object of common reusable requests
const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody)
};

// Activities object for activities requests
const Activities = {
    list: (): Promise<IActivity[]> => requests.get('/activities'),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post('/activities', activity),
    update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del(`/activities/${id}`)
};

// Foods object for foods requests
const Foods = {
    list: (): Promise<IFood[]> => requests.get('foods'),
    details: (id: string) => requests.get(`/foods/${id}`),
    create: (food: IFood) => requests.post('/foods', food),
    update: (food: IFood) => requests.put(`/foods/${food.id}`, food),
    delete: (id: string) => requests.del(`/foods/${id}`)

}


// eslint-disable-next-line import/no-anonymous-default-export
export default { Activities, Foods }