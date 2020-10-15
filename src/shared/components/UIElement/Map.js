import React, { useRef, useEffect } from "react";

import "./Map.css";
// udemy Module 53
// add script to the index.html with the api key from google cloud maps.
/* Api from google
AIzaSyCetymWOGRRP7anXZenXABVey5F6EAcfx4
*/
function Map(props) {
  const mapRef = useRef();
  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });
    new window.google.maps.Marker({ position: props.center, map: map });
  }, [props.center, center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
}
export default Map;
