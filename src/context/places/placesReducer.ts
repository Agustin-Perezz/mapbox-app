import { PlacesState } from './PlacesProvider';
import { Feature } from '../../interfaces/places';

type PlaceActions = 
| { type: 'setUserLocation', payload: [ number, number ]; }
| { type: 'setPlaces', payload: Feature[]; }
| { type: 'isLoadingPlaces' }
| { type: 'setModal', payload: boolean; }

export const placesReducer = ( state: PlacesState, action: PlaceActions ): PlacesState => {

  switch ( action.type ) {

    case 'setUserLocation':
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload
      }

    case 'isLoadingPlaces':
      return {
        ...state,
        isLoadingPlaces: false,
        places: []
      }

    case 'setPlaces':
      return {
        ...state,
        places: action.payload
      }

    case 'setModal':
      return { 
        ...state,
        showModal: action.payload
      }
  
    default:
      return state;
  }
  
}