/* eslint import/no-webpack-loader-syntax: off */
import { useContext, useLayoutEffect, useRef } from "react"

// @ts-ignore
import { Map } from "!mapbox-gl";

import { Loading } from ".";
import { PlacesContext, MapContext } from '../context';


export const MapView = () => {

  const { isLoading, userLocation } = useContext( PlacesContext );
  const { setMap } = useContext( MapContext );

  const divMap = useRef<HTMLDivElement>( null );

  useLayoutEffect(() => {
    if ( !isLoading ) { 
      const map = new Map ({
          container: divMap.current!,
          style: 'mapbox://styles/mapbox/outdoors-v11',
          center: userLocation,
          zoom: 14
        });

        setMap( map );
    }
  }, [ isLoading ])

  if ( isLoading ) {
    return <Loading />;
    
  }
  
  return (
    <div 
      ref={ divMap } 
      className="container-map"
    >
    </div>
  )
}
