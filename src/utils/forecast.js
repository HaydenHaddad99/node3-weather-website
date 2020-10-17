
const request = require('request')

const forecast = (lat, lon, callback) => {


    const url = 'http://api.weatherstack.com/current?access_key=b42fd3ebdc53fdf3ab5998e21c47ea14&query=' + encodeURIComponent(lon) + ',' + encodeURIComponent(lat) + '&units=f'
  
    request({ url, json: true }, (error, { body}) => {

        if (error) {

            callback('Unable to connect to weather Services!', undefined)

        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,
                body.current.weather_descriptions[0] + '. it is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike +
                ' degrees out. ' + 'The wind speed is ' + body.current.wind_speed
            )
        }
    })
}

module.exports = forecast