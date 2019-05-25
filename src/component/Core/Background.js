import styled from 'styled-components'
import config from '../../config/colors'

const Bg = styled.div`
  background-repeat:no-repeat;
  background-size:cover;
  background-image : ${config.bgImg};
  background-attachment : fixed;
  z-index: -1;
  height: ${props => props.height};
`

export const Bridge = styled.img`
  position : absolute;
  width:100%;
  bottom:-68%;
`

export default Bg