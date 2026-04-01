const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
    url: 'redis://redis:6379'
});

client.on('error', err => console.log('Redis Client Error', err));

app.get('/', async (req, res) => {
    await client.connect();
    const visits = await client.get('visits');
    const newVisits = parseInt(visits || 0) + 1;
    await client.set('visits', newVisits);
    res.send(`Số lượt truy cập là: ${newVisits}`);
    await client.disconnect();
});

app.listen(3000, () => {
    console.log('Server chạy tại port 3000');
});