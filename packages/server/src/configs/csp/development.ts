import type { CSPDirectives } from 'csp-header'
import { defaultPresets } from './default'
import { apiPolicies } from './policies/api'

export const developmentPresets: Array<Partial<CSPDirectives>> = [
  ...defaultPresets,
  apiPolicies,
]
