'use strict';

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const getLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        resolve(coords);
        console.log(coords);
      },
      (e) => {
        console.error(`ERROR(${e.code}): ${e.message}`);
        reject(e);
      },
      options
    );
  });
};

export default getLocation;
