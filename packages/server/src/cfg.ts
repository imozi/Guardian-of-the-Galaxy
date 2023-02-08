import mergeOptions from 'merge-options'
import { defaultConfig } from '@/configs/default'
import { developmentConfig } from '@/configs/development'
import { productionConfig } from '@/configs/production'
import type { AppConfig, Config } from '@/types'
import { NODE_ENV } from '@/constants/main'

let config: AppConfig = {}

if (NODE_ENV === 'development') {
  config = developmentConfig
}

if (NODE_ENV === 'production') {
  config = productionConfig
}

export const cfg: Config = mergeOptions(
  { environment: NODE_ENV },
  defaultConfig,
  config
)
