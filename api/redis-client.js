const redis = require('redis');
const client = redis.createClient({host: 'redis'});
const util = require('util');
client.get = util.promisify(client.get);

client.on('connect', function() {
    console.log('Redis Database connected');
});

client.on('reconnecting', function() {
    console.log('Redis client reconnecting');
});

client.on('ready', function() {
    console.log('Redis client is ready');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

client.on('end', function() {
    console.log('\nRedis client disconnected');
    console.log('Server is going down now...');
  
});

const set = (key, value) => {
    client.set(key, value, redis.print);
    return true;
}
const get = (key) => {
    console.log("Get data form cache ",key)
    return client.get(key)
}

module.exports = {
    set,
    get
}