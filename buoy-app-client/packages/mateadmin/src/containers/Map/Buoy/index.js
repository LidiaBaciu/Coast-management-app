import React, { Component } from "react";
import Async from "../../../helpers/asyncComponent";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import { FullColumn } from "../../../components/utility/rowColumn";
import Box from "../../../components/utility/papersheet";

const BasicLeafletMap = props => (
  <Async
    load={import(/* webpackChunkName: "basicLeafletMap" */ "../mapWithCustomIconMarkerBuoys.js")}
    componentProps={props}
    componentArguement={"leafletMap"}
  />
);

export default class extends Component {
  render() {
    return (
      <LayoutWrapper>
          <FullColumn>
            <Box title="Buoys Map">
              <BasicLeafletMap />
            </Box>
          </FullColumn>
        {/** 
        <Row>
          <HalfColumn>
            <Box title="Basic Custom Html Marker">
              <LeafletMapWithCustomHtmlMarker />
            </Box>
          </HalfColumn>
          <HalfColumn>
            <Box title="Basic Icon Marker">
              <LeafletMapWithCustomIconMarker />
            </Box>
          </HalfColumn>
        </Row>
        <Row>
          <HalfColumn>
            <Box title="Basic Map With Marker Cluster">
              <LeafletMapWithMarkerCluster />
            </Box>
          </HalfColumn>
          <HalfColumn>
            <Box title="Basic Map Routing">
              <LeafletMapWithRouting />
            </Box>
          </HalfColumn>
        </Row>
        */}
      </LayoutWrapper>
    );
  }
}
