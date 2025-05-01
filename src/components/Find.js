import React from 'react';

const Find = () => {
  const updateLocation = async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const api = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`;

    try {
      const response = await fetch(api);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const address = data.results[0].formatted_address;
        const statusElement = document.getElementById("locationText");
        statusElement.innerHTML = `${address} &nbsp;<i class="fas fa-map-marker-alt"></i>`;
      } else {
        console.error("No results found in the API response.");
        setError("Unable to fetch location details.");
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      setError("Unable to fetch location details.");
    }
  };

  const setError = (message) => {
    const statusElement = document.getElementById("locationText");
    statusElement.textContent = message;
  };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(updateLocation, () => {
      setError("Unable to retrieve your location.");
    });
  };

  return (
    <button
      id="changeButton"
      onClick={handleLocation}
      style={{ background: 'none', border: 'none', color: '#26732a', cursor: 'pointer' }}
    >
      <span id="locationText">
        Detect Location <i className="fas fa-map-marker-alt"></i>
      </span>
    </button>
  );
};

export default Find;