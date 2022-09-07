import { useContext } from 'react';
import { MapContext, PlacesContext } from '../context';
import { BiCurrentLocation } from 'react-icons/bi';

export const BtnMyLocation = () => {

  const { map, isReadyMap } = useContext( MapContext )
  const { userLocation } = useContext( PlacesContext )

  const onClick = () => {
    if ( !isReadyMap ) throw new Error('EL mapa no esta listo')
    if ( !userLocation ) throw new Error('Ubicación del usuario no encontrada')
   
    map?.flyTo({
      zoom: 14,
      center: userLocation
    })
  }
  
  return (
    <button 
      className="custom-btn btn btn-primary"
      onClick={ onClick }
    >
    <span style={{ fontSize: '17px'}}> <BiCurrentLocation /> </span>
    </button>
  )
}
