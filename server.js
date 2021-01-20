const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const airports = require('./airports.json')
const YAML = require('yamljs')
const docs = YAML.load('./airports-config.yaml')
const swaggerDocs = require('swagger-jsdoc')({
    swaggerDefinition: docs,
    apis: ['./server.js', './Airport.js']
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {explorer: true}))

/**
 * @swagger
 * /airports:
 *   get:
 *     summary: returns an array of airports
 *     responses:
 *       200:
 *         description: all the airports
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Airport'                       
 */
app.get('/airports', (req, res) => {
    res.send(airports)
})

/**
 * @swagger
 * /airports/{icao}:
 *  parameters:
 *  - name: icao
 *    in: path
 *    required: true
 *    description: the airport ID
 *    schema:
 *      $ref: '#/components/schemas/Airport'
 *   get:
 *     summary: returns an aiport
 *     responses:
 *       200:
 *         description: one airport
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Airport'                       
 */
app.get('/airports/{icao}', (req, res) => {
    res.send(airports)
})

app.listen(3000, () => console.log("Airport API ready. Documents at http://localhost:3000/api-docs"))