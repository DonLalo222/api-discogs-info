import express from "express";
import { getProfile } from "../scrapper/discogs.js";

var routerArtist = express.Router();

routerArtist.get('/profile', async (req, res) => {

  let images = { msg: 'no data'};
  const isEmpty = Object.keys(req.query).length === 0;
  
  if(!isEmpty){
    images = await getProfile(req.query.url);
  }
    
    res.send( images);
  })

export default routerArtist;