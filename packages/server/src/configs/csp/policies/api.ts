import type { CSPDirectives } from 'csp-header'

import { YANDEX_API_URL } from '@/constants/main'

export const apiPolicies: Partial<CSPDirectives> = {
  'connect-src': [YANDEX_API_URL],
}
