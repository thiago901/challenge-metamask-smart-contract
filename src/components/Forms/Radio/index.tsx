/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio as RadioMaterial,
  RadioGroup,
} from '@mui/material';
import { useField } from '@unform/core';

import { Container } from './styles';

interface ISelectRadio {
  value: string;
  label: string;
}
interface IRadio {
  name: string;
  title: string;
  items: ISelectRadio[];
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & IRadio;

export function Radio({ name, title, items, defaultValue }: InputProps) {
  const { fieldName, registerField } = useField(name);

  const [itemSelect, setItemSelect] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: itemSelect,
      getValue: () => {
        return itemSelect;
      },
      clearValue: () => {
        setItemSelect('');
      },
    });
  }, [fieldName, registerField, itemSelect]);

  return (
    <Container>
      <FormControl component="fieldset">
        <FormLabel component="legend">{title}</FormLabel>
        <RadioGroup aria-label="gender" name="radio-buttons-group">
          {items.map(item => (
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={<RadioMaterial />}
              label={item.label}
              onChange={(e: any) => setItemSelect(e.target.value)}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Container>
  );
}
