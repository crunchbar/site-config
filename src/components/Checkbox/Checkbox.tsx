import React from 'react';
import { Checkbox as MUICheckbox, FormControlLabel} from '@material-ui/core';

export interface ICheckbox {
  checked: boolean;
  label?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export const Checkbox: React.FC<ICheckbox> = ({
  checked,
  label = 'Enabled',
  onChange,
}) => (
  <FormControlLabel
    control={
      <MUICheckbox
        checked={checked}
        onChange={onChange}
        value={label}
        color="primary"
      />
    }
    label={label}
  />
);
