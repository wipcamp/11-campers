import styled from 'styled-components'
import config from '../../config/fonts'

const Headline = styled.h1`
  font-family: 'Sarabun', sans-serif;
  font-size: ${config.headline};
  font-weight: bold;
`

export const Subtitle = styled.h1`
  font-family: 'Sarabun', sans-serif;
  font-size: ${config.subtitle};
`

export const Paragraph = styled.p`
  font-family: 'Sarabun', sans-serif;
  font-size: ${config.paragraph};
`

export const ParagraphBold = styled(Paragraph)`
  font-family: 'Sarabun', sans-serif;
  font-weight: bold;
`

export const Small = styled.h5`
  font-family: 'Sarabun', sans-serif;
  font-size: ${config.small};
`

export default Headline
