import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getToken = () => localStorage.getItem("token");
export const getUser = () => JSON.parse(localStorage.getItem("user"));
export const isAdmin = () => {
    const user = getUser();
    return user && (user.isAdmin === 1 || user.isAdmin === "1");
};

api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.clear();
                window.location.href = "/";
            } else if (error.response.status === 403) {
                alert("Nincs jogosultságod ehhez a művelethez!");
            }
        }
        return Promise.reject(error);
    }
);

export default api;