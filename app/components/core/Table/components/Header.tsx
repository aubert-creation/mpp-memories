import type { ReactNode } from 'react';

type HeaderProps = {
  children: ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return <thead>{children}</thead>;
};

export default Header;
