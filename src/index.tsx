/* eslint import/no-webpack-loader-syntax: off */

import React from 'react';
import ReactDOM from 'react-dom';
import { MapsApp } from './MapsApp';

// @ts-ignore
import mapboxgl from '!mapbox-gl';
 
mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2LWFndXN0aW4iLCJhIjoiY2wwMDM2YmFoMDc3MTNqbzl4b2JzbW55YSJ9.N1m6qjNtkPRY2R8nw4Tlbw';

 if ( !navigator.geolocation ) {
    alert('Tu navegador no tiene Geolocation');
    throw new Error('Tu navegador no tiene Geolocation');
 }

ReactDOM.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>,
  document.getElementById('root')
);

