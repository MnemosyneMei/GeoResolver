

let db = require('./core/db');
let googlemaps = require('./core/googleMaps');
let Promise = require('bluebird');
let moment = require('moment');

let updateArray = [];


// fetch records from database ::

db.getUnresolved()
.then((query) => {
    query.on('result', function (row) {
        db.pause();// process one by one to use less memory

        console.log(row.addressColumn);
        googlemaps.getLatLon(row.addressColumn)
            .then((results) => {

                updateArray = [
                    1,
                    JSON.stringify(results)
                ];


            })
            .catch((error) => {

                updateArray = [
                    2,
                    error
                ];

                console.log(error);
            })
            .then(() => {
                db.resume();


                let now = moment();
                updateArray[2] = now.format('YYYY-MM-DD HH:mm:ss');
                updateArray[3] = row.identityColumn;

                db.updateUnresolved(updateArray)
                    .then((result) => {
                        if(result){
                            console.log('successfully updated location for ' + row.addressColumn);
                        } else {
                            console.log('failed to update location for ' + row.addressColumn);
                        }

                    })
                    .catch(err => {
                        db.resume(); // resume anyway
                        console.log('something just went wrong :: ' + err);

                    })


            })
    }).on('end', function() {
        // all rows have been received

    });



}).catch((error) => {
    console.log(error);

});


