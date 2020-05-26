//Store our API endpoint inside queryURL
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson";

//Perform a GET request to the query URL 
d3.json(queryURL, function (data){
    console.log(data)
    //Once you get a response send the data features object to the createFeatures function 
    createFeeatures(data.features);
});

//Create a function to set the color for the different magnitude 
function getColor(magnitude) {
    //Condtionals for magnitude 
    if (magnitude >= 5) {
        return "red";
    }
    else if (magnitude >= 4){
        return "peru";
    }
    else if (magnitude >= 3) {
        return "darkorange";
    }
    else if (magnitude >= 2) {
        return "yellow";
    }
    else if (magnitude >= 1) {
        return "yellowgreen";
    }
    else {
        return "green";
    }
};

//Define a circleSize function that will give each city a different radius based on its population 
function circleSize(magnitude) {
    return magnitude ** 2;
}

function createFeatures(earthquakeData) {
    function onEachLayer(feature) {
        return L.circleMaker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]],{
            radius: circleSize(feature.properties.mag),
            fill0pacity: 0.8,
            color: getColor(feature.properties.mag),
            fillColor: getColor(feature.properties.mag)
        });
    }

    //Define a function we want to run once for each feature in the features array 
    //Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place + 
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p><hr><p>" + feature.properties.mag + "</p>");
    } 
    //Create a GeoJSON layer containing the featues array on the earthquakeData Object 
    //Run the onEachFeature function once for each piece of data in the array 
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: onEachLayer
    });

    //Sending our earthquakes layer to the createMap function 
    createImageBitmap(earthquakes);

}

function createMap(earthquakes) {
    //Define satelite, grayscale and outdoor map layers 
    var satelitemap = L.titleLayer()
}