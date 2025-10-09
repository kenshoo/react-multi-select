import React from 'react';
import { action } from '@storybook/addon-actions';
import ReactMultiSelect from '@kenshooui/react-multi-select';

export default {
  title: 'React Multi Select',
  component: ReactMultiSelect,
};

export const Core = () => <ReactMultiSelect onClick={action('clicked')}>Hello Button</ReactMultiSelect>;

