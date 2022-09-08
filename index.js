import express from "express";
import routerArtist from "./router/artist.js";
import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.use(helmet());
app.use(cors());

app.set('port', (process.env.PORT || 5000));

// ROUTES
app.use('/api/artist', routerArtist);

app.get('/', (req, res) => {
  res.send('Hello World!')
})





app.listen(app.get('port'), () => {
  console.log(`Api listening at http://localhost:${app.get('port')}`)
})
