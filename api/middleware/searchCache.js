const clientRedis = require('../redis-client');

const getSearch = async (req, res, next) => {
    const lat = req.query.lat;
    const lng = req.query.lng;
    try {
        const result = await clientRedis.get(`${lat},${lng}`);

        console.log(result)
        if (!result) {
            next();
        } else {
            let response = {
                "error": false,
                "statusCode": 200,
                "message": "Successfully",
                "data": JSON.parse(result)
            }
            res.status(response.statusCode).send(response);

        }
    } catch (error) {
        console.log(error);
        next();
    }

}

module.exports = {
    getSearch
}