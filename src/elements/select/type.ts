import { ReactNode } from 'react';

export interface OptionItem {
  label: string;
  value: string;
  icon?: ReactNode;
  onClickItem?: () => void;
}

export interface SelectProps {
  items: OptionItem[];
  onChange?: (item: OptionItem) => void;
  label?: ReactNode;
  isSelect?: boolean;
  panelClassName?: string;
  controlClassName?: string;
}
