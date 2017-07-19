

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
        resultsColumn: 'results', // column to push results to: TYPE = TEXT
        statusColumn: 'status', // column of type int. default to 0 = unprocessed . after processing, value changed to { 1 = success | 2 = error encountered } TYPE = int
        updatedDateTimeColunm: 'updated_at', // TYPE = datetime

        // googlemaps API settings
        APIKey: 'AIzaSyBYMfRM54t8roKxR5xxLnakHIpaPcy_Cm8',

        limit: 1000 //maximum records to process in a single session
    }
};