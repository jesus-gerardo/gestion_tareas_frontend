import axios from 'axios';

const config = useRuntimeConfig();

const instanceAxios = axios.create({
    baseURL: config.public.apiBaseUrl,
});

// Interceptor de respuesta (response)
instanceAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            const router = useRouter();  // Asumiendo que estás usando Vue Router
            router.push('/login');  // Redirigir al login
            console.error('El token ha expirado o no es válido. Redirigiendo al login...');
        }
        return Promise.reject(error);
    }
);

export { instanceAxios };