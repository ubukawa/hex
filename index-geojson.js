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

const stream = fs.createWriteStream(`${outputFile}.geojson`)

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

let ylist = []
let row = 0
let y = 0

while (y < ymax - r){
    ylist.push(y)
    row ++
    y = y + 3*r/2
}

y = -3*r/2

while (y > ymin + r){
    ylist.push(y)
    row ++
    y = y - 3*r/2
}

//console.log(ylist) //if y/r is an integer, x starts from zero. Otherwise, x starst from sqrt(3)/2

let id = 0


for (let cy of ylist){
    if ( cy % r == 0 ){
        let xlist = []
        let x = 0
        console.log(`${cy} is A`)

        while (x < xmax - Math.sqrt(3)*r/2){
            xlist.push(x)
            x = x + Math.sqrt(3)*r
        }

        x= - Math.sqrt(3)*r

        while (x > xmin + Math.sqrt(3)*r/2){
            xlist.push(x)
            x = x - Math.sqrt(3)*r
        }

        for ( let cx of xlist){
            id ++
            f.properties._id = id
            f.geometry.type = 'Polygon'
            let p1 = [cx, cy + r]
            let p2 = [cx - Math.sqrt(3) * r /2 , cy + r/2]
            let p3 = [cx - Math.sqrt(3) * r /2 , cy - r/2]
            let p4 = [cx, cy - r]
            let p5 = [cx + Math.sqrt(3) * r /2 , cy - r/2]
            let p6 = [cx + Math.sqrt(3) * r /2 , cy + r/2]
            f.geometry.coordinates = [[p1,p2,p3,p4,p5,p6]]
            f.tippecanoe.layer = layer 
            f.tippecanoe.minzoom = minz
            f.tippecanoe.maxzoom = maxz

            //stream.write(JSON.stringify(f))
            //stream.write(', \n')
            featureCollection.features.push(f)
        }
    } else {
        let xlist = []
        let x = Math.sqrt(3)*r/2

        console.log(`${cy} is B`)
        while (x < xmax - Math.sqrt(3)*r/2){
            xlist.push(x)
            x = x + Math.sqrt(3)*r
        }

        x= - Math.sqrt(3)*r/2

        while (x > xmin + Math.sqrt(3)*r/2){
            xlist.push(x)
            x = x - Math.sqrt(3)*r
        }

        for ( let cx of xlist){
            id ++
            f.properties._id = id
            f.geometry.type = 'Polygon'
            let p1 = [cx, cy + r]
            let p2 = [cx - Math.sqrt(3) * r /2 , cy + r/2]
            let p3 = [cx - Math.sqrt(3) * r /2 , cy - r/2]
            let p4 = [cx, cy - r]
            let p5 = [cx + Math.sqrt(3) * r /2 , cy - r/2]
            let p6 = [cx + Math.sqrt(3) * r /2 , cy + r/2]
            f.geometry.coordinates = [[p1,p2,p3,p4,p5,p6]]
            f.tippecanoe.layer = layer 
            f.tippecanoe.minzoom = minz
            f.tippecanoe.maxzoom = maxz

            //stream.write(JSON.stringify(f))
            //stream.write(', \n')
            featureCollection.features.push(f)
        }
    }
}

stream.write(JSON.stringify(featureCollection))
stream.end()
//console.log(JSON.stringify(featureCollection))
console.log('end')

