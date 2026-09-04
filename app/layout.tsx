import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'リビドー・コーチング｜無料動画プレゼント',
  description: '変われない原因は「意志の弱さ」ではありません。本能の仕組みを知り、頑張らなくても動ける自分へ。',
  openGraph: {
    title: 'リビドー・コーチング｜無料動画プレゼント',
    description: '本能の仕組みを知り、頑張らなくても動ける自分へ。',
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
