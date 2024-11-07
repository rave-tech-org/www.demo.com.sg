'use client';

import { ListItemBlock } from '@/components/banner-carousel/type';
import NextImage from '@/elements/next-image';
import { FOOTER_MENU, SOCIAL_LINK } from '@/resources/constant';
import { sanityFetch } from '@/sanity/lib/client';
import { GET_FOOTER_LAYOUT } from '@/sanity/lib/queries/cms';
import { ContentBlock } from '@/sanity/sanity.types';
import { buildMenu } from '@/utils';
import { PageType } from '@components/layout/main-layout/type';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [footerLayout, setFooterLayout] = useState<PageType | null>(null);

  useEffect(() => {
    (async () => {
      const footerLayout = await sanityFetch<PageType>({
        query: GET_FOOTER_LAYOUT,
        tags: [`layout.footer`],
      });
      setFooterLayout(footerLayout);
    })();
  }, []);

  if (!footerLayout) {
    return null;
  }

  const { imageUrl, description } = footerLayout;
  const footerMenuBlock = footerLayout?.layout?.find((m) => m.slug?.current === FOOTER_MENU);
  const footerList = buildMenu(footerMenuBlock?.description);
  const { imageUrl: logoUrl } = footerMenuBlock as ContentBlock & { imageUrl: string };

  // social link
  const socialBlock = footerLayout?.layout?.find((m) => m.slug?.current === SOCIAL_LINK);
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

  const socialLink = getSocials(['facebook', 'instagram', 'tiktok', 'whatsapp', 'wechat']);
  const paymentLink = getSocials(['visa', 'mastercard', 'paynow']);

  return (
    <footer
      className="lago-footer"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        width: '100%',
      }}
    >
      <div className="wrapper">
        <div className="main-footer">
          <Link className="logo" href="/">
            <NextImage src={logoUrl} width={140} height={140} alt="lago logo" />
          </Link>
          <div className="list">
            {footerList?.map((item, key) => (
              <div key={`footer-menu-item-${key}`}>
                <h6>{item.text}</h6>
                <ul>
                  {item.subMenu.map((menu, key) => (
                    <Link href={menu.marks?.href || ''} key={`footer-sub-menu-item-${key}`}>
                      <li>{menu.text}</li>
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="info-sharing">
            <div className="socials">
              {socialLink.map((item, key) => (
                <Link key={`social-link-${key}`} href={item.href} target="_blank">
                  <NextImage src={item.imageUrl} width={32} height={32} alt={item.text} />
                </Link>
              ))}
            </div>
            <div className="primary-input">
              <input placeholder="Enter your email to join our mailing list!" />
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-footer">
        <div className="wrapper">
          {description && <PortableText value={description} />}
          <div className="payments">
            {paymentLink.map((item, key) => (
              <Link key={`payment-link-${key}`} href={item.href} target="_blank">
                <NextImage src={item.imageUrl} width={56} height={56} alt={item.text} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
