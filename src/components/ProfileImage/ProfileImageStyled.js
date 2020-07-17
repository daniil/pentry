import styled from 'styled-components';
import { ReactComponent as ProfileSvg } from '../../assets/images/profile.svg';

const ProfileBtn = styled('button')`
  cursor: pointer;
  border: none;
  padding: 0;
  background: none;
  line-height: 0;
  &:hover {
    opacity: 0.75;
  }
`;

const ProfileDefault = styled(ProfileSvg)`
  fill: ${props => props.theme.colors.mediumOne};
  height: ${props => props.theme.typeScale[1]}rem;
`;

const ProfileImg = styled('img')`
  border-radius: 50%;
  height: ${props => props.theme.typeScale[1]}rem;
`;

export {
  ProfileBtn,
  ProfileDefault,
  ProfileImg
}