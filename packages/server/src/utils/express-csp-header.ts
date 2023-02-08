import { getCSP, CSPHeaderParams } from 'csp-header'
import { parse as pslParse } from 'psl'
import type { RequestHandler, Request, Response } from 'express'
import { TLD, CSP_HEADER, CSP_REPORT_ONLY_HEADER } from '@/constants/csp'

interface ParseOptions {
  customTlds?: string[] | RegExp
}

interface ExpressCSPParams extends Omit<CSPHeaderParams, 'reportUri'> {
  domainOptions?: ParseOptions
  reportOnly?: boolean
  reportUri?: string | ((req: Request, res: Response) => string)
}

function parseDomain(
  hostname: string,
  domainOptions?: ParseOptions
): string | null {
  const customTlds = domainOptions?.customTlds
  if (customTlds instanceof RegExp) {
    const tld = hostname.match(customTlds)
    if (tld !== null) {
      return tld[0].replace(/^\.+/, '')
    }
  }

  if (Array.isArray(customTlds)) {
    for (const tld of customTlds) {
      if (hostname.endsWith(`.${tld}`)) {
        return tld
      }
    }
  }

  const domain = pslParse(hostname)

  if (domain.error) {
    return null
  }

  return domain.tld
}

function applyAutoTld(
  req: Request,
  cspString: string,
  domainOptions?: ParseOptions
): string {
  if (cspString.includes(TLD)) {
    const tld = parseDomain(req.hostname, domainOptions)

    if (!tld) {
      return cspString
    }

    return cspString.replace(new RegExp(TLD, 'g'), tld)
  }

  return cspString
}

function getCspString(
  req: Request,
  res: Response,
  params: ExpressCSPParams
): string {
  const { directives, presets, reportUri } = params
  const cspHeaderParams: CSPHeaderParams = {
    directives,
    presets,
    reportUri:
      typeof reportUri === 'function' ? reportUri(req, res) : reportUri,
  }

  return getCSP(cspHeaderParams)
}

function setHeader(
  res: Response,
  cspString: string,
  params: ExpressCSPParams
): void {
  const headerName = params.reportOnly ? CSP_REPORT_ONLY_HEADER : CSP_HEADER
  res.set(headerName, cspString)
}

export const expressCspHeader = (params?: ExpressCSPParams): RequestHandler => {
  return (req, res, next) => {
    if (!params) {
      next()
      return
    }

    const { domainOptions } = params
    let cspString = getCspString(req, res, params)

    cspString = applyAutoTld(req, cspString, domainOptions)

    setHeader(res, cspString, params)

    next()
  }
}
