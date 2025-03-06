var map, featureList, boroughSearch = [], poteauSearch = [], compteurSearch = [] , zoneSearch = [], zone4Search = [];

$(window).resize(function() {
  sizeLayerControl();
});

$(document).on("click", ".feature-row", function(e) {
  $(document).off("mouseout", ".feature-row", clearHighlight);
  sidebarClick(parseInt($(this).attr("id"), 10));
});

if ( !("ontouchstart" in window) ) {
  $(document).on("mouseover", ".feature-row", function(e) {
    highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
  });
}

$(document).on("mouseout", ".feature-row", clearHighlight);

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#full-extent-btn").click(function() {
  map.fitBounds(boroughs.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#list-btn").click(function() {
  animateSidebar();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  animateSidebar();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  animateSidebar();
  return false;
});

function animateSidebar() {
  $("#sidebar").animate({
    width: "toggle"
  }, 350, function() {
    map.invalidateSize();
  });
}

function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  highlight.clearLayers();
}

function sidebarClick(id) {
  var layer = markerClusters.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}

function syncSidebar() {
  /* Empty sidebar features */
  $("#feature-list tbody").empty();
  /* Loop through poteau layer and add only features which are in the map bounds */
  poteau.eachLayer(function (layer) {
    if (map.hasLayer(poteauLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="marker.png"></td><td class="feature-name">' + layer.feature.properties.repondant + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  /* Loop through compteurlayer and add only features which are in the map bounds */
  compteur.eachLayer(function (layer) {
    if (map.hasLayer(compteurLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="marker.png"></td><td class="feature-name">' + layer.feature.properties.repondant + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });

 /* Loop through compteurlayer and add only features which are in the map bounds */
  zone.eachLayer(function (layer) {
    if (map.hasLayer(zoneLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="marker.png"></td><td class="feature-name">' + layer.feature.properties.repondant + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });

 /* Loop through compteurlayer and add only features which are in the map bounds */
  zone4.eachLayer(function (layer) {
    if (map.hasLayer(zone4Layer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="marker.png"></td><td class="feature-name">' + layer.feature.properties.repondant + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  /* Update list.js featureList */
  featureList = new List("features", {
    valueNames: ["feature-name"]
  });
  featureList.sort("feature-name", {
    order: "asc"
  });
}

/* Basemap Layers */
var osmLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

            maxZoom: 19
        });
var Satellite = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        })

/* Overlay Layers */
var highlight = L.geoJson(null);
var highlightStyle = {
  stroke: false,
  fillColor: "#00FFFF",
  fillOpacity: 0.7,
  radius: 10
};

var boroughs = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "black",
      fill: false,
      opacity: 1,
      clickable: false
    };
  },
  onEachFeature: function (feature, layer) {
    boroughSearch.push({
      name: layer.feature.properties.QUARTIER,
      source: "Boroughs",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
  }
});
$.getJSON("data/zones.geojson", function (data) {
  boroughs.addData(data);
});

//Create a color dictionary based off of subway route_id
var subwayColors = {"1":"#ff3135", "2":"#ff3135", "3":"ff3135", "4":"#009b2e",
    "5":"#009b2e", "6":"#009b2e", "7":"#ce06cb", "A":"#fd9a00", "C":"#fd9a00",
    "E":"#fd9a00", "SI":"#fd9a00","H":"#fd9a00", "Air":"#ffff00", "B":"#ffff00",
    "D":"#ffff00", "F":"#ffff00", "M":"#ffff00", "G":"#9ace00", "FS":"#6e6e6e",
    "GS":"#6e6e6e", "J":"#976900", "Z":"#976900", "L":"#969696", "N":"#ffff00",
    "Q":"#ffff00", "R":"#ffff00" };

var subwayLines = L.geoJson(null, {
  style: function (feature) {
      return {
        color: "#441937",
        weight: 1,
        opacity: 1
      };
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Nom</th><td>" + feature.properties.Nom   + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.Nom);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");

        }
      });
    }
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        subwayLines.resetStyle(e.target);
      }
    });
  }
});
$.getJSON("data/route_secondaire_boulaos.geojson", function (data) {
  subwayLines.addData(data);
});

//Create a color dictionary based off of subway route_id
var subwayColors = {"1":"#ff3135", "2":"#ff3135", "3":"ff3135", "4":"#009b2e",
    "5":"#009b2e", "6":"#009b2e", "7":"#ce06cb", "A":"#fd9a00", "C":"#fd9a00",
    "E":"#fd9a00", "SI":"#fd9a00","H":"#fd9a00", "Air":"#ffff00", "B":"#ffff00",
    "D":"#ffff00", "F":"#ffff00", "M":"#ffff00", "G":"#9ace00", "FS":"#6e6e6e",
    "GS":"#6e6e6e", "J":"#976900", "Z":"#976900", "L":"#969696", "N":"#ffff00",
    "Q":"#ffff00", "R":"#ffff00" };

var hayabley_zone2 = L.geoJson(null, {
  style: function (feature) {
      return {
        color: "#441937",
        weight: 1,
        opacity: 1
      };
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Nom</th><td>" + feature.properties.NOM   + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NOM);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");

        }
      });
    }
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        hayabley_zone2.resetStyle(e.target);
      }
    });
  }
});
$.getJSON("data/route_principal_boulaos.geojson", function (data) {
  hayabley_zone2.addData(data);
});

