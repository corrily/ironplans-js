import jwtDecode, { JwtPayload } from 'jwt-decode'
import { stringify } from 'qs'
import { Immutable, Mutable } from './types'

export function clone<T extends Immutable<T2>, T2 = unknown>(
  obj: T
): Mutable<T2> {
  return JSON.parse(JSON.stringify(obj))
}

export type ThemeState =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'disabled'

export type ThemeColorVariants = { [key in ThemeState]: string }
export type ThemeButtonVariants = {
  [key in ThemeState]: Partial<CSSStyleDeclaration>
} & {
  base: Partial<CSSStyleDeclaration>
}

interface BaseThemeOptions {
  customFont: string
  primaryColor: string // TODO: deprecate
  fontFamily: string
  darkMode: 'off' | 'on' | 'auto'
  colors: Partial<ThemeColorVariants>
}

export interface IPublicThemeFull {
  base: Partial<BaseThemeOptions>
  card: Partial<CSSStyleDeclaration>
  button: Partial<ThemeButtonVariants>
}
export type IPublicTheme = Partial<IPublicThemeFull>

export interface IFrameOptions {
  url: string | URL
  theme?: IPublicTheme
  token?: string
  publicToken?: string
  teamId?: string
  planId?: string
  highlightText?: string
  redirectUrl?: string
}

type Paginated<T> = {
  results?: T[]
}

export function first<T>(page: Paginated<T>): T | undefined {
  return page.results?.[0]
}

const providerClaim = 'https://api.ironplans.com/.jwt/provider/'
interface IPClaims {
  [providerClaim]?: string
}

export function getClaims(token: string) {
  const payload = jwtDecode<JwtPayload & IPClaims>(token)
  return {
    // typesafety defaults
    sub: payload.sub ?? 'anon',
    exp: 0,
    ...payload,
  }
}

export function getProviderIdFromToken(token: string) {
  const claims = getClaims(token)
  return claims[providerClaim]
}

export function isTokenExpired(token: string): boolean {
  const claims = getClaims(token)
  return claims.exp < Date.now() / 1000
}

export function themeToQueryString(theme: IPublicTheme): string {
  return stringify({ theme })
}

export function urlish(url: string | URL): URL {
  if (typeof url === 'string') {
    return new URL(url)
  }
  return url
}

export function createIframeUrl(opts: IFrameOptions) {
  const url = urlish(opts.url)

  const { token, publicToken, teamId, theme } = opts
  url.searchParams.set('ct', token ?? '')
  url.searchParams.set('pt', publicToken ?? '')
  url.searchParams.set('tid', teamId ?? '')

  return `${url}${theme ? `&${themeToQueryString(theme)}` : ''}`
}

function createIframe({ zIndex = 1 } = {}) {
  const frame = document.createElement('iframe')
  frame.name = 'ironplans'
  frame.width = '100%'
  frame.height = '100%'
  frame.style.backgroundColor = 'transparent'
  frame.style.zIndex = zIndex.toString()
  frame.style.border = '0px'
  frame.setAttribute('allowtransparency', 'true')
  return frame
}

function preventScroll() {
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

function checkIframeRect(rect: DOMRect) {
  if (rect.height < 100 || rect.width < 100) {
    console.error('iframe is too small')
  }
}

function createModalBackdrop() {
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

function findIframe(el: Element) {
  const frames = el.querySelectorAll("iframe[name='ironplans']")
  if (frames.length === 1) {
    return frames[0] as HTMLIFrameElement
  }
  return undefined
}

export async function showWidgetAt(
  urlish_: string | URL,
  el: Element | string,
  { zIndex }: ShowWidgetOptions = {}
) {
  return new Promise<Element>((resolve) => {
    const url = urlish(urlish_)

    const render = () => {
      const elem = typeof el === 'string' ? document.querySelector(el) : el

      if (elem == null) throw new Error(`selector '${el}' returned no elements`)

      const rect = elem.getBoundingClientRect()
      checkIframeRect(rect)

      const oldFrame = findIframe(elem)
      const iframe = oldFrame || createIframe({ zIndex })
      iframe.src = url.toString()
      if (!oldFrame) elem.appendChild(iframe)
      resolve(elem)
    }

    if (document.readyState === 'complete') {
      render()
    } else {
      window.addEventListener('load', render)
    }
  })
}

export function showWidgetModal(
  urlish_: string,
  { zIndex }: ShowWidgetOptions = {}
) {
  const url = urlish(urlish_)

  const iframe = createIframe({ zIndex })
  const { div: backdrop, show } = createModalBackdrop()

  const allowScroll = preventScroll()

  backdrop.appendChild(iframe)
  document.body.appendChild(backdrop)
  iframe.src = url.toString()

  const onClose = () => {
    document.body.removeChild(backdrop)
    allowScroll()
  }

  show(onClose)
  return { el: backdrop, onClose }
}

interface ShowWidgetOptions {
  zIndex?: number
}

export async function parseRequestError(e: unknown) {
  if (e instanceof Response) {
    const body = await e.text()
    return new Error(`Request failed: ${body}`)
  }
  return e
}

export type TeamWidgetType = 'plans' | 'team' | 'invoices'
export type PublicWidgetType = 'pricing'
export type WidgetType = TeamWidgetType | PublicWidgetType
