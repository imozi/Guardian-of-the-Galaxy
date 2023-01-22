import axios from 'axios'

export const isClient = () => typeof window !== 'undefined'

export const getLocationOrigin = (): string => location.origin

export const getServiceId = async () => {
  try {
    const result = await axios.get('/api/v2/oauth/yandex/service-id', {
      params: { redirect_uri: isClient() ? getLocationOrigin() : '' },
    })
    return result.data
  } catch (error) {
    console.log(error)
  }
}

export const authorizeWithYaOAuth = async (
  data: any
): Promise<any> => {
  try {
    const result = await axios.post<any>('/api/v2/oauth/yandex', {
      data,
    })
    return result.data
  } catch (error) {
    console.log(error)
  }
}
