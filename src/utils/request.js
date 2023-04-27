import axios from 'axios';

//cấu hình đầu api
const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});

export const get = async (path, option = {}) => {
    //tạo biến response = đợi request.get(path, option) thực hiện sau đó trả về response.data
    const response = await request.get(path, option);
    return response.data;
};

export default request;