//Create a color dictionary based off of subway route_id
var subwayColors = {"1":"#ff3135", "2":"#ff3135", "3":"ff3135", "4":"#009b2e",
    "5":"#009b2e", "6":"#009b2e", "7":"#ce06cb", "A":"#fd9a00", "C":"#fd9a00",
    "E":"#fd9a00", "SI":"#fd9a00","H":"#fd9a00", "Air":"#ffff00", "B":"#ffff00",
    "D":"#ffff00", "F":"#ffff00", "M":"#ffff00", "G":"#9ace00", "FS":"#6e6e6e",
    "GS":"#6e6e6e", "J":"#976900", "Z":"#976900", "L":"#969696", "N":"#ffff00",
    "Q":"#ffff00", "R":"#ffff00" };

var hayabley_zone3 = L.geoJson(null, {
  style: function (feature) {
      return {
        color: "#ebda05",
        weight: 1,
        opacity: 1
      };
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Nom</th><td>" + feature.properties.NOM   + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NOM);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");

        }
      });
    }
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        hayabley_zone3.resetStyle(e.target);
      }
    });
  }
});
$.getJSON("data/route_secondaire_rasdika.geojson", function (data) {
  hayabley_zone3.addData(data);
});

//Create a color dictionary based off of subway route_id
var subwayColors = {"1":"#ff3135", "2":"#ff3135", "3":"ff3135", "4":"#009b2e",
    "5":"#009b2e", "6":"#009b2e", "7":"#ce06cb", "A":"#fd9a00", "C":"#fd9a00",
    "E":"#fd9a00", "SI":"#fd9a00","H":"#fd9a00", "Air":"#ffff00", "B":"#ffff00",
    "D":"#ffff00", "F":"#ffff00", "M":"#ffff00", "G":"#9ace00", "FS":"#6e6e6e",
    "GS":"#6e6e6e", "J":"#976900", "Z":"#976900", "L":"#969696", "N":"#ffff00",
    "Q":"#ffff00", "R":"#ffff00" };

var dogley_zone1 = L.geoJson(null, {
  style: function (feature) {
      return {
        color: "#F56741",
        weight: 1,
        opacity: 1
      };
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Nom</th><td>" + feature.properties.NAME_12_14 + "<tr><th>ZONE</th><td>" + feature.properties.Zone_12_13 + "<tr><th>SECTEUR</th><td>" + feature.properties.secteur + "</td></tr>"  + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.Route);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");

        }
      });
    }
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        dogley_zone1.resetStyle(e.target);
      }
    });
  }
});
$.getJSON("data/Route_principal_rasdika.geojson", function (data) {
  dogley_zone1.addData(data);
});


