
export const getUserLocation = async(): Promise<[number, number]> => { 

  return new Promise(( resolve, reject ) => {

    // Obtenemos la ubicación.
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve([ coords.longitude, coords.latitude ]);
      },
      ( err ) => {
        alert('NO se pudo obtener su ubicación');
        console.log( err );
        reject();
      }
    )

  })

}