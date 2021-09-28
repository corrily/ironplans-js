import { stringify } from 'qs-lite'

export interface IPublicThemeFull {
  base: {
    customFont?: string
    primaryColor: string
    fontFamily: string
    darkMode: 'off' | 'on' | 'auto'
  }
}

export type IPublicTheme = Partial<IPublicThemeFull>

export function createModalIframe({ zIndex = 1 } = {}) {
  const frame = document.createElement('iframe')
  frame.width = '70%'
  frame.height = '70%'
  frame.style.backgroundColor = 'transparent'
  frame.style.zIndex = zIndex.toString()
  frame.setAttribute('allowtransparency', 'true')
  return frame
}

export function preventScroll() {
  const { scrollY } = window
  const oldOverflow = document.body.style.overflow
  const oldHeight = document.body.style.height
  const oldTop = document.body.style.top

  document.body.style.overflow = 'hidden'
  document.body.style.height = '100vh'
  document.body.style.top = `-${scrollY}px`

  const resetBody = () => {
    document.body.style.overflow = oldOverflow
    document.body.style.height = oldHeight
    document.body.style.top = oldTop
  }
  return resetBody
}

export function checkIframeRect(rect: DOMRect) {
  if (rect.height < 100 || rect.width < 100) {
    console.error('iframe is too small')
  }
}

export function themeToQueryString(theme: IPublicTheme): string {
  return stringify({ theme })
}

export function createModalBackdrop() {
  const div = document.createElement('div')
  div.style.position = 'fixed'
  div.style.top = '0'
  div.style.left = '0'
  div.style.right = '0'
  div.style.bottom = '0'
  div.style.overflow = 'hidden'
  div.style.transition = 'opacity 0.2s'
  div.style.backgroundColor = 'rgba(0, 0, 0, 0)'

  div.style.display = 'flex'
  div.style.flexDirection = 'row'
  div.style.justifyContent = 'center'

  const show = (onClose: () => void) => {
    div.style.backgroundColor = 'rgba(0,0,0,0.12)'
    div.onclick = () => {
      div.style.display = 'none'
      onClose()
    }
  }

  return { div, show }
}
