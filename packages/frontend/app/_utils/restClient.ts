// utils/restClient.ts

const BASE_URL = process.env.NEXT_PUBLIC_THRIV_API;

type RequestHeaders = {
    [key: string]: string;
};

const defaultHeaders: RequestHeaders = {
    "Content-Type": "application/json",
};

const get = async (endpoint: string, headers: RequestHeaders = defaultHeaders) => {
    return fetch(`${BASE_URL}${endpoint}`, {
        method: "GET",
        headers,
        credentials: 'include',  // Include credentials by default
    });
};

const post = async (endpoint: string, data: any, headers: RequestHeaders = defaultHeaders) => {
    return fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers,
        credentials: 'include',  // Include credentials by default
        body: JSON.stringify(data),
    });
};

const put = async (endpoint: string, data: any, headers: RequestHeaders = defaultHeaders) => {
    return fetch(`${BASE_URL}${endpoint}`, {
        method: "PUT",
        headers,
        credentials: 'include',  // Include credentials by default
        body: JSON.stringify(data),
    });
};

const deleteRequest = async (endpoint: string, headers: RequestHeaders = defaultHeaders) => {
    return fetch(`${BASE_URL}${endpoint}`, {
        method: "DELETE",
        headers,
        credentials: 'include',  // Include credentials by default
    });
};

export { get, post, put, deleteRequest };
