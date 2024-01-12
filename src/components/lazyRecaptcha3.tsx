import React, { useEffect } from 'react';

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_V3
// @ts-ignore
import ReactRecaptcha3 from 'react-google-recaptcha3';

function LazyRecaptcha3() {
  useEffect(() => {
    ReactRecaptcha3.init(RECAPTCHA_SITE_KEY).then(
      (status: string) => {
        // console.log("This is the status",status);
      }
    );
    // Google Tag Manager
    // window.addEventListener('load', () => {
    //   const script = document.createElement('script');
    //   script.src = "https://www.googletagmanager.com/gtag/js?id=G-WTQTQ98PY5";
    //   script.async = true;
    //   document.body.appendChild(script);
    // });
    //  Microsoft Tracking
    // window.addEventListener('load', () => {
    //   const microsoftScript = document.createElement('script');
    //   microsoftScript.async = true;
    //   microsoftScript.innerHTML = `
    //     (function(d,s,i)
    //     {
    //       var f,j;
    //       f=d.getElementsByTagName(s)[0];
    //       j=d.createElement(s);
    //       j.async=true;
    //       j.src='https://mtag.microsoft.com/tags/'+i+'.js';
    //       f.parentNode.insertBefore(j,f);
    //     })(document,'script','14018773255119');
    //   `;
    //   document.body.appendChild(microsoftScript);
    // });
    
  }, []);

  // You can return null or some placeholder here if you want
  return null;
}

export default LazyRecaptcha3;
