          var uluru = {
              lat: -25.363,
              lng: 131.044
          };
          var markers = [];

var initialLocations = [
    {
                  lat: -16.8804789,
                  lng: 145.5768562,
                  info: "Cairns, Queensland",
                  id : "1"
              },
              {
                  lat: -20.1860205,
                  lng: 148.4466541,
                  info: "The Whitsundays, Queensland",
                                    id : "1"

              },
              {
                  lat: -25.2461523,
                  lng: 152.5909349,
                  info: "Fraser Island, Queensland",
                                    id : "2"

              },
              {
                  lat: -26.4001193,
                  lng: 153.078467,
                  info: "Noosa Heads, Queensland",
                                    id : "3"

              },
              {
                  lat: -27.5735727,
                  lng: 151.8568419,
                  info: "Toowoomba, Queensland",
                                    id : "4"

              },
              {
                  lat: -29.4337257,
                  lng: 153.3245816,
                  info: " Yamba, New South Wales",
                                    id : "5"

              },
              {
                  lat: -31.5543097,
                  lng: 159.0361234,
                  info: "Lord Howe Island, New South Wales",
                                    id : "6"

              },
              {
                  lat: -33.7097844,
                  lng: 150.3038632,
                  info: "Leura, New South Wales",
                                    id : "7"

              },
              {
                  lat: -33.847927,
                  lng: 150.6517805,
                  info: "Sydney, New South Wales",
                                    id : "8"

              },
              {
                  lat: -34.6711099,
                  lng: 150.8116032,
                  info: "Kiama, New South Wales",
                                    id : "9"

              },
              {
                  lat: -35.0360936,
                  lng: 150.6321875,
                  info: "Huskisson, New South Wales",
                                    id : "10"

              },
              {
                  lat: -36.702585,
                  lng: 146.961849,
                  info: "Bright, Victoria",
                                    id : "11"

              },
              {
                  lat: -38.3309285,
                  lng: 144.676316,
                  info: "Mornington Peninsula, Victoria",
                                    id : "12"

              },
              {
                  lat: -36.7561786,
                  lng: 144.2626423,
                  info: "Bendigo, Victoria",
                                    id : "13"

              },
              {
                  lat: -38.1481387,
                  lng: 144.3453713,
                  info: "Geelong, Victoria",
                                    id : "14"

              },
              {
                  lat: -37.826317,
                  lng: 140.7456247,
                  info: "Mount Gambier, South Australia",
                                    id : "15"

              },
              {
                  lat: -35.9313167,
                  lng: 139.4527674,
                  info: "Coorong, South Australia",
                                    id : "16"

              },
              {
                  lat: -36.1044201,
                  lng: 138.8220108,
                  info: "Launceston, Tasmania",
                                    id : "17"

              },
              {
                  lat: -42.4774711,
                  lng: 147.2660684,
                  info: "Wineglass Bay, Tasmania",
                                    id : "18"

              },
              {
                  lat: -33.8612197,
                  lng: 121.8829606,
                  info: "Esperance, Western Australia",
                                    id : "19"

              },
              {
                  lat: -35.0280667,
                  lng: 117.8754271,
                  info: "Albany, Western Australia",
                                    id : "20"

              },
              {
                  lat: -32.0069946,
                  lng: 115.4689695,
                  info: "Broome, Western Australia",
                                    id : "21"

              },
              {
                  lat: -12.4258916,
                  lng: 130.8632674,
                  info: "Darwin, Northern Territory",
                                    id : "22"

              },
              {
                  lat: -14.2016824,
                  lng: 132.3189422,
                  info: "Wineglass Bay, Tasmania",
                                    id : "23"

              },
              {
                lat: -14.2013496,
                lng: 132.3189414,
                info: "Katherine Gorge, Northern Territory",
                                  id : "24"

              }


];
var map;
var clientID;
var clientSecret;
var Location = function(data) {
    var self = this;
    self.info = data.info;
    self.lat = data.lat;
    self.lng = data.lng;
    self.id = data.id;
    self.street = "";
    self.city = "";
    self.visible = ko.observable(true);
    self.contentString = '<div class="info-window-content"><div class="title"><b>' + data.info + "</b></div>";
    self.infoWindow = new google.maps.InfoWindow({
        content: self.contentString
    });
    markers.push(self);
    self.marker = new google.maps.Marker({
        position: new google.maps.LatLng(data.lat, data.lng),
        map: map,
        title: data.info,
        id : data.id

    });
    self.showMarker = ko.computed(function() {
        if (self.visible() === true) {
            self.marker.setMap(map);
        } else {
            self.marker.setMap(null);
        }
        return true;
    }, self);
    self.marker.addListener('click', function() {

        self.infoWindow.setContent(self.contentString);

        self.infoWindow.open(map, this);

        self.marker.setAnimation(google.maps.Animation.DROP);
        setTimeout(function() {
            self.marker.setAnimation(null);
        }, 2100);
    });
    self.bounce = function(place) {
        google.maps.event.trigger(self.marker, 'click');
    };
};

function AppViewModel() {
  var styles = [{
              featureType: "water",
              stylers: [{
                  color: "#19A0D8"
              }]
          }, {
              featureType: "adminstrative",
              elementType: "labels.text.stroke",
              stylers: [{
                      color: "#000000"
                  },
                  {
                      weight: 6
                  }
              ]
          }];
    var self = this;

    self.searchTerm = ko.observable("");

    self.locationList = ko.observableArray([]);

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
         styles: styles,
              center: uluru,
              mapTypeControl: false
    });
    initialLocations.forEach(function(locationItem) {
        self.locationList.push(new Location(locationItem));
    });
    self.filteredList = ko.computed(function() {
        var filter = self.searchTerm().toLowerCase();
        if (!filter) {
            self.locationList().forEach(function(locationItem) {
                locationItem.visible(true);
            });
            return self.locationList();
        } else {
            return ko.utils.arrayFilter(self.locationList(), function(locationItem) {
                var string = locationItem.info.toLowerCase();
                var result = (string.search(filter) >= 0);
                locationItem.visible(result);
                return result;
            });
        }
    }, self);
}

function startApp() {
    ko.applyBindings(new AppViewModel());
}

function errorHandling() {
    alert("Google Maps has failed to load. Please check your internet connection and try again.");
}





      function openNav() {
          document.getElementById("mySidenav").style.width = "25%";
          document.getElementById("map").style.width = "75%";
          document.getElementById("map").style.marginLeft = "25%";
      }

      function closeNav() {
          document.getElementById("mySidenav").style.width = "0%";
          document.getElementById("map").style.width = "100%";
          document.getElementById("map").style.marginLeft = "0%";

      }
function error(){
  alert("google map can't load")
}
