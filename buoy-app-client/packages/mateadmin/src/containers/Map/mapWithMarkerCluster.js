import React, { Component } from 'react';
import 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import customBuoyIcon from '../../images/buoy.png';
import customBeachIcon from '../../images/beach.png';
import { mapboxConfig } from '../../settings';

import axios from 'axios';

class LMap extends Component {
  constructor(props) {
    super(props);
    this.mountMap = this.mountMap.bind(this);
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

    let webApiUrl = 'http://localhost:8080/api/home/map';
    axios.get(webApiUrl)
      .then(response => {
        var json = response.data;

        json.buoySummaryList.forEach((element, index, array) => {
          var position = [];
          position.push(element.latitude);
          position.push(element.longitude);
          var popupText = `
        <div >
          <center><h3>Id of the buoy is: ${element.id}</h3>
          <p>Latest temperature is: ${element.latestTemperature}</p></center>
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
    
        json.beachSummaryList.forEach((element, index, array) => {
          var position = [];
          position.push(element.latitude);
          position.push(element.longitude);
          var popupText = `
          <div className="infoWindowImage">
            <img src=${element.photoUri} alt="" height="60" width="60"/>
          </div>
          <div className="infoWindowDetails">
            <h3>${element.name}</h3>
            <a href="http://localhost:3000/dashboard/beaches-list/beach/${element.id}">See more details</a>
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
