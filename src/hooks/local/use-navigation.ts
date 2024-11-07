import { sanityFetch } from '@/sanity/lib/client';
import { GET_HEADER_LAYOUT } from '@/sanity/lib/queries/cms';
import { useEffect, useState } from 'react';
import { buildMenu } from '@/utils/build-menu';
import { PageType } from '@/components/layout/main-layout/type';
import { ListItemBlock } from '@/components/banner-carousel/type';
import { NAVIGATION_MENU, NAVIGATION_MENU_FIND, NAVIGATION_MENU_LANGUAGE, SOCIAL_LINK } from '@/resources/constant';

const useNavigation = () => {
  const [menuLayout, setMenuLayout] = useState<PageType | null>(null);

  useEffect(() => {
    (async () => {
      const menuLayout = await sanityFetch<PageType>({
        query: GET_HEADER_LAYOUT,
        tags: [`page`],
      });
      setMenuLayout(menuLayout);
    })();
  }, []);

  if (!menuLayout) {
    return null;
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

  return {
    leftSocials,
    rightSocials,
    findDesc,
    findElement,
    languageOptions,
    navigationMenuBlock,
    navigationMenuItems,
    menuLayout,
  };
};

export default useNavigation;
