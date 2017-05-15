function initDemo() {

  document.getElementById('geojson-textarea').value = `{
    "type": "FeatureCollection",
    "features": [
      {
        "id": "1",
        "source": "My GeoJSON",
        "type": "Feature",
        "format": "GeoJSON",
        "title": "Feature 1",
        "projection": "EPSG:4326",
        "geometry": {
          "type": "Point",
          "coordinates": [-71.285006, 46.716211]
        },
        "properties": {
          "name": "name 1",
          "address": "address 1",
          "class": 1
        }
      },
      {
        "id": "2",
        "source": "My GeoJSON",
        "type": "Feature",
        "format": "GeoJSON",
        "title": "Feature 2",
        "projection": "EPSG:4326",
        "geometry": {
          "type": "Point",
          "coordinates": [-71.295006, 46.736211]
        },
        "properties": {
          "name": "name 2",
          "address": "address 2",
          "class": 1
        }
      },
      {
        "id": "3",
        "source": "My GeoJSON",
        "type": "Feature",
        "format": "GeoJSON",
        "title": "Feature 3",
        "projection": "EPSG:4326",
        "geometry": {
          "type": "Point",
          "coordinates": [-71.275006, 46.796211]
        },
        "properties": {
          "name": "name 3",
          "address": "address 3",
          "class": 2
        }
      },
      {
        "id": "4",
        "source": "My GeoJSON",
        "type": "Feature",
        "format": "GeoJSON",
        "title": "Feature 4",
        "projection": "EPSG:4326",
        "geometry": {
          "type": "Point",
          "coordinates": [-71.235006, 46.716211]
        },
        "properties": {
          "name": "name 4",
          "address": "address 4",
          "class": 3
        }
      }
    ]
  }`;

  document.getElementById('geojson-button').onclick = () => {
    var geojson = document.getElementById('geojson-textarea').value;
    try {
      var features = parseGeoJSON(geojson);
    } catch(err) {
      return;
    }

    setFeatures(features);
  };

  document.getElementById('geojson-button-clear').onclick = () => {
    var geojson = document.getElementById('geojson-textarea').value = '';
    IGO.overlayService.clear();
    IGO.featureService.clear();
  };

  window.setTimeout(() => {
    IGO.contextService.context$.subscribe(context => {
      document.getElementById('context-textarea').value = JSON.stringify(context, null, 2);
    });
  }, 3000);

   document.getElementById('context-button').onclick = () => {
    const context = document.getElementById('context-textarea').value;
    IGO.contextService.setContext(JSON.parse(context));
  };

}

function parseGeoJSON(geojson) {
  var collection = JSON.parse(geojson);

  return collection.features.map(feature => Object.assign({}, feature, {
    source: 'My GeoJSON',
    icon: 'place'
  }));
}

function setFeatures(features) {
  IGO.featureService.unfocusFeature();
  IGO.featureService.unselectFeature();
  IGO.featureService.setFeatures(features);
}
