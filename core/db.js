
let mysql      = require('mysql');
let Promise = require('bluebird');
let config = require('../config').config;

console.log(config.dbhost);
let connection = mysql.createConnection({
    host     : config.dbhost || 'localhost',
    user     : config.dbuser || 'root',
    password : config.dbpassword || 'toor',
    database : config.dbname || 'GeoLocation'
});


let dbConnection = function() {
    return new Promise((resolve, reject) => {
        if (connection.state === 'disconnected') {
            connection.connect(function (err) {
                if (!err) {
                    console.log('db connection established as id ' + connection.threadId);
                    resolve(connection);
                } else {
                    console.log('database connection failed : ' + err);
                    reject(connection);
                }
            });
        } else { // already connected
            resolve(connection);
        }
    });
};



module.exports = {

    end: function(){
        connection.end();
    },

    pause: function(){
        connection.pause();
    },

    resume: function(){
        connection.resume();
    },

    getUnresolved: function () {
        return new Promise((resolve,reject) => {

            dbConnection()
                .then((connection) => {
                    let queryString = 'SELECT ' + config.identityColumn + ' as identityColumn, ' + config.addressColumn + ' as addressColumn' + ' FROM ' + config.sourceTable + ' WHERE ' + config.statusColumn + ' = 0';
                    let query = connection.query(queryString);
                    resolve(query);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                })
        });


    },


    updateUnresolved: function (data) {
        return new Promise((resolve,reject) => {

            dbConnection()
                .then((connection) => {
                    connection.query('UPDATE ' + config.sourceTable + ' set ' + config.statusColumn + ' = ? , ' + config.resultsColumn + ' = ? , ' + config.updatedDateTimeColunm + ' = ? where ' + config.identityColumn + ' = ?', data, function (error, results, fields) {
                        console.log('im here');
                        if (error) {
                            console.log(error);
                            reject(error);
                        }
                        else {
                            console.log('updated rows : ' + results.changedRows + ' rows');
                            resolve(true);
                        }
                    })
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });

        })
    }
};

