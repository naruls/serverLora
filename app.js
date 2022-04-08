import express from 'express';
import pg from 'pg';
import fetch from 'node-fetch';
import cors from 'cors';
import momentZone from 'moment-timezone';


const app = express();

const options = {
  origin: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Accept'],
  credentials: true,
};

const client = new pg.Client({
    user: 'postgres',
    host: '172.16.117.193',
    database: 'Wether_test',
    password: '1234',
    port: 5432,
});

client.connect();

app.use(cors(options));

app.use(express.json());

const { PORT = 3000 } = process.env;

const cordHibin = {
  lat: 67.670036,
  lon: 33.687525,
};



app.post('/gettingData', (request, response) => {
  let endStringJson = request.body.data.split('&');
  let currentTime = momentZone().tz("Europe/Moscow").format();
  const query = `
    INSERT INTO in_loradata (snowheight, temperature1layer, temperature2layer, temperatureair, uf, time)
    VALUES ($1, $2, $3, $4, $5, $6) returning *
    `;
  client.query(query, [endStringJson[1], endStringJson[2], endStringJson[3], endStringJson[4], (endStringJson[5]), currentTime], (err, res) => {
    if (err) {
       console.error(err);
        return;
        }
    console.log('Data insert successful');
    });

  response.send(endStringJson);
});



app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
