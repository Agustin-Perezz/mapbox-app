

export const Loading = () => {
  return (
     <div className="loading-map d-flex justify-content-center align-items-center">
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h3> Espere por favor </h3>
        <span> Localizando...</span>
       </div>
     </div>
    
  )
}
