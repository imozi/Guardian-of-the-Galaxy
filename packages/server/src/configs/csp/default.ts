import type { CSPDirectives } from 'csp-header'
import { corePolicies } from './policies/core'
import { dataUriPolicies } from './policies/data-uri'
import { staticSelfPolicies } from './policies/static-self'

export const defaultPresets: Array<Partial<CSPDirectives>> = [
  corePolicies,
  dataUriPolicies,
  staticSelfPolicies,
]
