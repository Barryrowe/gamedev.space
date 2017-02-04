
var map, stylfunction, popupElement, popup;

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

popupElement = document.getElementById('popup');
popup = new ol.Overlay({
  element: popupElement,
  positioning: 'bottom-center',
  stopEvent: false,
  offset: [0, -10]
});
map.addOverlay(popup);

 map.on('click', function(evt) {
  var feature = map.forEachFeatureAtPixel(evt.pixel,
      function(feature) {
        return feature;
      });
  if (feature) {
    var content = '<h4><a href="' + feature.get('url') + '">' + feature.get('name') + '</a></h4>' +
      '<p>' + feature.get('address') + '</p>' +
      '<p><a href="http://twitter.com/' + feature.get('twitter_name') + '">' + feature.get('twitter_name') + '</a></p>';
    var coordinates = feature.getGeometry().getCoordinates();

    popup.setPosition(coordinates);

    var popover = $(popupElement).data('bs.popover');
    if(popover){
      popover.options.content = content;
    }else{    
      $(popupElement).popover({
        'placement': 'top',
        'html': true,
        'content': content
      });
    }
    $(popupElement).popover('show');
  } else {
    $(popupElement).popover('destroy');
  }
});
