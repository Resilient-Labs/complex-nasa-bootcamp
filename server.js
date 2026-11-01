require('dotenv').config()

const express = require('express')
const path = require('path')
const app = express()

const PORT = process.env.PORT || 3000

// Serve only the files visitors need.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.use('/CSS', express.static(path.join(__dirname, 'CSS')))
app.use('/JS', express.static(path.join(__dirname, 'JS')))
app.use('/data', express.static(path.join(__dirname, 'data')))

// Request weather without sending the API key to the browser.
app.get('/api/weather', async (req, res) => {
  const location = req.query.q

  if (typeof location !== 'string' || !location.trim()) {
    return res.status(400).json({
      error: 'Please provide a location.'
    })
  }

  if (!process.env.WEATHER_API_KEY) {
    return res.status(500).json({
      error: 'The server is missing its weather API key.'
    })
  }

  try {
    const url = new URL('https://api.weatherapi.com/v1/current.json')

    url.searchParams.set('key', process.env.WEATHER_API_KEY)
    url.searchParams.set('q', location.trim())
    url.searchParams.set('aqi', 'no')

    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok || data.error) {
      return res.status(response.ok ? 502 : response.status).json({
        error: 'Weather could not be retrieved for this location.'
      })
    }

    res.json({
      temperature: data.current.temp_f,
      condition: data.current.condition.text
    })
  } catch (error) {
    res.status(502).json({
      error: 'The weather service is temporarily unavailable.'
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})