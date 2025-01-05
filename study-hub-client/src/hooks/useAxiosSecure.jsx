import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: 'https://study-hub-server-dusky.vercel.app',
    withCredentials: true
});

const useAxiosSecure = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response
        }, error => {
            return Promise.reject(error);
            logout();
            navigate('/login')
        })
    }, [])
    return axiosInstance;
};

export default useAxiosSecure;