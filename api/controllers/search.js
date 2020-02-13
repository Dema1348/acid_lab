const axios = require('axios');
const config = require('../config');
const clientRedis = require('../redis-client');

const getSeason = (lat) => {
    const month = new Date().getMonth();
    if (month > 2 && month < 9) {
        season = lat > 0 ? 'summer' : 'winter';
    } else {
        season = lat > 0 ? 'winter' : 'summer';
    }
    return season;

}


const getCountry = async (lat, lng) => {
    const geocodeConfig = {
        timeout: 30000,
        baseURL: 'https://maps.googleapis.com/maps/api/geocode',
    };

    const request = axios.create(geocodeConfig);
    const url = `/json?latlng=${lat},${lng}&key=${config.API_KEY_GOOGLE}`;
    try{
        const { data } = await request.get(url);
        const country = data.results[0]?data.results[0].address_components.pop().long_name: '';
        const code = data.results[0]? data.results[0].address_components.pop().long_name: '';
        const city =  data.results[0]?data.results[0].address_components.pop().long_name: '';
        return { country, city, code }
    }catch(error){
        return { country:null, city:null, code:null }
    }
   
    

}


const getSearch = async (req, res) => {

    const lat = req.query.lat;
    const lng = req.query.lng;
    const exclude = 'minutely,hourly,flags,daily';
    const urlApi = `https://api.darksky.net/forecast/${config.API_KEY}/${lat},${lng}?exclude=${exclude}&units=si`;

    try {

        let { data } = await axios.get(urlApi);
        if (Math.random() < 0.1) {
            throw new Error('RandomError');
        }
        console.log("Get data from google")
        let contryInfo = await getCountry(lat, lng);

        let response = {
            "error": false,
            "statusCode": 200,
            "message": "Successfully",
            "data": {
                temperature: data.currently.temperature,
                icon: data.currently.icon,
                summary: data.currently.summary,
                units: 'c',
                season: getSeason(lat),
                country: contryInfo.country,
                code: contryInfo.code,
                city: contryInfo.city,
            }
        }
        clientRedis.set(`${lat},${lng}`, JSON.stringify(response.data));
        res.status(response.statusCode).send(response);

    } catch (error) {
        console.error(error);
        if (error.message === 'RandomError') {
            return getSearch(req, res);
        } else {
            let response = {
                "error": true,
                "statusCode": 500,
                "message": 'Server Error'
            }
            res.status(response.statusCode).send(response);

        }


    }

}


module.exports = {
    getSearch
}