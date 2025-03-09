import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('jwtToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            sessionStorage.clear('jwtToken')
            window.location.href('/')
            console.log('Unauthorized access! Please log in again.');
        }
        return Promise.reject(error);
    }
);

export async function get(url, data, config = {}) {
    return await axiosInstance
        .get(url, { ...data }, { ...config })
        .then((response) => response.data)
        .catch((err) => {
            if (err.response) {
                if (err.response.status === 500) {
                    return { status: false, message: 'Server error, please try again later.' };
                } else {
                    return err.response.data;
                }
            } else {
                return { status: false, message: 'Network error, please check your internet connection.' };
            }
        });
}

export async function post(url, data, config = {}) {
    return axiosInstance
        .post(url, { ...data }, { ...config })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            if (err.response) {
                if (err.response.status === 500) {
                    return { status: false, message: 'Server error, please try again later.' };
                } else {
                    return err.response.data;
                }
            } else {
                return { status: false, message: 'Network error, please check your internet connection.' };
            }
        });
}
