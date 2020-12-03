import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledText = styled.span`
  color: ${({ theme }) => theme.colors.light_black};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const NavItem = ({ to, name }) => {
  return (
    <Link to={to}>
      <StyledText>{name}</StyledText>
    </Link>
  );
};

export default NavItem;
