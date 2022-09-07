import { useContext, useState } from 'react';
import { LoadingPlaces } from '.';
import { MapContext, PlacesContext } from '../context';
import { Feature } from '../interfaces/places';

export const SearchResults = () => {

  const { places, isLoadingPlaces, userLocation, showModal, setModal } = useContext( PlacesContext );
  const { map, getRouteBetweenPoints } = useContext( MapContext );

  const [activeId, setActiveId] = useState('');

  if ( isLoadingPlaces ) {
    return <LoadingPlaces />;
  }
  
  if ( places.length === 0 ) {
    return <></>;
  }

  const onPlaceClicked = ( place: Feature ) => {
    setActiveId( place.id );
    const [ lng, lat ] = place.center;
    map?.flyTo({
      zoom: 14,
      center: [ lng, lat ]
    })
  }

  const getRoute = ( place: Feature  ) => {
    if ( !userLocation ) return;
    const [ lng, lat ] = place.center;
    
    getRouteBetweenPoints( userLocation, [ lng, lat ] );
  }

  return (
    <ul className={`list-group ${ showModal ? 'modal-close' : 'modal-open'}`}
      onClick={() => setModal( true )}
    >

      {
        places.map( place => (
            <li 
              className={`pointer list-group-item list-group-item-action ${ ( activeId === place.id ) && 'active' }`}
              key={ place.id }
              onClick={ () => onPlaceClicked( place )}
            >
              <h6> { place.text } </h6>
              <p style={{ fontSize: '12px' }}>
                { place.place_name }
              </p>
              <button 
                onClick={ () => getRoute( place ) }
                className={`btn  btn-sm ${ ( activeId === place.id ) ? 'btn-outline-light':'btn-outline-primary' }`}
              > 
              Direcciones 
              </button>
            </li>
          ))
      }
    <button 
      type="button" 
      className="btn btn-danger button-close"
      onClick={() => setModal( true)}
      >
        Close
      </button>
    </ul>
  )
}
