import { MdTimer } from "react-icons/md";
import { useContext } from 'react';
import { MapContext } from "../context";

export const LocationAndDistance = () => {
  
  const { stats } = useContext( MapContext );
  
  return (
    <div className="alert alert-primary d-flex custom-alert" role="alert">
      <div>
       D: { stats![0] } kms. 
      </div>
      <MdTimer style={{ marginLeft: '10px'}}/> 
      <div > : { stats![1] } hrs, { stats![2] } min. </div>
    </div>
  )
}
