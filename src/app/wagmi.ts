import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { baseSepolia } from 'wagmi/chains'; // add baseSepolia for testing
import { coinbaseWallet } from 'wagmi/connectors';

export function getConfig() {
  return createConfig({
    chains: [baseSepolia], // add baseSepolia for testing
    connectors: [
      coinbaseWallet({
        appName: 'DeGift',
        preference: 'smartWalletOnly',
        appLogoUrl:
          'https://res.cloudinary.com/dpxb3nqwd/image/upload/v1738945481/wiejuxpnlsg03wcjzm9x.png',
        version: '4',
      }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [baseSepolia.id]: http(), // add baseSepolia for testing
    },
  });
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