//Create a color dictionary based off of subway route_id
var subwayColors = {"1":"#ff3135", "2":"#ff3135", "3":"ff3135", "4":"#009b2e",
    "5":"#009b2e", "6":"#009b2e", "7":"#ce06cb", "A":"#fd9a00", "C":"#fd9a00",
    "E":"#fd9a00", "SI":"#fd9a00","H":"#fd9a00", "Air":"#ffff00", "B":"#ffff00",
    "D":"#ffff00", "F":"#ffff00", "M":"#ffff00", "G":"#9ace00", "FS":"#6e6e6e",
    "GS":"#6e6e6e", "J":"#976900", "Z":"#976900", "L":"#969696", "N":"#ffff00",
    "Q":"#ffff00", "R":"#ffff00" };

var dogley_zone2 = L.geoJson(null, {
  style: function (feature) {
      return {
        color: "#F56741",
        weight: 1,
        opacity: 1
      };
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Nom</th><td>" + feature.properties.NAME_12_14 + "<tr><th>ZONE</th><td>" + feature.properties.Zone_12_13 + "<tr><th>SECTEUR</th><td>" + feature.properties.secteur + "</td></tr>"  + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.Route);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");

        }
      });
    }
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        dogley_zone2.resetStyle(e.target);
      }
    });
  }
});
$.getJSON("data/dogley_zone2.geojson", function (data) {
  dogley_zone2.addData(data);
});

//Create a color dictionary based off of subway route_id
var subwayColors = {"1":"#ff3135", "2":"#ff3135", "3":"ff3135", "4":"#009b2e",
    "5":"#009b2e", "6":"#009b2e", "7":"#ce06cb", "A":"#fd9a00", "C":"#fd9a00",
    "E":"#fd9a00", "SI":"#fd9a00","H":"#fd9a00", "Air":"#ffff00", "B":"#ffff00",
    "D":"#ffff00", "F":"#ffff00", "M":"#ffff00", "G":"#9ace00", "FS":"#6e6e6e",
    "GS":"#6e6e6e", "J":"#976900", "Z":"#976900", "L":"#969696", "N":"#ffff00",
    "Q":"#ffff00", "R":"#ffff00" };

var layabley_zone1 = L.geoJson(null, {
  style: function (feature) {
      return {
        color: "#F56741",
        weight: 1,
        opacity: 1
      };
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Nom</th><td>" + feature.properties.NAME_12_14 + "<tr><th>ZONE</th><td>" + feature.properties.Zone_12_13 + "<tr><th>SECTEUR</th><td>" + feature.properties.secteur + "</td></tr>"  + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.Route);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");

        }
      });
    }
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        layabley_zone1.resetStyle(e.target);
      }
    });
  }
});
$.getJSON("data/layabley_zone1.geojson", function (data) {
layabley_zone1.addData(data);
});

//Create a color dictionary based off of subway route_id
var subwayColors = {"1":"#ff3135", "2":"#ff3135", "3":"ff3135", "4":"#009b2e",
    "5":"#009b2e", "6":"#009b2e", "7":"#ce06cb", "A":"#fd9a00", "C":"#fd9a00",
    "E":"#fd9a00", "SI":"#fd9a00","H":"#fd9a00", "Air":"#ffff00", "B":"#ffff00",
    "D":"#ffff00", "F":"#ffff00", "M":"#ffff00", "G":"#9ace00", "FS":"#6e6e6e",
    "GS":"#6e6e6e", "J":"#976900", "Z":"#976900", "L":"#969696", "N":"#ffff00",
    "Q":"#ffff00", "R":"#ffff00" };

var layabley_zone2 = L.geoJson(null, {
  style: function (feature) {
      return {
        color: "#F56741",
        weight: 1,
        opacity: 1
      };
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
    var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Nom</th><td>" + feature.properties.NAME_12_14 + "<tr><th>ZONE</th><td>" + feature.properties.Zone_12_13 + "<tr><th>SECTEUR</th><td>" + feature.properties.secteur + "</td></tr>"  + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.Route);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");

        }
      });
    }
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        layabley_zone2.resetStyle(e.target);
      }
    });
  }
});
$.getJSON("data/layabley_zone2.geojson", function (data) {
  layabley_zone2.addData(data);
});


