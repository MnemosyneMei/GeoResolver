
let config = require('../config').config;

let googleMapsClient = require('@google/maps').createClient({
    key: config.APIKey
});


module.exports = {
  getLatLon :   function(address){
       return new Promise((resolve,reject) => {
          googleMapsClient.geocode({
              address: address
          }, function(err, response) {
              if (!err) {
                  // console.dir(response.json.results);
                  resolve(response.json.results);
              } else {
                  reject(err);
              }
          });
      });
  }
};

/*
googleMapsClient.reverseGeocode({
    latlng: '40.714224,-73.961452'
}, function (err, response) {
    console.dir(response.json.results[0].address_components);
})*/