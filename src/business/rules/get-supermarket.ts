import getSupermarketService from '../../services/get-supermarket-service';
import getCoverageArea from '../../services/get-coverage-area-service';
import getCoordinates from '../../services/get-coordinates-service';
import { NotFoundError, ValidationError } from '../errors';

export default async function getSupermarket(cep: string, serviceUrl: string, token: string) {
  const coordinates = await getCoordinates(cep, serviceUrl, token);
  if (!coordinates.length) {
    throw new NotFoundError('CEP não encontrado');
  }

  const coverageArea = await getCoverageArea(coordinates);
  if (!coverageArea.length) {
    throw new ValidationError('Endereço fora da área de cobertura');
  }

  const supermarkets = await getSupermarketService(coverageArea);
  return supermarkets;
}
