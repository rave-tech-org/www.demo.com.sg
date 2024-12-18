'use client';

import GoogleTranslate from '@/components/google-translate';
import DropDown from '@/elements/dropdown';
import SkeletonLoader from '@/elements/skeleton-loader';
import type { Navigation } from '@/hooks/local/use-navigation';
import NextImage from '@elements/next-image';
import Link from 'next/link';

const NavigationMenu = ({ navigation }: { navigation: Navigation }) => {
  if (!navigation) return <SkeletonLoader />;

  const { leftSocials, rightSocials, findDesc, findElement, navigationMenuItems, navigationMenuBlock } = navigation;

  const imageUrl = navigationMenuBlock?.imageUrl;

  return (
    <div className="navigation-menu-wrapper">
      <div className="top-navigation">
        <div className="wrapper">
          <div className="contacts">
            {leftSocials?.map((item, key) => (
              <Link key={`social-link-${key}`} href={item.href} target="_blank">
                <NextImage src={item.imageUrl || ''} width={16} height={16} alt={item.text} />
                <span>{item.text}</span>
              </Link>
            ))}
          </div>
          <div className="socials">
            {rightSocials?.map((item, key) => (
              <Link key={`social-link-${key}`} href={item.href} target="_blank">
                <NextImage src={item.imageUrl || ''} width={24} height={24} alt={item.text} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bottom-navigation-menu">
        <div className="wrapper">
          <Link href="/">
            <NextImage src={imageUrl || ''} width={160} height={80} alt="lago logo" />
          </Link>
          <nav>
            <ul>
              {navigationMenuItems?.map((item, key) => (
                <li key={`menu-item-${key}`}>
                  <DropDown
                    items={item.subMenu}
                    isSelect
                    label={
                      <Link href={item.marks?.href || '/'}>
                        <h6>{item.text}</h6>
                      </Link>
                    }
                  />
                </li>
              ))}
            </ul>
          </nav>

          <div className="action-menu">
            <Link href={findDesc?.marks?.href || ''}>
              <NextImage src={findElement?.imageUrl || ''} width={24} height={24} alt="icon search" />
              <span>{findDesc?.text}</span>
            </Link>

            <GoogleTranslate />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
