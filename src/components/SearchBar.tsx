import { ChangeEvent, useRef, useContext } from 'react';
import { SearchResults } from '.';
import { PlacesContext } from '../context';
import { BiSearchAlt } from 'react-icons/bi';

// Metodo: cuando se termina de escribir se ejecutra la petecion.
export const SearchBar = () => {

  const { searchPlacesByTerm } = useContext( PlacesContext );

  const debounceRef = useRef<NodeJS.Timeout>();

  const onQueryChange = ( event: ChangeEvent<HTMLInputElement> ) => {

    if ( debounceRef.current ) 
        clearTimeout( debounceRef.current );
    
    debounceRef.current = setTimeout(() => {
      searchPlacesByTerm( event.target.value );
    }, 350 );

  }
  
  return (
    <div className="search-container">
      <BiSearchAlt className='custom-icon-1'/>
      <input 
        type="text" 
        placeholder='Buscar lugar...'
        // className="form-control"
        onChange={ onQueryChange }
      />
      <SearchResults />
    </div>
  )
}

