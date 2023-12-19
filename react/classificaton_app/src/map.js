"use client";

import styles from './style.module.css';
import { useState } from "react";
import { ImageUpload } from "./component/ImageUpload/Drop_images";

import {
  APIProvider,
  Map,
} from "@vis.gl/react-google-maps";

export function Intro() {
  const [showImageUpload, setShowImageUpload] = useState(false);

  const handleClick = () => {
    setShowImageUpload(true);
  };

  const position = { lat: 15.87000, lng: 100.9925 };
  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "100vh", width: "100%" }}>
        <Map zoom={9} center={position} mapId={process.env.REACT_APP_MAP_ID} minZoom={6}>
          {showImageUpload && (
            <div className={styles.DropImage}>
              <ImageUpload />
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

