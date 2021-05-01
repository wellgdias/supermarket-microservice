import axios from 'axios';
import { ServiceError } from '../business/errors';

export default async function getCoordinates(cep: string, serviceUrl: string, token: string) {
  try {
    const urlPath = `/cep?cep=${cep}`;
    const response = await axios.get(`${serviceUrl}${urlPath}`, { headers: { Authorization: token } });
    const { data: { longitude, latitude } } = response;

    if (!longitude && !latitude) {
      return [];
    }
    const coordinates = [parseFloat(longitude), parseFloat(latitude)];
    return coordinates;
  } catch (error) {
    throw new ServiceError(`Falha ao consultar as coordenadas a partir do CEP: ${cep}`);
  }
}
