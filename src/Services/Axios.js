import axiosFromLibrary from 'axios';

const axios = axiosFromLibrary.create({
    baseURL: "https://moe-gifts-api.herokuapp.com",
    timeout: 20000
})

export default axios;