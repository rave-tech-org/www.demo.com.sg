import React, { ComponentType } from 'react';
import { Stack } from '@sanity/ui';
import { NavbarProps } from 'sanity';

const CustomNavBar: ComponentType<NavbarProps> = (props) => {
  return (
    <Stack>
      <>{props.renderDefault(props)}</>
    </Stack>
  );
};

export default CustomNavBar;
