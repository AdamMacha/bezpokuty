"use client"

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
        version: 'weekly',
      });

      const { Map } = await loader.importLibrary('maps');

      const pragueCenterCoordinates = { lat: 50.0755, lng: 14.4378 };

      const mapOptions: google.maps.MapOptions = {
        center: pragueCenterCoordinates,
        zoom: 12,
      };

      const map = new Map(mapRef.current as HTMLElement, mapOptions);

      new google.maps.Marker({
        position: pragueCenterCoordinates,
        map: map,
        title: 'Pojištění na pokuty s.r.o.',
      });
    };

    initMap();
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default Map;