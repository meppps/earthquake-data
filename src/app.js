
// ======= Earth Quake Data Viz ======= // 


// Creating map object
var myMap = L.map("map", {
  center: [10, 700],
  zoom: 3
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: api_key
}).addTo(myMap);


// Load data
var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson';

// d3.json(url , function(data){
//   console.log(data)
// })

d3.json(url, (data)=>{
  console.log(data.features);

  var geojson = L.choropleth(data,{
     // Define what  property in the features to use
     valueProperty: "mag",

     // Set color scale
     scale: ["#ffffb2", "#b10026"],
 
     // Number of breaks in step range
     steps: 10,
 
     // q for quartile, e for equidistant, k for k-means
     mode: "q",
     style: {
       // Border color
       color: "#fff",
       weight: 1,
       fillOpacity: 0.8 
  }

}).addTo(myMap);

});
