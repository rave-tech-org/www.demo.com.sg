'use client';

import NextImage from '@/elements/next-image';
import type { Navigation } from '@/hooks/local/use-navigation';
import { FOOTER_MENU } from '@/resources/constant';
import { buildMenu } from '@/utils';
import { PortableText } from 'next-sanity';
import Link from 'next/link';

const Footer = ({ navigation }: { navigation: Navigation }) => {
  if (!navigation) return;

  const { footerSocialLink, paymentLink, footerLayout } = navigation;

  if (!footerLayout) return;

  const { imageUrl, description } = footerLayout;
  const footerMenuBlock = footerLayout?.layout?.find((m) => m.slug?.current === FOOTER_MENU);
  const footerList = buildMenu(footerMenuBlock?.description);

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
            <NextImage src={footerMenuBlock?.imageUrl || ''} width={140} height={140} alt="lago logo" />
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
              {footerSocialLink?.map((item, key) => (
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
            {paymentLink?.map((item, key) => (
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
