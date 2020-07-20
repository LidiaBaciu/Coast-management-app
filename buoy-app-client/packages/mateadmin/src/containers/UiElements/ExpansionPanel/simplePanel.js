import React from 'react';
import PropTypes from 'prop-types';
import Typography from '../../../components/uielements/typography/index.js';
import Icon from '../../../components/uielements/icon/index.js';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '../../../components/uielements/expansionPanel';

function SimpleExpansionPanel() {
  return (
    <div style={{ width: '100%' }}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
          <Typography>What is a buoy</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            A buoy is a floating device that can have many purposes. It can be anchored or allowed to drift with ocean currents.
          </Typography>
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
