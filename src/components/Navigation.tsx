'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link> {pathname === '/' ? '🔥' : ''}
        </li>

        <li>
          <Link href="/about-us">About Us</Link> {pathname === '/about-us' ? '🔥' : ''}
        </li>
      </ul>
    </nav>
  );
}
