import supermarketRepository from '../databases/supermarket-repository';

export default async function getSupermarket(coverageArea: number[][][][]) {
  const supermarkets = await supermarketRepository.getAll(coverageArea);
  return supermarkets;
}
