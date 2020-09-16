import React, { Component } from "react";
import Async from "../../../helpers/asyncComponent";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import { Row, FullColumn } from "../../../components/utility/rowColumn";
import Box from "../../../components/utility/papersheet";

const BasicLeafletMapBeach = props => (
  <Async
    load={import(/* webpackChunkName: "basicLeafletMap" */ "../mapWithCustomIconMarker.js")}
    componentProps={props}
    componentArguement={"leafletMap"}
  />
);

export default class extends Component {
  render() {
    return (
      <LayoutWrapper>
        <Row>
          <FullColumn>
            <Box title="Beaches map">
              <BasicLeafletMapBeach />
            </Box>
          </FullColumn>
        </Row>
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
