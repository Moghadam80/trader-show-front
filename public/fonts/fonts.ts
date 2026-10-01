import localFont from 'next/font/local';

export const Geist = localFont({
  src: [
    { path: './Geist/Geist-Thin.ttf', style: 'normal', weight: '100' },
    { path: './Geist/Geist-Light.ttf', style: 'normal', weight: '200' },
    { path: './Geist/Geist-ExtraLight.ttf', style: 'normal', weight: '300' },
    { path: './Geist/Geist-Regular.ttf', style: 'normal', weight: '400' },
    { path: './Geist/Geist-Medium.ttf', style: 'normal', weight: '500' },
    { path: './Geist/Geist-SemiBold.ttf', style: 'normal', weight: '600' },
    { path: './Geist/Geist-Bold.ttf', style: 'normal', weight: '700' },
    { path: './Geist/Geist-ExtraBold.ttf', style: 'normal', weight: '800' },
    { path: './Geist/Geist-Black.ttf', style: 'normal', weight: '900' },
  ],
  variable: '--font-geist',
  display: 'swap',
});
