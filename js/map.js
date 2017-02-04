
var map, stylfunction;

styleFunction = function(feature){  
  var style = new ol.style.Style({
      image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
          anchor: [0.5, 0.5],                    
          scale: map.getView().getZoom() >= 8 ? 0.5  : 
                 map.getView().getZoom() >= 4 ? 0.25 : 0.15,        
          src: feature.get("logo")
        }))
   });
   
   return style;
};

map = new ol.Map({
  controls: ol.control.defaults().extend([
    new ol.control.FullScreen({
      source: 'controls'
    })
  ]),
  layers: [
    new ol.layer.Tile({ 
      source: new ol.source.OSM()
    }),
    new ol.layer.Vector({
      source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url:"data/spaces.geojson"
      }),
      style: styleFunction      
    })
  ],
  target: 'map',
  view: new ol.View({
    center: ol.proj.fromLonLat([-85.760241,38.257454]),
    zoom: 2
  })
});
