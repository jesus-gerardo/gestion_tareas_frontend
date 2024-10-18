import axios from 'axios';

const config = useRuntimeConfig();

const instanceAxios = axios.create({
    baseURL: config.public.apiBaseUrl
});

export {instanceAxios};