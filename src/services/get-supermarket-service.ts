import { ServiceError } from '../business/errors';
import repository from '../databases/supermarket-repository';

export default async function getSupermarketService() {
  try {
    const supermarkets = await repository.show();
    return supermarkets;
  } catch (error) {
    throw new ServiceError('Erro ao buscar os supermercados disponíveis');
  }
}
