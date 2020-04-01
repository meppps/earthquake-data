
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
var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';



d3.json(url, (data)=>{
  
  console.log(data.features);

  // Color scale
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
  };


  console.log(data.features[0].properties.mag)


  var features = data.features;

  // Loop through features
  for(i=0;i<features.length;i++){

    // Data
    var coords = data.features[i].geometry.coordinates;
    var mag = data.features[i].properties.mag;
    var place =  data.features[i].properties.place;
    var felt = data.features[i].properties.felt;
    var alert = data.features[i].properties.alert;


    const capitalize = (s) => {
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    }
    
    // Add circle and tooltip
    var circle = L.circle([coords[1],coords[0]],{
      color: getColor(mag),
      fillColor: getColor(mag),
      fillOpacity: 0.75,
      radius: mag*12000,

    }).bindTooltip(`
    <h3>Location: ${place}</h3>
    <h4>Magnitude: ${mag}</h4>
    <h4>Felt Earthquake: ${felt}</h4>
    <h4>Alert Level: <span style="color:${alert}">${capitalize(alert)}</span></h4>`,
    {className: 'tooltip'})
    .openTooltip()
    .addTo(myMap);

  }




});
