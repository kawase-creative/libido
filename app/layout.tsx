import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'リビドー・コーチング｜無料動画プレゼント',
  description: '想像を超えた未来を現実にする、本気のリビドー・コーチング。無料動画をお受け取りください。',
  openGraph: {
    title: 'リビドー・コーチング｜無料動画プレゼント',
    description: '想像を超えた未来を現実にする、本気のリビドー・コーチング。',
    images: ['/libido-coaching.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
