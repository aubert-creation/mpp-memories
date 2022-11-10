import type { ReactNode } from 'react';

type BodyProps = {
  children: ReactNode;
};

const Body = ({ children }: BodyProps) => {
  return <tbody>{children}</tbody>;
};

export default Body;
