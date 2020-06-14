import React, { Component } from 'react';
import 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import customBuoyIcon from '../../../images/buoy.png';
import customBeachIcon from '../../../images/beach.png';
import { mapboxConfig } from '../../../settings';

import axios from 'axios';

class LMap extends Component {
  constructor(props) {
    super(props);
    this.mountMap = this.mountMap.bind(this);
  }

  handleOnClick(id) {
    console.log('the id is:', id);
  }

  mountMap(element) {
    if (!element) return;
    const { L } = window;
    const map = L.map(element).setView(
      mapboxConfig.center,
      !isNaN(mapboxConfig.defaultZoom) ? mapboxConfig.defaultZoom : 2
    );

    const osmAttr =
      '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    L.tileLayer(mapboxConfig.tileLayer, {
      maxZoom: !isNaN(mapboxConfig.maxZoom) ? mapboxConfig.maxZoom : 2,
      attribution: osmAttr,
    }).addTo(map);

    let markers = L.markerClusterGroup();

    let webApiUrl = 'http://localhost:8080/api/buoys';
    let tokenStr = JSON.parse(localStorage.getItem('token'));
    axios
      .get(webApiUrl, { headers: { Authorization: `Bearer ${tokenStr}` } })
      .then(response => {
        var json = response.data;
        console.log(json);
        json.forEach((element, index, array) => {
          var position = [];
          position.push(element.latitude);
          position.push(element.longitude);
          var popupText = `
        <div >
          <center><h3>Id of the buoy is: ${element.id}</h3></center>
        </div>`;
          var customIcon = L.icon({
            iconUrl: customBuoyIcon,
            iconSize: [40, 40], // size of the icon
            popupAnchor: [0, -20], // point from which the popup should open relative to the iconAnchor
          });
          return markers.addLayer(
            L.marker(position, { icon: customIcon })
              .bindPopup(popupText)
              .openPopup()
          );
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    let webApiUrlBeaches = 'http://localhost:8080/api/beaches';
    axios
      .get(webApiUrlBeaches, { headers: { Authorization: `Bearer ${tokenStr}` } })
      .then(response => {
        var json = response.data;
        console.log(json);
        json.forEach((element, index, array) => {
          var position = [];
          position.push(element.latitude);
          position.push(element.longitude);
          var popupText = `
          <div >
            <center><h3>Id of the beach is: ${element.id}</h3></center>
          </div>`;
          var customIcon = L.icon({
            iconUrl: customBeachIcon,
            iconSize: [40, 40], // size of the icon
            popupAnchor: [0, -20], // point from which the popup should open relative to the iconAnchor
          });
          return markers.addLayer(
            L.marker(position, { icon: customIcon })
            .bindPopup(popupText)
              .openPopup()
          );
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    map.addLayer(markers);
  }

  render() {
    return (
      <div
        id="basic-map-marker"
        style={{ height: '400px', width: '100%' }}
        ref={this.mountMap}
      />
    );
  }
}

export default LMap;
