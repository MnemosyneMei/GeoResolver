
let mysql      = require('mysql');
let Promise = require('bluebird');
let config = require('../config').config;


let dbhost = process.env.dbhost || config.dbhost;
let dbuser = process.env.dbuser || config.dbuser;
let dbpassword = process.env.dbpassword || config.dbpassword;
let dbname = process.env.dbname || config.dbname;

let addressColumn = process.env.addressColumn || config.addressColumn;
let identityColumn = process.env.identityColumn || config.identityColumn;
let sourceTable = process.env.sourceTable || config.sourceTable;
let statusColumn = process.env.statusColumn || config.statusColumn;
let limit = process.env.limit || config.limit;
let resultsColumn = process.env.resultsColumn || config.resultsColumn;
let updatedDateTimeColunm = process.env.updatedDateTimeColunm || config.updatedDateTimeColunm;

// get db offset to avoid fetching the same record twice.

let offSet = process.env.OFFSET || 3000;
let processNumber = (process.env.PROCESS_NUMBER || 1) - 1;
let dbOffset = Number(offSet) + (Number(processNumber) * Number(limit));

let connection = mysql.createConnection({
    host     : dbhost || 'localhost',
    user     : dbuser || 'root',
    password : dbpassword || 'toor',
    database : dbname || 'GeoLocation'
});


console.log(
    'variables loaded :: ' + 'dbhost = ' + dbhost
);


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
                    let queryString = 'SELECT ' + identityColumn + ' as identityColumn, ' + addressColumn + ' as addressColumn' + ' FROM ' + sourceTable + ' WHERE ' + statusColumn + ' = 0 limit ' + limit;
                    let query = connection.query(queryString);
                    resolve(query);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                })
        });


    },

    setProcessingFlag: function (data) {

        return new Promise((resolve, reject) => {
                dbConnection()
                    .then((connection) => {
                        connection.query('UPDATE ' + sourceTable + ' set ' + statusColumn + ' = 3 where ' + identityColumn + ' = ?', data, function (error, results, fields) {
                                if (error) {
                                    console.log(error);
                                    reject(error);
                                }
                                else {
                                    console.log('processing rows : ' + results.changedRows + ' rows');
                                    resolve(true);
                                }
                            })
                        })
                    .catch(err => {
                        console.log(err);

                    })
        })

    },


    updateUnresolved: function (data) {
        return new Promise((resolve,reject) => {

            dbConnection()
                .then((connection) => {
                    connection.query('UPDATE ' + sourceTable + ' set ' + statusColumn + ' = ? , ' + resultsColumn + ' = ? , ' + updatedDateTimeColunm + ' = ? where ' + identityColumn + ' = ?', data, function (error, results, fields) {

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

