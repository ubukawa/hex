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

//
const xmin = - xRange/2
const xmax =  xRange/2
const ymin = - yRange/2
const ymax = yRange/2

let ylist = []
let i = 0
let y = 0

while (y < ymax - r){
    ylist.push(y)
    i ++
    y = y + 3*r/2
}

y = -3*r

while (y > ymin + r){
    //console.log(i)
    //console.log(y)
    ylist.push(y)
    i ++
    y = y - 3*r/2
}

//console.log(ylist) //if y/r is an integer, x starts from zero. Otherwise, x starst from sqrt(3)/2

for (let y0 of ylist){
    if ( y0 % r == 0 ){
        console.log(`${y0} is A`)
    } else {
        console.log(`${y0} is B`)
    }
}


//console.log(xmin)
//console.log(xmax)
//console.log(ymin)
//console.log(ymax)

/*
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
*/