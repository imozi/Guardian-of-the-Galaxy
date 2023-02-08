import { SELF, CSPDirectives } from 'csp-header'

export const staticSelfPolicies: Partial<CSPDirectives> = {
  'img-src': [SELF],
  'font-src': [SELF],
  'script-src': [SELF],
  'style-src': [SELF],
}
