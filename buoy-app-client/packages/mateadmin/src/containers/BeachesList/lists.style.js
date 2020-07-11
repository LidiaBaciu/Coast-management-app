import styled from 'styled-components';
import { palette } from 'styled-theme';
import Icons from '../../components/uielements/icon';
import {
  FormGroup as FormGroups,
  FormControl as FormControls,
  FormControlLabel as FormControlLabels,
} from '../../components/uielements/form/';
import Inputs, {
  InputLabel as InputLabels,
  InputAdornment as InputAdornments,
} from '../../components/uielements/input';
import InputSearches from '../../components/uielements/inputSearch';

const Icon = styled(Icons)`
  font-size: 23px;
  color: ${palette('grey', 7)};
`;

const Root = styled.div`
  width: 100%;
  background: #fff;
  position: relative;
  overflow: auto;
  max-height: 300px;
  flex-grow: 1;
  max-width: 752px;
`;

const InputLabel = styled(InputLabels)`
  &.inputLabelFocused {
    color: ${palette('purple', 5)};
    border-color: ${palette('purple', 5)};
  }
`;

const InputSearch = styled(InputSearches)`
  width: 100%;
  margin-bottom: 10px;
`;

const Input = styled(Inputs)`
  margin: 8px;
`;

const FormControl = styled(FormControls)`
  margin: 8px;

  .withoutLabel {
    margin-top: 24px;
  }

  .inputInkbar {
    &:after {
      background-color: ${palette('purple', 5)};
    }
  }
`;

const FormControlLabel = styled(FormControlLabels)``;

const FormGroup = styled(FormGroups)`padding: 20px;`;

export { Root, Icon, FormGroup, FormControlLabel, InputLabel, Input, FormControl, InputSearch };
