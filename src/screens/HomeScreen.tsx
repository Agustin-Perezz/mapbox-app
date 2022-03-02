import { BtnDecrementZoom, BtnMyLocation, IncrementZoomBtn, LocationAndDistance, MapView, SearchBar } from "../components"
import { useContext } from 'react';
import { MapContext } from "../context";

export const HomeScreen = () => {

  const { stats } = useContext( MapContext );
  
  return (
    <div>
      <MapView />
      <SearchBar />
      <div className="btn-container">
        <BtnMyLocation />
        <IncrementZoomBtn />
        <BtnDecrementZoom />
      </div>
      { stats !== undefined && <LocationAndDistance /> }
    </div>
  )
}
