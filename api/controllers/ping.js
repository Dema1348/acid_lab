
const ping = (req, res) => {
    let respuesta = {
        "error": false,
        "status": 200,
        "message": 'pong'
    }

    res.status(200).send(respuesta)
}

module.exports = {
    ping
}