//Create a color dictionary based off of subway route_id
var subwayColors = {"1":"#ff3135", "2":"#ff3135", "3":"ff3135", "4":"#009b2e",
    "5":"#009b2e", "6":"#009b2e", "7":"#ce06cb", "A":"#fd9a00", "C":"#fd9a00",
    "E":"#fd9a00", "SI":"#fd9a00","H":"#fd9a00", "Air":"#ffff00", "B":"#ffff00",
    "D":"#ffff00", "F":"#ffff00", "M":"#ffff00", "G":"#9ace00", "FS":"#6e6e6e",
    "GS":"#6e6e6e", "J":"#976900", "Z":"#976900", "L":"#969696", "N":"#ffff00",
    "Q":"#ffff00", "R":"#ffff00" };

var layabley_zone3 = L.geoJson(null, {
  style: function (feature) {
      return {
        color: "#F56741",
        weight: 1,
        opacity: 1
      };
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Nom</th><td>" + feature.properties.NAME_12_14 + "<tr><th>ZONE</th><td>" + feature.properties.Zone_12_13 + "<tr><th>SECTEUR</th><td>" + feature.properties.secteur + "</td></tr>"  + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.Route);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");

        }
      });
    }
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        layabley_zone3.resetStyle(e.target);
      }
    });
  }
});
$.getJSON("data/layabley_zone3.geojson", function (data) {
  layabley_zone3.addData(data);
});

//Create a color dictionary based off of subway route_id
var subwayColors = {"1":"#ff3135", "2":"#ff3135", "3":"ff3135", "4":"#009b2e",
    "5":"#009b2e", "6":"#009b2e", "7":"#ce06cb", "A":"#fd9a00", "C":"#fd9a00",
    "E":"#fd9a00", "SI":"#fd9a00","H":"#fd9a00", "Air":"#ffff00", "B":"#ffff00",
    "D":"#ffff00", "F":"#ffff00", "M":"#ffff00", "G":"#9ace00", "FS":"#6e6e6e",
    "GS":"#6e6e6e", "J":"#976900", "Z":"#976900", "L":"#969696", "N":"#ffff00",
    "Q":"#ffff00", "R":"#ffff00" };

var warabley_zone1 = L.geoJson(null, {
  style: function (feature) {
      return {
        color: "#F56741",
        weight: 1,
        opacity: 1
      };
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Nom</th><td>" + feature.properties.NAME_12_14 + "<tr><th>ZONE</th><td>" + feature.properties.Zone_12_13 + "<tr><th>SECTEUR</th><td>" + feature.properties.secteur + "</td></tr>"  + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.Route);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");

        }
      });
    }
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        warabley_zone1.resetStyle(e.target);
      }
    });
  }
});
$.getJSON("data/warabley_zone1.geojson", function (data) {
  warabley_zone1.addData(data);
});

//Create a color dictionary based off of subway route_id
var subwayColors = {"1":"#ff3135", "2":"#ff3135", "3":"ff3135", "4":"#009b2e",
    "5":"#009b2e", "6":"#009b2e", "7":"#ce06cb", "A":"#fd9a00", "C":"#fd9a00",
    "E":"#fd9a00", "SI":"#fd9a00","H":"#fd9a00", "Air":"#ffff00", "B":"#ffff00",
    "D":"#ffff00", "F":"#ffff00", "M":"#ffff00", "G":"#9ace00", "FS":"#6e6e6e",
    "GS":"#6e6e6e", "J":"#976900", "Z":"#976900", "L":"#969696", "N":"#ffff00",
    "Q":"#ffff00", "R":"#ffff00" };

var warabley_zone2 = L.geoJson(null, {
  style: function (feature) {
      return {
        color: "#F56741",
        weight: 1,
        opacity: 1
      };
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Nom</th><td>" + feature.properties.NAME_12_14 + "<tr><th>ZONE</th><td>" + feature.properties.Zone_12_13 + "<tr><th>SECTEUR</th><td>" + feature.properties.secteur + "</td></tr>"  + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.Route);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");

        }
      });
    }
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        warabley_zone2.resetStyle(e.target);
      }
    });
  }
});
$.getJSON("data/warabley_zone2.geojson", function (data) {
  warabley_zone2.addData(data);
});




/* Single marker cluster layer to hold all clusters */
var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 16
});

