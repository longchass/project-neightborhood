      var HTMLtitle = '<li id="%name%"><button onclick="popup()">%data%</button></li>';
      var markers = [];

      function populateInfoWindow(marker, infowindow) {
          if (infowindow.marker != marker) {
              infowindow.marker = marker;
              infowindow.setContent("<div>" + marker.title + "</div>");
              infowindow.open(map, marker);
              infowindow.addListener("closeclick", function() {
                  infowindow.setMarker(null);
              });
          }
      }

      function initMap() {
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
          var uluru = {
              lat: -25.363,
              lng: 131.044
          };
          var map = new google.maps.Map(document.getElementById("map"), {
              zoom: 4,
              styles: styles,
              center: uluru,
              mapTypeControl: false
          });
          var placesAu = [{
                  lat: -16.8804789,
                  lng: 145.5768562,
                  info: "Cairns, Queensland"
              },
              {
                  lat: -20.1860205,
                  lng: 148.4466541,
                  info: "The Whitsundays, Queensland"
              },
              {
                  lat: -25.2461523,
                  lng: 152.5909349,
                  info: "Fraser Island, Queensland"
              },
              {
                  lat: -26.4001193,
                  lng: 153.078467,
                  info: "Noosa Heads, Queensland"
              },
              {
                  lat: -27.5735727,
                  lng: 151.8568419,
                  info: "Toowoomba, Queensland"
              },
              {
                  lat: -29.4337257,
                  lng: 153.3245816,
                  info: " Yamba, New South Wales"
              },
              {
                  lat: -31.5543097,
                  lng: 159.0361234,
                  info: "Lord Howe Island, New South Wales"
              },
              {
                  lat: -33.7097844,
                  lng: 150.3038632,
                  info: "Leura, New South Wales"
              },
              {
                  lat: -33.847927,
                  lng: 150.6517805,
                  info: "Sydney, New South Wales"
              },
              {
                  lat: -34.6711099,
                  lng: 150.8116032,
                  info: "Kiama, New South Wales"
              },
              {
                  lat: -35.0360936,
                  lng: 150.6321875,
                  info: "Huskisson, New South Wales"
              },
              {
                  lat: -36.702585,
                  lng: 146.961849,
                  info: "Bright, Victoria"
              },
              {
                  lat: -38.3309285,
                  lng: 144.676316,
                  info: "Mornington Peninsula, Victoria"
              },
              {
                  lat: -36.7561786,
                  lng: 144.2626423,
                  info: "Bendigo, Victoria"
              },
              {
                  lat: -38.1481387,
                  lng: 144.3453713,
                  info: "Geelong, Victoria"
              },
              {
                  lat: -37.826317,
                  lng: 140.7456247,
                  info: "Mount Gambier, South Australia"
              },
              {
                  lat: -35.9313167,
                  lng: 139.4527674,
                  info: "Coorong, South Australia"
              },
              {
                  lat: -36.1044201,
                  lng: 138.8220108,
                  info: "Launceston, Tasmania"
              },
              {
                  lat: -42.4774711,
                  lng: 147.2660684,
                  info: "Wineglass Bay, Tasmania"
              },
              {
                  lat: -33.8612197,
                  lng: 121.8829606,
                  info: "Esperance, Western Australia"
              },
              {
                  lat: -35.0280667,
                  lng: 117.8754271,
                  info: "Albany, Western Australia"
              },
              {
                  lat: -32.0069946,
                  lng: 115.4689695,
                  info: "Broome, Western Australia"
              },
              {
                  lat: -12.4258916,
                  lng: 130.8632674,
                  info: "Darwin, Northern Territory"
              },
              {
                  lat: -14.2016824,
                  lng: 132.3189422,
                  info: "Wineglass Bay, Tasmania"
              },



          ]
          for (var i = 0; i < placesAu.length; i++) {

              var titlename = HTMLtitle.replace("%data%", placesAu[i].info)
              var list = document.getElementById("map")
              var id = HTMLtitle.replace("%name%", "div"+i)
              var infowindow = new google.maps.InfoWindow({
                  content: placesAu[i].info
              });
              var marker = new google.maps.Marker({
                  position: placesAu[i],
                  map: map,
                  title: placesAu[i].info,
                  animation: google.maps.Animation.DROP,
                  id: i
              });
              marker.addListener("click", function() {
                  populateInfoWindow(this, infowindow);
              });
              markers.push(marker);
              $("#list").append(titlename);
          }

          function showListing() {
              var bounds = new google.maps.LatLngBounds();
              for (var i = 0; i < markers.length; i++) {
                  markers[i].setMap(map);
                  bounds.extend(markers[i].position);
              }
              map.fitBounds(bounds);
          }

          function hideListing() {
              for (var i = 0; i < markers.length; i++) {
                  markers[i].setMap(null);
              }
          }
          document.getElementById("show-listing").addEventListener("click", showListing);
          document.getElementById("hide-listing").addEventListener("click", hideListing);
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

      function myFunction() {
          var input, filter, ul, li, a, i;
          input = document.getElementById("myInput");
          filter = input.value.toUpperCase();
          ul = document.getElementById("list");
          li = ul.getElementsByTagName("li");
          for (i = 0; i < li.length; i++) {
              a = li[i].getElementsByTagName("button")[0];
              if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                  li[i].style.display = "";
              } else {
                  li[i].style.display = "none";

              }
          }
      }
function error(){
  alert("google map can't load")
}