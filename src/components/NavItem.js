import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledText = styled.span`
  color: ${(props) => props.theme.LIGHT_BLACK};
  font-size: 0.8rem;
`;

const NavItem = ({ to, name }) => {
  return (
    <Link to={to}>
      <StyledText>{name}</StyledText>
    </Link>
  );
};

export default NavItem;
