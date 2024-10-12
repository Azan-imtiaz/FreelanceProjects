import React, { useEffect, useState } from 'react';
import { GoogleMap, DirectionsRenderer, LoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const RouteMap = () => {
  const from = "2-10 Umberston St, London E1 1PY, UK";
  const to = "Lancaster, UK";
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (from && to) {
      const directionsService = new window.google.maps.DirectionsService();
      try {
        directionsService.route(
          {
            origin: from,
            destination: to,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === 'OK') {
              setDirections(result);
            } else {
              setError('Could not calculate the route');
            }
          }
        );
      } catch (err) {
        console.error('Error occurred while requesting directions:', err);
        setError('Error requesting directions');
      }
    }
  }, [from, to]);

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY" libraries={libraries}>
      <div style={{ height: '500px', width: '100%' }}>
        <GoogleMap
          center={{ lat: 51.5074, lng: -0.1278 }} // Default center (London)
          zoom={10}
          mapContainerStyle={{ height: '100%', width: '100%' }}
        >
          {directions ? (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  strokeColor: '#0000FF', // Blue route line
                  strokeOpacity: 0.7,
                  strokeWeight: 5,
                },
              }}
            />
          ) : (
            <div>{error || 'Loading route...'}</div>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default RouteMap;
