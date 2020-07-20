import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import { Row, FullColumn } from '../../components/utility/rowColumn';
import Papersheet from '../../components/utility/papersheet';
import BeachesMap from './Beach';
import BuoysMap from './Buoy';

const NavContainer = props => {
  return (
    <div style={{ position: 'relative', width: '100%' }}>{props.children}</div>
  );
};
export default class index extends Component {
  render() {
    const { url } = this.props.match;
    return (
      <LayoutWrapper>
        <Papersheet>
          <Row>
            <FullColumn>
              <NavLink
                to="beachesmap"
                className={url !== '/dashboard/buoysmap' ? 'active' : ''}
                style={{ display: 'block' }}
              >
                Beach Map
              </NavLink>
              <NavLink
                to="buoysmap"
                className={url === '/dashboard/buoysmap' ? 'active' : ''}
                style={{ display: 'block' }}
              >
                Buoy Map
              </NavLink>
            </FullColumn>
          </Row>
        </Papersheet>

        <NavContainer>
          <Row>
            <FullColumn>
              {url !== '/dashboard/beachesmap' ? <BeachesMap /> : <BuoysMap />}
            </FullColumn>
          </Row>
        </NavContainer>
      </LayoutWrapper>
    );
  }
}
