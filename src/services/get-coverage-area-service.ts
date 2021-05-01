import coverageAreaRepository from '../databases/coverage-area-repository';

export default async function getCoverageArea(coordinates: number[]) {
  const operation = await coverageAreaRepository.get(coordinates);
  return operation;
}
