const BASE_URL = process.env.NEXT_PUBLIC_THRIV_API;

type RequestHeaders = {
    [key: string]: string;
};

type RequestOptions = {
    method: "GET" | "POST" | "PUT" | "DELETE";
    headers?: RequestHeaders;
    body?: any;
};

const get = async (endpoint: string, headers?: RequestHeaders) => {
    return fetch(`${BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
    });
};

const post = async (endpoint: string, data: any, headers?: RequestHeaders) => {
    return fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: JSON.stringify(data),
    });
};

const put = async (endpoint: string, data: any, headers?: RequestHeaders) => {
    return fetch(`${BASE_URL}${endpoint}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: JSON.stringify(data),
    });
};

const deleteRequest = async (endpoint: string, headers?: RequestHeaders) => {
    return fetch(`${BASE_URL}${endpoint}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
    });
};

export { get, post, put, deleteRequest };