/* Empty layer placeholder to add to layer control for listening when to add/remove poteau to markerClusters layer */
var poteauLayer = L.geoJson(null);
var poteau = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "marker.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.repondant,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>NOM</th><td>" + feature.properties.repondant + "</td></tr>" + "<tr><th>SEX</th><td>" + feature.properties.sexreponda + "</td></tr>" + "<tr><th>AGE</th><td>" + feature.properties.age + "</td></tr>" + "<tr><th>Nationalté</th><td>" + feature.properties.nationalit + "</td></tr>" + "</td></tr>"  + "<tr><th>Quartier</th><td>" + feature.properties.localite + "</td></tr>" + "</td></tr>" + "<tr><th>CNSS</th><td>" + feature.properties.cnss + "</td></tr>" + "</td></tr>" + "<tr><th>Type d'occupation</th><td>" + feature.properties.logement1 + "</td></tr>" + "</td></tr>"  + "<tr><th>Coupon alimentaire</th><td>" + feature.properties.aide1 + "</td></tr>" + "</td></tr>" + "<tr><th>Type de toilette</th><td>" + feature.properties.typetoilet + "</td></tr>" + "</td></tr>"   +"<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="marker.png"></td><td class="feature-name">' + layer.feature.properties.repondant + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      poteauSearch.push({
        name: layer.feature.properties.repondant,
        address: layer.feature.properties.localite,
        source: "poteau",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/", function (data) {
  poteau.addData(data);
  map.addLayer(poteauLayer);
});

/* Empty layer placeholder to add to layer control for listening when to add/remove compteur to markerClusters layer */
var compteurLayer = L.geoJson(null);
var compteur = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "marker.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.repondant,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
       var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>NOM</th><td>" + feature.properties.repondant + "</td></tr>" + "<tr><th>SEX</th><td>" + feature.properties.sexreponda + "</td></tr>" + "<tr><th>AGE</th><td>" + feature.properties.age + "</td></tr>" + "<tr><th>Nationalté</th><td>" + feature.properties.nationalit + "</td></tr>" + "</td></tr>"  + "<tr><th>Quartier</th><td>" + feature.properties.localite + "</td></tr>" + "</td></tr>" + "<tr><th>CNSS</th><td>" + feature.properties.cnss + "</td></tr>" + "</td></tr>" + "<tr><th>Type d'occupation</th><td>" + feature.properties.logement1 + "</td></tr>" + "</td></tr>"  + "<tr><th>Coupon alimentaire</th><td>" + feature.properties.aide1 + "</td></tr>" + "</td></tr>" + "<tr><th>Type de toilette</th><td>" + feature.properties.typetoilet + "</td></tr>" + "</td></tr>"   +"<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.repondant);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="marker.png"></td><td class="feature-name">' + layer.feature.properties.repondant + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      compteurSearch.push({
         name: layer.feature.properties.repondant,
        address: layer.feature.properties.localite,
        source: "compteur",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/", function (data) {
  compteur.addData(data);
});

/* Empty layer placeholder to add to layer control for listening when to add/remove compteur to markerClusters layer */
var zoneLayer = L.geoJson(null);
var zone = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "marker.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.repondant,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
       var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>NOM</th><td>" + feature.properties.repondant + "</td></tr>" + "<tr><th>SEX</th><td>" + feature.properties.sexreponda + "</td></tr>" + "<tr><th>AGE</th><td>" + feature.properties.age + "</td></tr>" + "<tr><th>Nationalté</th><td>" + feature.properties.nationalit + "</td></tr>" + "</td></tr>"  + "<tr><th>Quartier</th><td>" + feature.properties.localite + "</td></tr>" + "</td></tr>" + "<tr><th>CNSS</th><td>" + feature.properties.cnss + "</td></tr>" + "</td></tr>" + "<tr><th>Type d'occupation</th><td>" + feature.properties.logement1 + "</td></tr>" + "</td></tr>"  + "<tr><th>Coupon alimentaire</th><td>" + feature.properties.aide1 + "</td></tr>" + "</td></tr>" + "<tr><th>Type de toilette</th><td>" + feature.properties.typetoilet + "</td></tr>" + "</td></tr>"   +"<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.repondant);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="marker.png"></td><td class="feature-name">' + layer.feature.properties.repondant + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      zoneSearch.push({
         name: layer.feature.properties.repondant,
        address: layer.feature.properties.localite,
        source: "zone",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/", function (data) {
  zone.addData(data);
});


