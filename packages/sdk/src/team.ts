import { RoleEnum, TeamDetail } from '@ironplans/api'
import { IPAPI, Resource } from './api'
import Subscription from './subscription'
import {
  createIframeUrl,
  showWidgetAt,
  showWidgetModal,
  IPublicTheme,
  TeamWidgetType,
} from './utils'

export default class Team extends Resource<TeamDetail> {
  static async fromId(api: IPAPI, id: string) {
    const team = await api.teams.teamsV1Retrieve({ id })
    if (!team) throw new Error(`Team with id ${id} not found`)
    return new Team(api, team)
  }

  get id() {
    return this.data.id
  }

  /** @deprecated Use `getSubscription` instead. */
  get subscription() {
    return this.getSubscription()
  }

  getSubscription() {
    if (!this.data.subscription) return null
    return new Subscription(this.api, this.data.subscription)
  }

  getRole(customerOrId: string | { id: string }) {
    const customerId =
      typeof customerOrId === 'string' ? customerOrId : customerOrId.id
    const membership = this.data.members.find(
      (m) => m.customerId === customerId
    )
    return membership ? membership.role : null
  }

  /**
   * Invite a Customer via email to a team.  An invitation email will be sent,
   * and if the contact accepts the invitation, the Customer will be added to
   * the team.  If the customer is new to your provider, they will be redirected
   * to your designated signup page.
   */
  async invite(email: string, role?: RoleEnum) {
    return this.api.invites.invitesV1Create({
      inviteRequest: {
        teamId: this.id,
        sentToEmail: email,
        role,
      },
    })
  }

  /**
   * Invite multiple Customers via email to a team.
   */
  async bulkInvite(emails: string[], role?: RoleEnum) {
    return this.api.invites.invitesV1BulkCreate({
      bulkCreateInviteRequest: {
        teamId: this.id,
        toEmails: emails,
        role,
      },
    })
  }

  /**
   * Revoke and delete an invite. The link the user is sent will no longer be valid.
   */
  async revokeInvite(inviteId: string) {
    return this.api.invites.invitesV1Destroy({
      id: inviteId,
    })
  }

  /**
   * Remove a member from a team. Only revokes team membership, does not delete user.
   */
  async revokeMembership(membershipId: string) {
    return this.api.teamMemberships.teamMembershipsV1Destroy({
      id: membershipId,
    })
  }

  /**
   * Update a member's role.
   */
  async updateMemberRole(membershipId: string, role: RoleEnum) {
    return this.api.teamMemberships.teamMembershipsV1PartialUpdate({
      id: membershipId,
      patchedMembershipRequest: {
        role,
      },
    })
  }

  /**
   * Update a role set on an invite. When a user accepts invite, the user will
   * obtain the role set on invite.
   */
  async updateInviteRole(inviteId: string, role: RoleEnum) {
    return this.api.invites.invitesV1PartialUpdate({
      id: inviteId,
      patchedInviteRequest: {
        role,
      },
    })
  }

  /**
   * Get all invoices belonging to a team.
   */
  async getInvoices() {
    return this.api.teams.teamsV1InvoicesList({
      teamPk: this.id,
    })
  }

  private createIframeUrl(path: string, theme?: IPublicTheme) {
    return createIframeUrl({
      theme,
      teamId: this.id,
      token: this.api.token,
      url: new URL(path, this.api.appBaseUrl),
    })
  }

  /**
   * Generate a URL that you can insert into an iframe's src attribute to show a
   * widget.
   *
   * Widgets:
   *  * `plans` - Shows a customer's available plans.
   *  * `team` - Shows a team management widget.
   *  * `invoices` - Shows a table of invoices.
   */
  createWidgetUrl(widget: TeamWidgetType, theme?: IPublicTheme) {
    return createIframeUrl({
      theme,
      teamId: this.id,
      token: this.api.token,
      url: new URL(widget, this.api.appBaseUrl),
    })
  }

  /**
   * Renders a prebuilt UI widget.
   *
   * Pass `elOrSelector` to render the widget as a child of the element, or
   * first element that matches.  Omit to render the widget as a full-sized
   * modal.
   *
   * Widgets:
   *  * `plans` - Shows a customer's available plans.
   *  * `team` - Shows a team management widget.
   *  * `invoices` - Shows a table of invoices.
   */
  showWidget(
    widget: TeamWidgetType,
    theme?: IPublicTheme,
    elOrSelector?: string | Element
  ) {
    const url = this.createWidgetUrl(widget, theme)
    if (elOrSelector) {
      showWidgetAt(url, elOrSelector)
      return () => {
        /* noop */
      }
    }
    return showWidgetModal(url)
  }
}
