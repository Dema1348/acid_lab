const axios = require('axios');

const getForecast = async (lat, lng) => {
    const apiConfig = {
        timeout: 30000,
        baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://ec2-3-134-252-84.us-east-2.compute.amazonaws.com',
        rejectUnauthorized: false,
        strictSSL: false,

    };

    const request = axios.create(apiConfig);
    const { data } = await request.get(`/api/search?lat=${lat}&lng=${lng}`);
    return data;
}

export default getForecast;