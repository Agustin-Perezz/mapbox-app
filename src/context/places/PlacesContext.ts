import { createContext } from "react";
import { Feature } from "../../interfaces/places";

export interface PlacesContext {
  isLoading: boolean;
  userLocation?: [ number, number ];
  isLoadingPlaces: boolean;
  places: Feature[];
  showModal: boolean;
  
  // Methods
  searchPlacesByTerm: (query: string) =>  Promise<Feature[]>;
  setModal: ( show: boolean ) => void;
}

export const PlacesContext = createContext<PlacesContext>( {} as PlacesContext  );