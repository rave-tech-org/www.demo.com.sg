'use client';

import Collapse from '@/elements/collapse';
import Drawer from '@/elements/drawer';
import DropDown from '@/elements/dropdown';
import { MenuBurger } from '@/elements/icons/menu-burger';
import NextImage from '@/elements/next-image';
import SkeletonLoader from '@/elements/skeleton-loader';
import type { Navigation } from '@/hooks/local/use-navigation';
import Link from 'next/link';
import { useState } from 'react';

export const MobileNavigation = ({ navigation }: { navigation: Navigation }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleClose = () => setIsOpen(false);

  if (!navigation) return <SkeletonLoader />;

  const {
    leftSocials,
    rightSocials,
    findDesc,
    findElement,
    navigationMenuItems,
    languageOptions,
    navigationMenuBlock,
  } = navigation;

  const imageUrl = navigationMenuBlock?.imageUrl || '';

  return (
    <div className="mobile-navigation-container">
      <div className="mobile-control">
        <Link href="/" className="main-logo">
          <NextImage src={imageUrl} width={160} height={80} alt="Demo logo" />
        </Link>
        <button type="button" onClick={() => handleToggle()}>
          <MenuBurger width={32} height={32} />
        </button>
      </div>

      <Drawer isOpen={isOpen} onClose={handleClose} position="top" width="100%">
        <div className="top-navigation">
          <div className="contacts">
            {leftSocials?.map((item, key) => (
              <Link key={`social-link-${key}`} href={item.href} target="_blank">
                <NextImage src={item.imageUrl} width={24} height={24} alt={item.text} />
                <span>{item.text}</span>
              </Link>
            ))}
          </div>
          <div className="socials">
            {rightSocials?.map((item, key) => (
              <Link key={`social-link-${key}`} href={item.href} target="_blank">
                <NextImage src={item.imageUrl} width={32} height={32} alt={item.text} />
              </Link>
            ))}
          </div>
        </div>

        <Link href="/" className="main-logo">
          <NextImage src={imageUrl} width={160} height={80} alt="Demo logo" />
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
                      <Link href={menu.href} key={`submenu-item-${key}`}>
                        <h5>{menu.label}</h5>
                      </Link>
                    ))}
                  </Collapse>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="action-menu">
          <Link href={findDesc?.marks?.href || ''}>
            <NextImage src={findElement?.imageUrl} width={24} height={24} alt="icon search" />
            <span>{findDesc?.text}</span>
          </Link>

          <DropDown
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
            defaultSelected={languageOptions[0]}
            isSelect
          />
        </div>
      </Drawer>
    </div>
  );
};

export default MobileNavigation;
