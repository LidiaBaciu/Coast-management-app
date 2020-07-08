import React, { Component } from 'react';
import 'leaflet';
import { mapboxConfig } from '../../settings';
import customBuoyIcon from '../../images/buoy.png';
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
      !isNaN(mapboxConfig.defaultZoom) ? mapboxConfig.defaultZoom : 13
    );
    const osmAttr =
      '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

    L.tileLayer(mapboxConfig.tileLayer, {
      maxZoom: !isNaN(mapboxConfig.maxZoom) ? mapboxConfig.maxZoom : 18,
      attribution: osmAttr
    }).addTo(map);

    let webApiUrl = 'http://localhost:8080/api/home/map';
    axios.get(webApiUrl)
      .then(response => {
        var json = response.data;

        json.buoySummaryList.map(element => {
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
          return L.marker(position, { icon: customIcon })
            .addTo(map)
            .bindPopup(popupText);
        });
      });
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
