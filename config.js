

module.exports = {
    config: {
        // database settings
        dbhost: 'localhost',
        dbuser: 'root',
        dbpassword: 'toor',
        dbname: 'GeoLocation',

        // Location Table Variables
        sourceTable: 'Locations',
        addressColumn: 'address',
        identityColumn: 'idx',

        // add 3 extra columns ::
        resultsColumn: 'results', // column to push results to:
        statusColumn: 'status', // column of type int. default to 0 = unprocessed . after processing, value changed to { 1 = success | 2 = error encountered }
        updatedDateTimeColunm: 'updated_at',

        // googlemaps API settings
        APIKey: 'AIzaSyBYMfRM54t8roKxR5xxLnakHIpaPcy_Cm8'
    }
};