'use client';

import Select from '@rave-ui/elements/select';
import Image from 'next/image';
import Link from 'next/link';

const NavigationMenu = () => {
  const malaysiaMenuItems = [
    { label: 'Home Home Home', value: 'home', onClickItem: () => console.log('Home clicked') },
    { label: 'About', value: 'about', onClickItem: () => console.log('About clicked') },
    { label: 'Contact', value: 'contact', onClickItem: () => console.log('Contact clicked') },
  ];

  const interestsMenuItems = [
    { label: 'Home', value: 'home', onClickItem: () => console.log('Home clicked') },
    { label: 'About', value: 'about', onClickItem: () => console.log('About clicked') },
    { label: 'Contact', value: 'contact', onClickItem: () => console.log('Contact clicked') },
  ];

  const languageOptions = [
    { label: 'EN', value: 'en' },
    { label: 'CN', value: 'cn' },
  ];

  return (
    <div className="navigation-menu-wrapper">
      <div className="top-navigation">
        <div className="wrapper">
          <div className="contacts">
            <Link href="">
              <Image src="/assets/images/header/icon-mail.svg" width={0} height={0} alt="icon mail" style={{ width: 16, height: 16 }} />
              <span>info@lagotravel.com</span>
            </Link>

            <Link href="">
              <Image src="/assets/images/header/icon-phone.svg" alt="icon phone" width={0} height={0} style={{ width: 16, height: 16 }}/>
              <span>+6583586388</span>
            </Link>
          </div>
          <div className="socials">
            <Link href="">
              <Image src="/assets/images/socials/icon-facebook.svg" width={24} height={24} alt="icon facebook" />
            </Link>

            <Link href="">
              <Image src="/assets/images/socials/icon-instagram.svg" width={24} height={24} alt="icon instagram" />
            </Link>

            <Link href="">
              <Image src="/assets/images/socials/icon-tiktok.svg" width={24} height={24} alt="icon tiktok" />
            </Link>

            <Link href="">
              <Image src="/assets/images/socials/icon-whatsapp.svg" width={24} height={24} alt="icon whatsapp" />
            </Link>

            <Link href="">
              <Image src="/assets/images/socials/icon-wechat.svg" width={24} height={24} alt="icon wechat" />
            </Link>
          </div>
        </div>
      </div>

      <div className="bottom-navigation-menu">
        <div className="wrapper">
          <Link href="">
            <Image src="/assets/images/header/logo-header.svg" width={0} height={0} alt="lago logo" style={{ width: 160, height: 160 }} />
          </Link>
          <nav>
            <ul>
              <li>
                <Select items={malaysiaMenuItems} label={<h6>MALAYSIA</h6>} />
              </li>
              <li>
                <Select items={interestsMenuItems} label={<h6>INTERESTS</h6>} />
              </li>
              <li>
                <Select items={interestsMenuItems} label={<h6>PLAN MY TRIP</h6>} />
              </li>
              <li>
                <Select items={interestsMenuItems} label={<h6>DISCOVER</h6>} />
              </li>
            </ul>
          </nav>

          <div className="action-menu">
            <Link href="">
              <Image src="/assets/images/header/icon-search.svg" width={24} height={24} alt="icon search" />
              <span>FIND</span>
            </Link>

            <Link href="">
              <Image src="/assets/images/header/icon-globe-lang.svg" width={24} height={24} alt="icon globe lang" />
              <Select items={languageOptions} isSelect />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
