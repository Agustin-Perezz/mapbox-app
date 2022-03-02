import axios from 'axios';

const directionsApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: false,
    geometries: 'geojson', 
    overview: 'simplified',
    steps: false,
    access_token: 'pk.eyJ1IjoiZGV2LWFndXN0aW4iLCJhIjoiY2wwMDM2YmFoMDc3MTNqbzl4b2JzbW55YSJ9.N1m6qjNtkPRY2R8nw4Tlbw',
  }

})

export default directionsApi;