import axios from 'axios'

import type { 
  IYandexSigninModel,
  IGetYandexServiceIDModel
} from '../types/api/ya.praktikum'

const YandexAuth = {
  signin(data: IYandexSigninModel) {
    return axios.post('/oauth/yandex', data)
  },
  getServiceID(params: IGetYandexServiceIDModel) {
    return axios.get('/oauth/yandex/service-id', { params })
  }
}

export default YandexAuth;

