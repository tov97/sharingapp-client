import React, { useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
// import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";

function UserPlaces() {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, sendRequest } = useHttpClient();

  const userId = useParams().userId;
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responsedata = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/places/user/${userId}`
        );
        setLoadedPlaces(responsedata.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };
  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
      )}
    </React.Fragment>
  );
}
export default UserPlaces;
