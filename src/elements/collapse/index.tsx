'use client';

import { animated, config, useSpring } from '@react-spring/web';
import { useState } from 'react';
import useMeasure from 'react-use-measure';
import { DropdownArrow } from '../icons/dropdown-arrow';
import { CollapseProps } from './type';

export default function Collapse({ children, controlLabel = 'Expand' }: CollapseProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [measureRef, { height }] = useMeasure();

  const styles = useSpring({
    config: config.stiff,
    from: { height: 0 },
    to: { height: isOpen ? height : 0 },
  });

  return (
    <div id="generic-collapse-container">
      <button type="button" onClick={() => setIsOpen((prev) => !prev)} className="generic-collapse-control">
        {controlLabel}
        <DropdownArrow className={`rotate-element ${isOpen ? 'on' : ''}`} />
      </button>

      <animated.div style={{ overflow: 'hidden', ...styles }}>
        <div ref={measureRef} className="generic-collapse-panel">
          {children}
        </div>
      </animated.div>
    </div>
  );
}
