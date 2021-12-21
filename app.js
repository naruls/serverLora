import express from 'express';
import pg from 'pg';
import fetch from 'node-fetch';
import cors from 'cors';
import fs from 'fs';


const app = express();

const options = {
  origin: [
    'http://localhost:3000',
    'http://localhost',
    'localhost',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Accept'],
  credentials: true,
};
/*
const client = new pg.Client({
    user: 'postgres',
    host: '172.16.117.193',
    database: 'Wether_test',
    password: '1234',
    port: 5432,
});

client.connect();
*/
app.use(cors(options));

app.use(express.json());

const { PORT = 3004 } = process.env;

const cordHibin = {
  lat: 67.670036,
  lon: 33.687525,
};



app.post('/gettingData', (request, response) => {
  fs.writeFile('gettingData.txt', JSON.stringify(request.body), (err) => {
      if(err) throw err;
      console.log('Data has been replaced!');
  });
  response.send(request.body);
});



app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
