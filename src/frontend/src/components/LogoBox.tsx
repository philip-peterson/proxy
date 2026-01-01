import { PropsWithChildren } from 'react'
import { createComponent } from 'react-fela'
import { FadingBoxes } from './FadingBoxes'

const Box = createComponent(() => ({
  display: 'flex',
  justifyContent: 'center',
  margin: '0 auto',
  fontSize: '1rem',
  marginTop: '1em'
}))

const color = 'rgb(200, 128, 0)'

const LeftSection = createComponent(() => ({
  padding: '1em',
  background: '#ddd',
  border: '3px double ' + color,
  backgroundClip: 'padding-box',
  'border-right': 0,
}))

const RightSection = createComponent(() => ({
  background: '#ddd',
  border: '3px double ' + color,
  'border-left': 0,
  backgroundClip: 'padding-box',
}))

const Title = createComponent(() => ({
  marginTop: '1em',
  fontFamily: 'sans-serif',
  fontStyle: 'italic',
  textAlign: 'center',
  fontSize: '1.3em',
  fontWeight: 'bold',
  letterSpacing: '2'
}))

export const LogoBox = ({ children }: PropsWithChildren) => {
  return (
    <Box>
      <LeftSection>
        <FadingBoxes />
        <Title>
          GlobalOS
        </Title>
      </LeftSection>
      <RightSection>{children}</RightSection>
    </Box>
  )
}
