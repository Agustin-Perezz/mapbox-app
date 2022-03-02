/* eslint import/no-webpack-loader-syntax: off */
import { useReducer, useContext, useEffect } from 'react';

// @ts-ignore
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from '!mapbox-gl';
import { mapReducer } from './mapReducer';
import { MapContext } from './MapContext';
import { PlacesContext } from '..';
import { directionsApi } from '../../apis';

export interface MapState {
  isReadyMap: boolean;
  map?: Map;
  markers: Marker[];
  stats?: [ number, number, number ];
}

const INITIAL_STATE: MapState = {
  isReadyMap: false,
  map: undefined,
  markers: [],
  stats: undefined, 
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props ) => {

  const { places } = useContext( PlacesContext );

  useEffect(() => {
    state.markers.forEach( marker => marker.remove() );
    const newMarkers : Marker[] = [];

    for ( const place of places ) {
      const [ lng, lat ] = place.center;
      const popup = new Popup()
            .setHTML(`
              <h6> ${ place.text } </h6>
              <p> ${ place.place_name } </p>
            `)

      const newMarker = new Marker()
            .setPopup( popup )
            .setLngLat([ lng, lat ])
            .addTo( state.map! )

      newMarkers.push( newMarker );
      
    }

    dispatch({ type: 'setMarker', payload: newMarkers });

    if ( state.map?.getLayer('RouteString') ) {
      state.map.removeLayer('RouteString');
      state.map.removeSource('RouteString');
      state.stats = undefined;
    }

  }, [ places ])
  

  const [state, dispatch] = useReducer( mapReducer, INITIAL_STATE );

  const setMap = ( map: Map ) => {

    const myLocationPopup = new Popup()
      .setHTML(`
        <h4> Aqui estoy </h4>
        <p> En algun lugar del mundo </p>
      `)

    new Marker({ color: 'red' })
        .setLngLat( map.getCenter() )
        .setPopup( myLocationPopup )
        .addTo( map )

    dispatch({ type: 'setMap', payload: map })

  }
  
  const getRouteBetweenPoints = async( start: [number, number], end: [number, number] ) => { 

    const resp = await directionsApi.get(` ${start.join(',')};${end.join(',')} `);
    const { distance, duration, geometry } = resp.data.routes[0];
    const { coordinates: coords } = geometry;
    
    let kms = distance / 1000;
        kms = Math.round( kms * 100 );
        kms /= 100;

    const horas = Math.round( duration / 3600 );
    const minutes = Math.round( (duration % 3600) / 60 );

    dispatch({ type: 'setStats', payload: [ kms, horas, minutes ]});

    const bounds = new LngLatBounds( 
      start,
      start
    );

    for (const coord of coords ) {
      const newCord: [ number, number ] = [ coord[0], coord[1] ];
      bounds.extend( newCord );
    }

    state.map?.fitBounds( bounds, {
      padding: 200
    })

    // Polyline
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }
    
    if ( state.map?.getLayer('RouteString') ) {
      state.map.removeLayer('RouteString');
      state.map.removeSource('RouteString');
    }
    
    state.map?.addSource( 'RouteString', sourceData );

    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
         'line-join': 'round'
      },
      paint: {
        'line-color': 'black',
        'line-width': 3
      }
    })
    
  }
  
  return (
    <MapContext.Provider value={{
      ...state,

      // Methods
      setMap,
      getRouteBetweenPoints
    }}>
      { children }
    </MapContext.Provider>
  )
}
