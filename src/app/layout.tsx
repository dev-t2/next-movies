import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next Movies',
  description: 'Create a movies app using Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
