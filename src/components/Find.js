import React from 'react';
const Find=()=>{
 
  const status=document.getElementById("locationText");
  

  const success=async(position)=>{
    
     const latitude= position.coords.latitude;
     const longitude= position.coords.longitude;


     var api="https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&key=AIzaSyC_gVuqdfxq8wsjuX-d5PM9fnihy1ZkkGA";
  
     status.innerHTML="Dehradun, Uttarakhand, India &nbsp"+`<i class="fas fa-map-marker-alt"></i>`; 
/*  $.get({
      url:api,
      success: function(data){
          console.log(data);
        status.value=data.results[0].address_components[4].long_name+", ";
        status.value+=data.results[0].address_components[7].long_name+", ";
        status.value+=data.results[0].address_components[8].long_name;
    
  
}
   })*/
}
  const error=()=>
  {
      status.textContent="unable";
  }
  navigator.geolocation.getCurrentPosition(success,error);
}
export default Find;