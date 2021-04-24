import getSupermarketService from '../../services/get-supermarket-service';

export default async function getSupermarket() {
  const supermarkets = await getSupermarketService();
  return supermarkets;
}
