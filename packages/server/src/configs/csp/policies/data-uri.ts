import type { CSPDirectives } from 'csp-header'

export const dataUriPolicies: Partial<CSPDirectives> = {
  'img-src': ['data:'],
  'font-src': ['data:'],
}
