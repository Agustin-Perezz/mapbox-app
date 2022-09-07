import { ChangeEvent, useRef, useContext } from 'react';
import { SearchResults } from '.';
import { PlacesContext } from '../context';
import { BiSearchAlt } from 'react-icons/bi';

export const SearchBar = () => {

  const { searchPlacesByTerm, setModal, places } = useContext( PlacesContext );

  const debounceRef = useRef<NodeJS.Timeout>();

  const onQueryChange = ( event: ChangeEvent<HTMLInputElement> ) => {

    if ( debounceRef.current ) 
        clearTimeout( debounceRef.current );
    
    debounceRef.current = setTimeout(() => {
      searchPlacesByTerm( event.target.value );
      setModal( false );
    }, 350 );

  }

  const handleModal = () => { 
    if ( places.length > 0 ) { setModal( false ) };
  }
  
  return (
    <div className="search-container">
      <BiSearchAlt className='custom-icon-1'/>
      <input 
        type="text" 
        placeholder='Buscar lugar...'
        onChange={ onQueryChange }
        onClick={() => handleModal()}
      />
      <SearchResults />
    </div>
  )
}

