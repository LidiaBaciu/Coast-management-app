import React from 'react';
import Typography from '../../../components/uielements/typography/index.js';
import Icon from '../../../components/uielements/icon/index.js';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '../../../components/uielements/expansionPanel';
import BuoyImage from '../../../images/buoy.jpg'
import IntlMessages from '../../../components/utility/intlMessages';

function SimpleExpansionPanel() {
  return (
    <div style={{ width: '100%' }}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
          <Typography>{<IntlMessages id="simplePanel.whatIsABuoy" />}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          {<IntlMessages id="simplePanel.buoyDefinition" />}
            <ul>
              <li>{<IntlMessages id="buoy.navigational" />}</li>
              <li>{<IntlMessages id="buoy.marker" />}</li>
              <li>{<IntlMessages id="buoy.diving" />}</li>
              <li>{<IntlMessages id="buoy.rescued" />}</li>
              <li><b>{<IntlMessages id="buoy.research" />}</b></li>
              <li>{<IntlMessages id="buoy.military" />}</li>
            </ul>
          </Typography>
          <center><img src={BuoyImage} alt=""/></center>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
          <Typography>{<IntlMessages id="simplePanel.usage" />}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          {<IntlMessages id="usage.description" />}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
          <Typography>{<IntlMessages id="simplePanel.functionality" />}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          {<IntlMessages id="functionality.description" />}
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
