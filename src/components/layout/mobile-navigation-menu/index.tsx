'use client';

import React, { useState } from 'react';
import Drawer from '@/elements/drawer';
import SkeletonLoader from '@/elements/skeleton-loader';
import Collapse from '@/elements/collapse';
import Link from 'next/link';
import NextImage from '@/elements/next-image';
import { MenuBurger } from '@/elements/icons/menu-burger';
import Select from '@/elements/select';
import useNavigation from '@/hooks/local/use-navigation';
import { ContentBlock } from '@/sanity/sanity.types';

export const MobileNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleClose = () => setIsOpen(false);

  const navigation = useNavigation();

  if (!navigation) {
    return <SkeletonLoader />;
  }

  const {
    leftSocials,
    rightSocials,
    findDesc,
    findElement,
    navigationMenuItems,
    languageOptions,
    navigationMenuBlock,
  } = navigation;

  const { imageUrl } = navigationMenuBlock as ContentBlock & { imageUrl: string };

  return (
    <div className="mobile-navigation-container">
      <div className="mobile-control">
        <Link href="/" className="main-logo">
          <NextImage src={imageUrl} width={160} height={80} alt="lago logo" />
        </Link>
        <button onClick={() => handleToggle()}>
          <MenuBurger width={32} height={32} />
        </button>
      </div>

      <Drawer isOpen={isOpen} onClose={handleClose} position="top" width="100%">
        <div className="top-navigation">
          <div className="contacts">
            {leftSocials.map((item, key) => (
              <Link key={`social-link-${key}`} href={item.href} target="_blank">
                <NextImage src={item.imageUrl} width={24} height={24} alt={item.text} />
                <span>{item.text}</span>
              </Link>
            ))}
          </div>
          <div className="socials">
            {rightSocials.map((item, key) => (
              <Link key={`social-link-${key}`} href={item.href} target="_blank">
                <NextImage src={item.imageUrl} width={32} height={32} alt={item.text} />
              </Link>
            ))}
          </div>
        </div>

        <Link href="/" className="main-logo">
          <NextImage src={imageUrl} width={160} height={80} alt="lago logo" />
        </Link>

        <div className="bottom-navigation">
          <nav>
            <ul>
              {navigationMenuItems?.map((item, key) => (
                <li key={`menu-item-${key}`}>
                  <Collapse
                    controlLabel={
                      <Link href={item.marks?.href || '/'}>
                        <h4>{item.text}</h4>
                      </Link>
                    }
                  >
                    {item.subMenu.map((menu, key) => (
                      <h5 key={`submenu-item-${key}`} onClick={menu.onClickItem}>
                        {menu.label}
                      </h5>
                    ))}
                  </Collapse>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="action-menu">
          <Link href={findDesc?.marks?.href || ''}>
            <NextImage src={findElement.imageUrl} width={24} height={24} alt="icon search" />
            <span>{findDesc?.text}</span>
          </Link>

          <Select
            labelRender={(label) => (
              <Link href="/">
                <NextImage
                  src="/assets/images/header/icon-globe-lang.svg"
                  width={24}
                  height={24}
                  alt="icon globe lang"
                />
                <span>{label}</span>
              </Link>
            )}
            panelClassName="mobile-language-select"
            items={languageOptions}
            isSelect
          />
        </div>
      </Drawer>
    </div>
  );
};

export default MobileNavigation;
