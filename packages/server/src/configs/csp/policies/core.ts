import { EVAL, INLINE, SELF, CSPDirectives, BLOB } from 'csp-header'

import { YANDEX_API_URL } from '@/constants/main'

export const corePolicies: Partial<CSPDirectives> = {
  'connect-src': [SELF],
  'default-src': [SELF],
  'script-src': [EVAL, INLINE],
  'style-src': [INLINE],
  'img-src': [SELF, INLINE, BLOB, YANDEX_API_URL],
}
