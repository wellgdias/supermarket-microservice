import { ServiceError } from '../business/errors';
import supermarketRepository from '../databases/supermarket-repository';

export default async function getSupermarket(coverageArea: number[][][][]) {
  try {
    const supermarkets = await supermarketRepository.getAll(coverageArea);
    return supermarkets;
  } catch (error) {
    throw new ServiceError('Erro ao buscar os supermercados disponíveis');
  }
}
