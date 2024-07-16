import React from 'react';
import { TextField } from '@mui/material';
import { NumericFormat } from 'react-number-format';

const PriceInput = ({ value, onChange, error, helperText }) => {
  return (
    <NumericFormat
      value={value}
      onValueChange={(values) => {
        onChange({
          target: {
            name: 'price',
            value: values.floatValue || 0,
          },
        });
      }}
      customInput={TextField}
      margin="dense"
      label="Preço"
      fullWidth
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$ "
      error={!!error}
      helperText={helperText}
    />
  );
};

export default PriceInput;
