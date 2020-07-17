import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BareLink = styled(Link)`
  text-decoration: none;
`;

const Heading = styled.h1`
  font-family: 'Dancing Script';
  color: ${props => props.theme.colors.darkTwo};
`;

export {
  Heading,
  BareLink
}