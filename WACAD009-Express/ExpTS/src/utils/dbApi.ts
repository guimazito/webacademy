import axios from "axios";

export async function get(endpoint: string) {
    try {
        const response = await axios.get(`${process.env.DB_URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${process.env.DB_URL}/${endpoint}:`, error);
        throw error;
    }
}

export async function post(endpoint: string, data: any) {
    try {
        const response = await axios.post(`${process.env.DB_URL}/${endpoint}`, data);
        console.log('dbapi', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error posting data to ${process.env.DB_URL}/${endpoint}:`, error);
        throw error;
    }
}

export default {
    get,
    post
};