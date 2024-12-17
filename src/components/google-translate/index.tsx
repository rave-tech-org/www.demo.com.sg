import Script from 'next/script';

const GoogleTranslate: React.FC = () => {
  // Define the initialization function for Google Translate globally
  if (typeof window !== 'undefined') {
    // @ts-ignore
    window.googleTranslateElementInit = () => {
      // @ts-ignore
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,id,ja,ko,ms,th,zh-CN,zh-TW',
          // @ts-ignore
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          multilanguagePage: true,
          gaTrack: true,
          // gaId: '',
        },
        'google_translate_element'
      );
    };
  }

  return (
    <>
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
      <div id="google_translate_element"></div>
    </>
  );
};

export default GoogleTranslate;
