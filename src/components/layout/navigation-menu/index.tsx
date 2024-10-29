'use client';

import { sanityFetch } from '@/sanity/lib/client';
import { GET_MENU_LAYOUT } from '@/sanity/lib/queries/cms';
import NextImage from '@elements/next-image';
import Select from '@elements/select';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { buildMenu } from '@/utils/build-menu';
import { PageType } from '@/components/layout/main-layout/type';
import { ListItemBlock } from '@/elements/banner-carousel/type';
import SkeletonLoader from '@/elements/skeleton-loader';
import { NAVIGATION_MENU, NAVIGATION_MENU_FIND, NAVIGATION_MENU_LANGUAGE, SOCIAL_LINK } from '@/resources/constant';

const NavigationMenu = () => {
  const [menuLayout, setMenuLayout] = useState<PageType | null>(null);

  useEffect(() => {
    (async () => {
      const menuLayout = await sanityFetch<PageType>({
        query: GET_MENU_LAYOUT,
        tags: [`layout.menu`],
      });
      setMenuLayout(menuLayout);
    })();
  }, []);

  if (!menuLayout) {
    return <SkeletonLoader />;
  }

  // header left side
  const navigationMenuBlock = menuLayout?.layout?.find((m) => m.slug?.current === NAVIGATION_MENU);
  const navigationMenu = buildMenu(navigationMenuBlock?.description);

  const navigationMenuItems = navigationMenu?.map((item) => {
    return {
      text: item.text,
      marks: item?.marks,
      subMenu: item.subMenu.map((sub) => ({
        label: sub.text,
        value: sub.text,
        onClickItem: () => {
          // todo: implement more reliable approach
          window.location.href = sub.marks?.href || '/';
        },
      })),
    };
  });

  // header right side
  const { listItems } = navigationMenuBlock as ListItemBlock;

  const findElement = listItems?.find((item) => item.slug?.current === NAVIGATION_MENU_FIND) || listItems[0];
  const languageElement = listItems.find((item) => item.slug?.current === NAVIGATION_MENU_LANGUAGE);

  const findDesc = buildMenu(findElement?.description)?.[0];
  const languageMenu = buildMenu(languageElement?.description);
  const languageOptions =
    languageMenu?.map((item) => {
      return {
        label: item.text,
        value: item.text,
        onClickItem: () => {},
      };
    }) || [];

  // social
  const socialBlock = menuLayout?.layout?.find((m) => m.slug?.current === SOCIAL_LINK);
  const { listItems: socialListItems } = socialBlock as ListItemBlock;
  const socials = socialListItems.map((item) => {
    const social = buildMenu(item.description, 'normal')?.[0];
    return {
      slug: item.slug?.current,
      imageUrl: item.imageUrl,
      href: social?.marks?.href || '',
      text: social?.text || '',
    };
  });

  const getSocials = (chunks: string[]) =>
    socials.filter((social) => chunks.some((chunk) => social.slug?.includes(chunk)));

  const leftSocials = getSocials(['phone', 'email']);
  const rightSocials = getSocials(['facebook', 'instagram', 'tiktok', 'wechat', 'whatsapp']);

  return (
    <div className="navigation-menu-wrapper">
      <div className="top-navigation">
        <div className="wrapper">
          <div className="contacts">
            {leftSocials.map((item, key) => (
              <Link key={`social-link-${key}`} href={item.href} target="_blank">
                <NextImage src={item.imageUrl} width={16} height={16} alt={item.text} />
                <span>{item.text}</span>
              </Link>
            ))}
          </div>
          <div className="socials">
            {rightSocials.map((item, key) => (
              <Link key={`social-link-${key}`} href={item.href} target="_blank">
                <NextImage src={item.imageUrl} width={24} height={24} alt={item.text} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bottom-navigation-menu">
        <div className="wrapper">
          <Link href="">
            <NextImage src="/assets/images/header/logo-header.svg" width={160} height={80} alt="lago logo" />
          </Link>
          <nav>
            <ul>
              {navigationMenuItems?.map((item, key) => (
                <li key={`menu-item-${key}`}>
                  <Select
                    items={item.subMenu}
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
              <NextImage src={findElement.imageUrl} width={24} height={24} alt="icon search" />
              <span>{findDesc?.text}</span>
            </Link>

            <Link href="">
              <NextImage src="/assets/images/header/icon-globe-lang.svg" width={24} height={24} alt="icon globe lang" />
              <Select items={languageOptions} isSelect />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
