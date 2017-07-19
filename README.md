# GeoResolver

How to use:

1. clone this repository to your machine:

git clone https://github.com/kibukamusoke/GeoResolver.git

2. Replace db connection and google maps API variables with your own in config.js file.

3. Create 3 extra columns in your mysql table:

i.   status (default this to 0)
ii.  updated_at
iii. results

4. in the root director, run npm install to install package dependencies

5. to run script, do npm start.


# Docker

https://hub.docker.com/r/kibukamusoke/nodejs-geo-resolver/

pull command :: docker pull kibukamusoke/nodejs-geo-resolver

run command: sudo docker run --env-file ./env.list kibukamusoke/nodejs-geo-resolver

run this in the same folder where the env.list file is. for multiple containers with different API keys, delete APIKey kvp from env.list and use -e APIKey = "thegoogleapikey"

# Sample Address:

Serin Residency Jalan Fauna 1 Cyberjaya Selangor Malaysia

# Resolved Result:

[
	{
		"address_components": [
			{
				"long_name": "Jalan Fauna 1",
				"short_name": "Jln Fauna 1",
				"types": [
					"route"
				]
			},
			{
				"long_name": "Cyberjaya",
				"short_name": "Cyberjaya",
				"types": [
					"political",
					"sublocality",
					"sublocality_level_1"
				]
			},
			{
				"long_name": "Cyberjaya",
				"short_name": "Cyberjaya",
				"types": [
					"locality",
					"political"
				]
			},
			{
				"long_name": "Selangor",
				"short_name": "Selangor",
				"types": [
					"administrative_area_level_1",
					"political"
				]
			},
			{
				"long_name": "Malaysia",
				"short_name": "MY",
				"types": [
					"country",
					"political"
				]
			},
			{
				"long_name": "63000",
				"short_name": "63000",
				"types": [
					"postal_code"
				]
			}
		],
		"formatted_address": "Jln Fauna 1, Cyberjaya, 63000 Cyberjaya, Selangor, Malaysia",
		"geometry": {
			"location": {
				"lat": 2.9162007,
				"lng": 101.6457641
			},
			"location_type": "GEOMETRIC_CENTER",
			"viewport": {
				"northeast": {
					"lat": 2.917549680291502,
					"lng": 101.6471130802915
				},
				"southwest": {
					"lat": 2.914851719708498,
					"lng": 101.6444151197085
				}
			}
		},
		"place_id": "ChIJWZn-ZeK2zTERzeF56s7qnog",
		"types": [
			"establishment",
			"point_of_interest"
		]
	}
]

Goodluck.

