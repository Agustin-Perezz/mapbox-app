
import axios from 'axios';

const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: '5',
    lenguage: 'es',
    access_token: 'pk.eyJ1IjoiZGV2LWFndXN0aW4iLCJhIjoiY2wwMDM2YmFoMDc3MTNqbzl4b2JzbW55YSJ9.N1m6qjNtkPRY2R8nw4Tlbw',
  }

})

export default searchApi;