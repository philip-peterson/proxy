import { PropsWithChildren } from 'react'
import { createComponent } from 'react-fela'
import { FadingBoxes } from './FadingBoxes'
import { GlobalOsTitle } from './GlobalOsTitle'

const Box = createComponent(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontSize: '1rem',
  marginTop: '1em'
}))

const color = 'rgb(200, 128, 0)'

const TopSection = createComponent(() => ({
  padding: '1em',
  background: '#ddd',
  border: '3px double ' + color,
  backgroundClip: 'padding-box',
  'border-bottom': 0,
}))

const BottomSection = createComponent(() => ({
  background: '#ddd',
  border: '3px double ' + color,
  'border-top': 0,
  backgroundClip: 'padding-box',
}))

export const VerticalFrame = ({ children }: PropsWithChildren) => {
  return (
    <Box>
      <TopSection>
        <FadingBoxes />
        <GlobalOsTitle>
          GlobalOS
        </GlobalOsTitle>
      </TopSection>
      <BottomSection>{children}</BottomSection>
    </Box>
  )
}
