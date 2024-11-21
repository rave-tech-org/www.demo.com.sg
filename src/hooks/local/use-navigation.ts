import { useSanityQuery } from '@/sanity/lib/client';
import { GetHeaderLayout } from '@/sanity/lib/queries/cms';
import { buildMenu } from '@/utils/build-menu';
import { NAVIGATION_MENU, NAVIGATION_MENU_FIND, NAVIGATION_MENU_LANGUAGE, SOCIAL_LINK } from '@/resources/constant';
import { GetPageResult } from '@/sanity/sanity.types';

const useNavigation = () => {
  const { data: menuLayout, ...rest } = useSanityQuery<GetPageResult>({
    query: GetHeaderLayout,
    tags: ['page', 'contentBlock'],
  });

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
  const listItems = navigationMenuBlock?.listItems;

  const findElement = listItems?.find((item) => item.slug?.current === NAVIGATION_MENU_FIND) || listItems?.[0];
  const languageElement = listItems?.find((item) => item.slug?.current === NAVIGATION_MENU_LANGUAGE);

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
  const socialListItems = socialBlock?.listItems;
  const socials = socialListItems?.map((item) => {
    const social = buildMenu(item.description, 'normal')?.[0];
    return {
      slug: item.slug?.current,
      imageUrl: item.imageUrl,
      href: social?.marks?.href || '',
      text: social?.text || '',
    };
  });

  const getSocials = (chunks: string[]) =>
    socials?.filter((social) => chunks.some((chunk) => social.slug?.includes(chunk)));

  const leftSocials = getSocials(['phone', 'email']);
  const rightSocials = getSocials(['facebook', 'instagram', 'tiktok', 'wechat', 'whatsapp']);
  const paymentLink = getSocials(['visa', 'mastercard', 'paynow']);
  const footerSocialLink = getSocials(['facebook', 'instagram', 'tiktok', 'whatsapp', 'wechat']);

  return {
    data: {
      leftSocials,
      rightSocials,
      findDesc,
      findElement,
      languageOptions,
      navigationMenuBlock,
      navigationMenuItems,
      menuLayout,
      paymentLink,
      footerSocialLink,
    },
    ...rest,
  };
};

export default useNavigation;
