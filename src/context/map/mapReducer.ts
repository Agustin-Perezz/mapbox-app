/* eslint import/no-webpack-loader-syntax: off */
import { MapState } from './MapProvider';

// @ts-ignore
import { Map, Marker } from '!mapbox-gl';

type MapActions = 
| { type: 'setMap', payload: Map }
| { type: 'setMarker', payload: Marker[] }
| { type: 'setStats', payload: [ number, number, number ] }

export const mapReducer = ( state: MapState, action: MapActions ): MapState => {
  switch ( action.type ) {
     
    case 'setMap':
      return {
        ...state,
        isReadyMap: true,
        map: action.payload
      }

    case 'setMarker':
      return {
         ...state,
         markers: action.payload
      }

    case 'setStats':
      return {
        ...state,
        stats: action.payload
      }
  
    default:
      return state;
  }
}