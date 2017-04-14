# IceBreaker App

## Configuration File

- From "src/services/api/" directory of this project:

```sh
$ touch config.js
```

- Get your Twitter API keys: https://apps.twitter.com/

- Inside "config.js" you should have:

```javascript
module.exports = {
	twitter: {
		consumer_key: '...',
		consumer_secret: '...',
		access_token: '...',
		access_token_secret: '...',
		timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
	},
	mongodb: {
		url: 'mongodb://localhost:27017/icebreaker',
	},
}
```

- Replace '...' with the corresponding keys.

## Install Dependencies

`yarn`

## Run Development Server

`yarn start`

`http://localhost:8080`

## Initialize Curated Database
From the root of the project directory, do:
```
$ babel-node --presets latest src/csv/load.js
```
This will load curated CSV data into two MongoDB collections:
`icebreaker_curated` and `pickupline_curated`.

## Drop Curated Database
From the root of the project directory, do:
```
$ babel-node --presets latest src/csv/drop.js
```
This will drop the two MongoDB collections:
`icebreaker_curated` and `pickupline_curated`.

## Running sample files
Install babel-node:
```{r, engine='bash', count_lines}
$yarn global add babel-cli
```
The sample files are:
- src/services/api/mongo_sample.js
- src/services/api/twitter_sample.js

Run sample files using:
```{r, engine='bash', count_lines}
$babel-node --presets latest my_file.js
```
