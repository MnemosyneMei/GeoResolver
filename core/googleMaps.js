
let config = require('../config').config;

let APIKeys = (process.env.APIKeys || config.APIKey).split(',');
let APIKey = process.env.APIKey || config.APIKey;

if(APIKeys.length > 0){
    let processNumber = (process.env.PROCESS_NUMBER || 1) - 1;
    APIKey = APIKeys[processNumber];
}


console.log(
    'variables loaded :: ' + 'APIKey = ' + APIKey
);


let googleMapsClient = require('@google/maps').createClient({
    key: APIKey
});


module.exports = {
  getLatLon :   function(address){
       return new Promise((resolve,reject) => {
          googleMapsClient.geocode({
              address: address
          }, function(err, response) {
              if (!err) {
                   console.dir(response.json.results[0]);
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