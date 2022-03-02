import { createContext } from "react";
import { Feature } from "../../interfaces/places";
import { JsxElement } from 'typescript';

export interface PlacesContext {
  isLoading: boolean;
  userLocation?: [ number, number ];
  isLoadingPlaces: boolean;
  places: Feature[];
  
  // Methods
  searchPlacesByTerm: (query: string) =>  Promise<Feature[]>;
}

export const PlacesContext = createContext<PlacesContext>( {} as PlacesContext  );