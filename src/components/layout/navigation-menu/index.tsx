"use client"

import Select from '@rave-ui/elements/select';
import Image from 'next/image';
import Link from 'next/link';

const NavigationMenu = () => {

  const malaysiaMenuItems = [
    { label: 'Home', value: 'home', onClickItem: () => console.log('Home clicked') },
    { label: 'About', value: 'about', onClickItem: () => console.log('About clicked') },
    { label: 'Contact', value: 'contact', onClickItem: () => console.log('Contact clicked') },
  ];

  const interestsMenuItems = [
    { label: 'Home', value: 'home', onClickItem: () => console.log('Home clicked') },
    { label: 'About', value: 'about', onClickItem: () => console.log('About clicked') },
    { label: 'Contact', value: 'contact', onClickItem: () => console.log('Contact clicked') },
  ];

  return (
    <div className="navigation-menu-wrapper">
      <div className="top-navigation">
        <div className="wrapper">
          <div className="contacts">
            <Link href="">
              <Image
                src="/assets/images/header/icon-mail.svg"
                width={16}
                height={16}
                alt="icon mail"
              />
              <span>info@lagotravel.com</span>
            </Link>

            <Link href="">
              <Image
                src="/assets/images/header/icon-phone.svg"
                width={16}
                height={16}
                alt="icon phone"
              />
              <span>+6583586388</span>
            </Link>
          </div>
          <div className="socials">
            <Link href="">
              <Image
                src="/assets/images/socials/icon-facebook.svg"
                width={24}
                height={24}
                alt="icon facebook"
              />
            </Link>

            <Link href="">
              <Image
                src="/assets/images/socials/icon-instagram.svg"
                width={24}
                height={24}
                alt="icon instagram"
              />
            </Link>

            <Link href="">
              <Image
                src="/assets/images/socials/icon-tiktok.svg"
                width={24}
                height={24}
                alt="icon tiktok"
              />
            </Link>

            <Link href="">
              <Image
                src="/assets/images/socials/icon-whatsapp.svg"
                width={24}
                height={24}
                alt="icon whatsapp"
              />
            </Link>

            <Link href="">
              <Image
                src="/assets/images/socials/icon-wechat.svg"
                width={24}
                height={24}
                alt="icon wechat"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="bottom-navigation-menu">
        <div className="wrapper">
          <Link href="">
            <Image
              src="/assets/images/header/logo-header.svg"
              width={160}
              height={160}
              alt="lago logo"
            />
          </Link>
          <nav>
            <ul>
              <li>
                <Select items={malaysiaMenuItems} trigger={<button>MALAYSIA</button>} />
              </li>
              <li>
                <Select items={interestsMenuItems} trigger={<button>INTERESTS</button>} />
              </li>
              <li>
                <Select items={interestsMenuItems} trigger={<button>PLAN MY TRIP</button>} />
              </li>
              <li>
                <Select items={interestsMenuItems} trigger={<button>DISCOVER</button>} />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
