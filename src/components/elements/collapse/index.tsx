'use client';

import { ReactNode, useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import useMeasure from 'react-use-measure';
import { CollapseProps } from './type';

export default function Collapse({
  children,
  controlLabel = 'Expand',
}: CollapseProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [measureRef, { height }] = useMeasure();

  const styles = useSpring({
    config: config.stiff,
    from: { height: 0 },
    to: { height: isOpen ? height : 0 },
  });

  return (
    <div id="generic-collapse-container">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        style={{ marginBottom: '10px', padding: '10px 20px', cursor: 'pointer' }}
      >
        {controlLabel}
      </button>

      <animated.div style={{ overflow: 'hidden', ...styles }}>
        <div
          ref={measureRef}
          className="generic-collapse-panel"
          style={{
            border: '1px solid black',
            padding: '12px',
            background: '#f9f9f9',
            borderRadius: '5px',
          }}
        >
          {children}
        </div>
      </animated.div>
    </div>
  );
}
