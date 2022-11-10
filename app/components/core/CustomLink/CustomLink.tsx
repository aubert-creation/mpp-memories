import type { ReactNode } from 'react';
import { Link } from '@remix-run/react';
import styled from 'styled-components';

type CustomLinkProps = {
  to: string;
  state?: any;
  children?: ReactNode;
};

const CustomLink = ({ to, state, children }: CustomLinkProps) => (
  <StyledLink to={to} state={state}>
    {children}
  </StyledLink>
);

export default CustomLink;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
