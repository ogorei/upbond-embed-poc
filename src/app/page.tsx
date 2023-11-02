'use client';

import Upbond, { UPBOND_BUILD_ENV } from '@upbond/upbond-embed';
import { useEffect, useState } from 'react';

export default function Home() {
  //https://github.com/upbond/embed/blob/master/README.md#login
  const upbond = new Upbond({
    buttonPosition: 'bottom-left',
    buttonSize: 56,
    modalZIndex: 150,
  });

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        console.log('call init');
        await upbond.init({
          buildEnv: UPBOND_BUILD_ENV.PRODUCTION,
          widgetConfig: {
            showAfterLoggedIn: true,
            showBeforeLoggedIn: true,
          },
          dappRedirectUri: process.env.NEXT_PUBLIC_DAPP_REDIRECT_URL,
        });
        setInitialized(true);
      } catch (err) {
        console.log('error init');
      }
    };
    if (!initialized) {
      init();
    }
  }, []);

  const loginEmbed = async () => {
    try {
      await upbond.login();
    } catch (err) {
      console.error((err as any).message);
      throw new Error();
    }
  };

  //https://github.com/upbond/embed/blob/master/README.md#logout
  const logoutEmbed = async () => {
    try {
      await upbond.logout();
    } catch (err) {
      console.error((err as any).message);
      throw new Error();
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <button onClick={() => loginEmbed()}>login</button> /{' '}
        <button onClick={() => logoutEmbed()}>logout</button>
      </div>
    </main>
  );
}
