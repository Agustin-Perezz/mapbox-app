import { useContext } from 'react';
import { MapContext, PlacesContext } from '../context';
import { GoPlus } from "react-icons/go";

export const IncrementZoomBtn = () => {

  const { map, isReadyMap } = useContext( MapContext )
  const { userLocation } = useContext( PlacesContext )

  
  const onClick = () => {
    if ( !isReadyMap ) throw new Error('EL mapa no esta listo')
    if ( !userLocation ) throw new Error('Ubicación del usuario no encontrada')
    
    let zoom = map.getZoom();
    map?.flyTo({
      zoom: zoom + 0.50,
    })
  }
  
  return (
    <button 
      className="custom-btn btn btn-primary"
      onClick={ onClick }
    >
    <GoPlus />
    </button>
  )
}