/* Empty layer placeholder to add to layer control for listening when to add/remove compteur to markerClusters layer */
var zone4Layer = L.geoJson(null);
var zone4 = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "marker.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.repondant,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
       var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>NOM</th><td>" + feature.properties.repondant + "</td></tr>" + "<tr><th>SEX</th><td>" + feature.properties.sexrepondant + "</td></tr>" + "<tr><th>AGE</th><td>" + feature.properties.age + "</td></tr>" + "<tr><th>Nationalté</th><td>" + feature.properties.nationalite + "</td></tr>" + "</td></tr>"  + "<tr><th>Quartier</th><td>" + feature.properties.localite + "</td></tr>" + "</td></tr>" + "<tr><th>CNSS</th><td>" + feature.properties.cnss + "</td></tr>" + "</td></tr>" + "<tr><th>Type d'occupation</th><td>" + feature.properties.logement1 + "</td></tr>" + "</td></tr>"  + "<tr><th>Coupon alimentaire</th><td>" + feature.properties.aide1 + "</td></tr>" + "</td></tr>" + "<tr><th>Type de toilette</th><td>" + feature.properties.typetoilette + "</td></tr>" + "</td></tr>" + "<tr><th>Numero de téléphone</th><td>" + feature.properties.telephon1 + "</td></tr>" + "</td></tr>" + '<img src="'+ feature.properties.photo+'"style ="width:300px;height:300px;">'  +"<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.repondant);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="marker.png"></td><td class="feature-name">' + layer.feature.properties.repondant + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      zone4Search.push({
         name: layer.feature.properties.repondant,
        address: layer.feature.properties.localite,
        source: "zone4",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/", function (data) {
  zone4.addData(data);
});



map = L.map("map", {
  zoom: 13,
  center: [11.5806, 43.1457],
  layers: [osmLayer, boroughs, markerClusters, highlight],
  zoomControl: false,
  attributionControl: false
});

/* Layer control listeners that allow for a single markerClusters layer */
map.on("overlayadd", function(e) {
  if (e.layer === poteauLayer) {
    markerClusters.addLayer(poteau);
    syncSidebar();
  }
  if (e.layer === compteurLayer) {
    markerClusters.addLayer(compteur);
    syncSidebar();
  }
   if (e.layer === zoneLayer) {
    markerClusters.addLayer(zone);
    syncSidebar();
  }
 if (e.layer === zone4Layer) {
    markerClusters.addLayer(zone4);
    syncSidebar();
  }

});

map.on("overlayremove", function(e) {
  if (e.layer === poteauLayer) {
    markerClusters.removeLayer(poteau);
    syncSidebar();
  }
  if (e.layer === compteurLayer) {
    markerClusters.removeLayer(compteur);
    syncSidebar();
  }
  if (e.layer === zoneLayer) {
    markerClusters.removeLayer(zone);
    syncSidebar();
  }
  if (e.layer === zone4Layer) {
    markerClusters.removeLayer(zone4);
    syncSidebar();
  }
});

/* Filter sidebar feature list to only show features in current map bounds */
map.on("moveend", function (e) {
  syncSidebar();
});

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
  highlight.clearLayers();
});

/* Attribution control */
function updateAttribution(e) {
  $.each(map._layers, function(index, layer) {
    if (layer.getAttribution) {
      $("#attribution").html((layer.getAttribution()));
    }
  });
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<span class='hidden-xs'>Développé Farhan Atteyeh | </span>";
  return div;
};
map.addControl(attributionControl);

var zoomControl = L.control.zoom({
  position: "bottomright"
}).addTo(map);

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "bottomright",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "fa fa-location-arrow",
  metric: false,
  strings: {
    title: "My location",
    popup: "You are within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = true;
}

var baseLayers = {
  "Plan": osmLayer,
  "Satellite": Satellite
};

var groupedOverlays = {
  "  Points d’intérêt ": {


  },
  "Reference": {
    "Zone d'etude": boroughs,
     "Route secondaire Boulaos": subwayLines,
     "Route principal Boulaos": hayabley_zone2,
     "Route secondaire Rasdika": hayabley_zone3,
     "Route principal Rasdika": dogley_zone1

  }
};

