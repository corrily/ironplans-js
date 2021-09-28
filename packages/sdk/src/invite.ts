import { Invite as InviteData } from '@ironplans/api'
import { IPAPI } from './api'
import { Immutable } from './types'

export default class Invite {
  api: IPAPI

  readonly data: Immutable<InviteData>

  constructor(api: IPAPI, data: Immutable<InviteData>) {
    this.api = api
    this.data = data
  }

  async revoke() {
    await this.api.invites
  }
}
