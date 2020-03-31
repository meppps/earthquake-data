
// ======= Earth Quake Data Viz ======= // 


// Creating map object
var myMap = L.map("map", {
  center: [10, 700],
  zoom: 3
});

// Adding tile layer to the map
var layer = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: api_key
}).addTo(myMap);


// Load data
// var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson';
var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';

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

})

function getColor(d) {
  return d > 7 ? 'red' :
         d > 6  ? 'red' :
         d > 5  ? 'orange' :
         d > 4  ? 'yellow' :
         d > 3   ? 'lightgreen' :
         d > 2   ? 'green' :
         d > 1   ? '#ffeda0' :
         d < 1   ? 'green' :
                    '#FFFFFF';
}
// .addTo(myMap);

console.log(data.features[0].properties.mag)
// function onEachFeature(feature, layer) {
//   layer.bindPopup("<h3>" + "</h3><hr><p>"+ "</p>");
// }

// var earthquakes = L.geoJSON(data,{
//   onEachFeature: onEachFeature
// });

var features = data.features;

for(i=0;i<features.length;i++){
  // console.log(features[i])
  var coords = data.features[i].geometry.coordinates;
  var mag = data.features[i].properties.mag;
  console.log(mag*500);

  // L.geoJSON(features[i]).addTo(myMap);
  var circle = L.circle([coords[1],coords[0]],{
    color: getColor(mag),
    fillColor: getColor(mag),
    fillOpacity: 0.75,
    radius: mag*12000
  }).addTo(myMap).on('click',()=>{
    console.log(this)
  })
}

// L.geoJSON(data.features).addTo(myMap)



});
