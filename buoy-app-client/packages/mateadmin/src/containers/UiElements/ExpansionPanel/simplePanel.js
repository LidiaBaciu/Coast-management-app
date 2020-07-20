import React from 'react';
import PropTypes from 'prop-types';
import Typography from '../../../components/uielements/typography/index.js';
import Icon from '../../../components/uielements/icon/index.js';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '../../../components/uielements/expansionPanel';
import BuoyImage from '../../../images/buoy.jpg'

function SimpleExpansionPanel() {
  return (
    <div style={{ width: '100%' }}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
          <Typography>What is a buoy</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            A buoy is a floating device that can have many purposes. It can be anchored or allowed to drift with ocean currents. They can be of multiple types, of which:
            <ul>
              <li>Navigational</li>
              <li>Marker: are often used to mark the position of an underwater object. They may be temporary or permanent.</li>
              <li>Diving: for example, taken on dives by scuba divers to mark their position underwater</li>
              <li>Rescue: used as a life saving buoy designed to be thrown to a person in the water to provide buoyancy. Usually has a connecting line allowing the casualty to be pulled to the rescuer</li>
              <li><b>Research</b></li>
              <li>Military</li>
            </ul>
          </Typography>
          <center><img src={BuoyImage}/></center>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
          <Typography>How we decided to use them</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          We have though about using a buoy as emmiters to find out more details about the quality of the water near the beaches 
            or where fisher men usually spend their time.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
          <Typography>How they work</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          We equiped each buoy with some sensors (e.g.: temperature, pH, conductivity, speed) and GPS emmiter. Once per hour they send their sensors value to our database and 
          we share the data with you, hoping to be helpful.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {/*<ExpansionPanel disabled>
        <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
          <Typography>Disabled Expansion Panel</Typography>
        </ExpansionPanelSummary>
      </ExpansionPanel>
      */}
    </div>
  );
}

/*
SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};
*/

export default SimpleExpansionPanel;
