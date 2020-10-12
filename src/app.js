const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//defin path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')//express expect views as the default dir. We used this because we renamed it to "templates"
const partialsPath = path.join(__dirname, '../templates/partials')
//set up handlebars engine and view location
app.set('view engine', 'hbs') 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static direcotery to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {//to call the hbc index

    res.render('index', {
        title: 'weather',
        name:'Hayden Haddad'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Hayden Haddad'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page is in progress',
        name: 'Hayden Haddad'
    })
})


app.get('/weather', (req, res) => {

    const address = req.query.address;

    if (!address) {

        return res.send({

            error: 'You must provide an address'
        })
    }
    geocode(address, (error, { latitude, longitude, location } = {}) => {

        if (error) {

            return res.send({ error: error})
            
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {

                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: forecastData ,
                location: location,
                address: address
            })
        })
      })
    })



app.get('/help/*', (req,res) => {

    res.render('404', {
        title: '404',
        name: 'Hayden Haddad',
        errorMsg:'help artical not found'
    })

})




app.get('*', (req, res) => {

    res.render('404', {
        title: '404',
        name: 'Hayden Haddad',
        errorMsg:'Page is not found'

    })
})

app.listen(3000, () => {

    console.log('Server is up on port 3000.')
})