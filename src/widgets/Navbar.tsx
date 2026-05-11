'use client';

import { usePathname } from 'next/navigation';

import { HeaderNavigation } from '@/widgets/header/HeaderNavigation';

const Navbar = () => {
  const pathname = usePathname();

  return <HeaderNavigation pathname={pathname} />;
};

export default Navbar;
