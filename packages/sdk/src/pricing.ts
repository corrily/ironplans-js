import {
  createIframeUrl,
  IFrameOptions,
  IPublicCustomCopy,
  IPublicTheme,
  showWidgetAt,
  showWidgetModal,
} from './utils'
import { APIOptions, createAPI, IPAPI } from './api'

interface PublicApiOptions extends Partial<APIOptions> {
  publicToken: string
}

export default class Pricing {
  api: IPAPI

  /**
   * Use this class to render a Pricing widget for use in public static pages for
   * unauthenticated users. Pricing widget shows all public plans available
   * and redirects to specified redirectUrl. Instantiate using either apiOpts or api.
   * Private token will be stripped from object to avoid including in any URL in either case.
   *
   * @param apiOpts (APIOptions) - publicToken must be included.
   * @param api (IPAPI) - publicToken must be included.
   */
  constructor(apiOpts?: PublicApiOptions, api?: IPAPI) {
    if (!apiOpts?.publicToken && !api?.publicToken) {
      throw Error('Public token required.')
    }
    if (api) {
      this.api = api.token ? { ...api, token: undefined } : api
    } else if (apiOpts) {
      const opts = apiOpts.token ? { ...apiOpts, token: undefined } : apiOpts
      this.api = createAPI({
        apiBaseUrl: 'https://api.ironplans.com/',
        appBaseUrl: 'https://dash.ironplans.com/public/',
        ...opts,
      })
    } else {
      throw Error('Either apiOpts or api required.')
    }
  }

  /**
   * Generate a widget URL that you can insert into an iframe's src
   * attribute to show a Pricing widget that displays public plans on a static page.
   *
   * redirectUrl required in opts.
   *
   * Optionally, pass in planId and highlightText in opts to highlight a plan
   * card that you want to highlight, e.g. to encourage customers to select.
   */
  createWidgetUrl(
    theme?: IPublicTheme,
    opts?: Partial<IFrameOptions>,
    customCopy?: IPublicCustomCopy
  ) {
    if (!opts?.redirectUrl) throw Error('redirectUrl required')

    const url = new URL('pricing', this.api.appBaseUrl)
    url.searchParams.set('redirectUrl', opts?.redirectUrl)

    if (opts?.highlightText)
      url.searchParams.set('highlightText', opts.highlightText)
    if (opts?.planId) url.searchParams.set('planId', opts.planId)

    return createIframeUrl({
      theme,
      publicToken: this.api.publicToken,
      url,
      customCopy,
    })
  }

  /**
   * Renders a prebuilt UI widget for Pricing Plan cards.
   *
   * Pass `elOrSelector` to render the widget as a child of the element, or
   * first element that matches.  Omit to render the widget as a full-sized
   * modal.
   */
  showWidget(
    theme?: IPublicTheme,
    elOrSelector?: string | Element,
    opts?: Partial<IFrameOptions>,
    customCopy?: IPublicCustomCopy
  ) {
    const url = this.createWidgetUrl(theme, opts, customCopy)
    if (elOrSelector) {
      showWidgetAt(url, elOrSelector)
      return () => {
        /* noop */
      }
    }
    return showWidgetModal(url)
  }
}
