"use client";

import styles from './style.module.css';
import { useState } from "react";
import { ImageUpload } from "./component/ImageUpload/Drop_images";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

export function Intro() {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: 15.87000, lng: 100.9925 });

  const handleClick = () => {
    if  (showImageUpload) {
      setShowImageUpload(false);
    } 
    else {
      setShowImageUpload(true);
    }
    
  };
  
  const handleMapClick = () => {
      // const { lat, lng } = Map.event.lngLat;
      // console.log(lat);
      // setCoordinates({ lat, lng });
  };

  
  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "100vh", width: "100%" }}>
        <Map zoom={6} center={coordinates} mapId={process.env.REACT_APP_MAP_ID} minZoom={6} onClick={handleMapClick}>
          <AdvancedMarker position={coordinates}>
              <Pin/>
            </AdvancedMarker>
          {showImageUpload && (
            <div className={styles.DropImage}>
              <ImageUpload coordinates={coordinates}/>
            </div>
          )}
          <div className={styles.button} onClick={handleClick}>
            <p>เลือกชนิดพืชที่ต้องการวิเคราะห์โรค</p>
          </div>
        </Map>
      </div>
    </APIProvider>
  );
}