var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
  collapsed: isCollapsed
}).addTo(map);

/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

/* Prevent hitting enter from refreshing the page */
$("#searchbox").keypress(function (e) {
  if (e.which == 13) {
    e.preventDefault();
  }
});

$("#featureModal").on("hidden.bs.modal", function (e) {
  $(document).on("mouseout", ".feature-row", clearHighlight);
});

/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  sizeLayerControl();
  /* Fit map to boroughs bounds */
  map.fitBounds(boroughs.getBounds());
  featureList = new List("features", {valueNames: ["feature-name"]});
  featureList.sort("feature-name", {order:"asc"});

  var boroughsBH = new Bloodhound({
    name: "Boroughs",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: boroughSearch,
    limit: 10
  });

  var poteauBH = new Bloodhound({
    name: "poteau",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: poteauSearch,
    limit: 10
  });

  var compteurBH = new Bloodhound({
    name: "compteur",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: compteurSearch,
    limit: 10
  });
    var zoneBH = new Bloodhound({
    name: "zone",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: zoneSearch,
    limit: 10
  });

var zone4BH = new Bloodhound({
    name: "zone4",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: zone4Search,
    limit: 10
  });


  var geonamesBH = new Bloodhound({
    name: "GeoNames",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
      filter: function (data) {
        return $.map(data.geonames, function (result) {
          return {
            name: result.name + ", " + result.adminCode1,
            lat: result.lat,
            lng: result.lng,
            source: "GeoNames"
          };
        });
      },
      ajax: {
        beforeSend: function (jqXhr, settings) {
          settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
          $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
        },
        complete: function (jqXHR, status) {
          $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
        }
      }
    },
    limit: 10
  });
  boroughsBH.initialize();
  poteauBH.initialize();
  compteurBH.initialize();
  zoneBH.initialize();
  zone4BH.initialize();
  geonamesBH.initialize();

  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, {
    name: "Boroughs",
    displayKey: "name",
    source: boroughsBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;QUARTIER</h4>"

    }
  }, {
    name: "poteau",
    displayKey: "name",
    source: poteauBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='logo.jpg' width='35' height='30'>&nbsp;ENQUETE zone 1</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "compteur",
    displayKey: "name",
    source: compteurBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='logo.jpg' width='35' height='30'>&nbsp; Enquete zone 2</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  },{
    name: "zone",
    displayKey: "name",
    source: zoneBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='logo.jpg' width='35' height='30'>&nbsp; Enquete zone 3</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  },{
    name: "zone4",
    displayKey: "name",
    source: zone4BH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='logo.jpg' width='35' height='30'>&nbsp; Enquete zone 4</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  },{
    name: "GeoNames",
    displayKey: "name",
    source: geonamesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;Géocodage</h4>"
    }
  }).on("typeahead:selected", function (obj, datum) {
    if (datum.source === "Boroughs") {
      map.fitBounds(datum.bounds);
    }
    if (datum.source === "poteau") {
      if (!map.hasLayer(poteauLayer)) {
        map.addLayer(poteauLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "compteur") {
      if (!map.hasLayer(compteurLayer)) {
        map.addLayer(compteurLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
 if (datum.source === "zone") {
      if (!map.hasLayer(zoneLayer)) {
        map.addLayer(zoneLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }

 if (datum.source === "zone4") {
      if (!map.hasLayer(zone4Layer)) {
        map.addLayer(zone4Layer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }

    if (datum.source === "GeoNames") {
      map.setView([datum.lat, datum.lng], 14);
    }
    if ($(".navbar-collapse").height() > 50) {
      $(".navbar-collapse").collapse("hide");
    }
  }).on("typeahead:opened", function () {
    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
  }).on("typeahead:closed", function () {
    $(".navbar-collapse.in").css("max-height", "");
    $(".navbar-collapse.in").css("height", "");
  });
  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");
});

// Leaflet patch to make layer control scrollable on touch browsers
var container = $(".leaflet-control-layers")[0];
if (!L.Browser.touch) {
  L.DomEvent
  .disableClickPropagation(container)
  .disableScrollPropagation(container);
} else {
  L.DomEvent.disableClickPropagation(container);
}
