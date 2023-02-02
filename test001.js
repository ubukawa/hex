// modules
const config = require('config')
const fs = require('fs')

// parameters
const r = config.get('r')
const outputFile = config.get('outputFile')
const minz = config.get('minz')
const maxz = config.get('maxz')
const layer = config.get('layer')
//

const stream = fs.createWriteStream(`${outputFile}.txt`)


let x = 0
let y = 0
let f = new Object()
f.type = 'Feature'
f.properties = {}
f.geometry = {}
f.tippecanoe = {}

f.properties._id = 1

//defining feature
f.geometry.type = 'Polygon'
let p1 = [x, y + r]
let p2 = [x - Math.sqrt(3) * r /2 , y + r/2]
let p3 = [x - Math.sqrt(3) * r /2 , y - r/2]
let p4 = [x, y - r]
let p5 = [x + Math.sqrt(3) * r /2 , y - r/2]
let p6 = [x + Math.sqrt(3) * r /2 , y + r/2]
f.geometry.coordinates = [[p1,p2,p3,p4,p5,p6]]

f.tippecanoe.layer = layer 
f.tippecanoe.minzoom = minz
f.tippecanoe.maxzoom = maxz

stream.write(JSON.stringify(f))
stream.write(', \n')
//console.log(f)

stream.end()
console.log('end')