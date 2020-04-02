
// ======= Earth Quake Data Viz ======= // 


// Creating map object
var myMap = L.map("map", {
  // center: [10, 700],
  center: [40.7605,-80],
  zoom: 4
});


// Add layers
var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: api_key
});
var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: api_key
});
var street = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: api_key
}).addTo(myMap);
var satt = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: api_key
});

// Map object
var baseMaps = {
  Light: light,
  Dark: dark,
  Default: street,
  Satellite: satt
};


// Load data
// var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';
var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson';


// Read in json
d3.json(url, (data)=>{

  console.log(data.features);

  // Color scale
  function getColor(d) {
    return d > 8 ? 'purple' :
          d > 7 ? 'hotpink' :
          d > 6  ? 'red' :
          d > 5  ? 'orange' :
          d > 4  ? 'yellow' :
          d > 3   ? 'lightgreen' :
          d > 2   ? 'green' :
          d > 1   ? 'darkgreen' :
          d < 1   ? 'green' :
                      '#FFFFFF';
  };


  console.log(data.features[0].properties.mag)


  var features = data.features;

  // Loop through features
  for(i=0;i<features.length;i++){

    // Data
    var coords = features[i].geometry.coordinates;
    var mag = features[i].properties.mag;
    var place = features[i].properties.place;
    var felt = features[i].properties.felt;
    var alert = features[i].properties.alert;


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
    <h4>Magnitude: <span style="color:${getColor(mag)}">${mag}</span></h4>
    <h4>Felt Earthquake: ${felt}</h4>
    <h4>Alert Level: <span style="color:${alert}">${capitalize(alert)}</span></h4>`,
    {className: 'tooltip'})
    .openTooltip()
    .addTo(myMap);

  };


  // Create legend
  var legend = L.control({position: 'bottomright'});
  legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [1, 2, 3, 4, 5, 6, 7, 8],
        labels = [];

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
  }
  legend.addTo(myMap);




});

// Control layers
L.control.layers(baseMaps).addTo(myMap);
