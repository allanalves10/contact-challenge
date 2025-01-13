import styled from "styled-components";
import PlaceIcon from '@mui/icons-material/Place';

export const StyledMarker = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
`;

export const StyledPlaceIcon = styled(PlaceIcon)`
  color: red;
  font-size: 40px;
`;
