# hex
creation of hex polygon vector tile

# Usage
## Prep. Clone and npm install
```
git clone https://github.com/ubukawa/hex
cd hex
npm install
```

## 1. Edit config parameters
Please edit config/default.hjson.

```
{
    r: 80000
    gap: 0.01
    minz: 0
    maxz: 4
    layer: hex
    outputFile: output
    epsg: 3857
    xRange: 40075016.68
    yRange: 40097932.2
}
```

r is the length of a side of hexagon in **meters**.  
gap is not yet used. xRange and yRange should be changed if you use other projection than EPSG:3857.


## 2. Run index.js to create GeoJSON
```
node index.js
```
Please wait for a while until GeoJSON file is created.  

or you can overwrite "r" in config by running command as below: 

```
node index.js 100000 # specify the r in meters.
```

You will get the file ${outputFile}-(length in km).geojson. 

## 3. Convert GeoJSON into vector tile

```
tippecanoe -o docs/output.pmtiles --no-tile-compression --no-feature-limit --no-tile-size-limit --projection=EPSG:3857 --force input.geojson  

```


To create GeoJSON,
```
node index-geojson.js
```