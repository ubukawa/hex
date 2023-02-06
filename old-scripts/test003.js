// modules
const config = require('config')
const fs = require('fs')

// parameters
const r = config.get('r')
const outputFile = config.get('outputFile')
const minz = config.get('minz')
const maxz = config.get('maxz')
const layer = config.get('layer')
const xRange = config.get('xRange')
const yRange = config.get('yRange')
const epsg = config.get('epsg')


const xmin = - xRange/2
const xmax =  xRange/2
const ymin = - yRange/2
const ymax = yRange/2

//const stream = fs.createWriteStream(`${outputFile}.geojson`)

let featureCollection = new Object()
featureCollection.type = 'FeatureCollection'
featureCollection.name =  `hex-${r}`
featureCollection.crs = {}
featureCollection.crs.type = 'name'
featureCollection.crs.properties = {}
featureCollection.crs.properties.name = `urn:ogc:def:crs:EPSG::${epsg}`
featureCollection.features = []

let f = new Object()
f.type = 'Feature'
f.properties = {}
f.geometry = {}
f.tippecanoe = {}

featureCollection.features.push(f)
featureCollection.features.push(f)

console.log(JSON.stringify(featureCollection))
