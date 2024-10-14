'use client';

import Drawer from '@rave-ui/elements/drawer';
import Select from '@rave-ui/elements/select';
import Collapse from '@/elements/collapse';
import { useState } from 'react';

function HomeSectionOne() {
  const menuItems = [
    { label: 'Home', value: 'home', onClickItem: () => console.log('Home clicked') },
    { label: 'About', value: 'about', onClickItem: () => console.log('About clicked') },
    { label: 'Contact', value: 'contact', onClickItem: () => console.log('Contact clicked') },
  ];

  const selectOptions = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="home-section-one">
      <Select items={menuItems} label={<button>Menu</button>} />

      <Select items={selectOptions} isSelect />

      <div>
        <button onClick={() => setIsOpen(true)}>Open Drawer</button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} position="right" width="400px">
          <Collapse controlLabel="PLAN MY TRIP">
            <span>MY Leisure Trip</span>
            <span>MY M.I.C.E Trip</span>
          </Collapse>
          <Collapse controlLabel="DISCOVER">
            <span>MY Leisure Trip</span>
            <span>MY M.I.C.E Trip</span>
          </Collapse>
        </Drawer>
      </div>
    </section>
  );
}

export default HomeSectionOne;
