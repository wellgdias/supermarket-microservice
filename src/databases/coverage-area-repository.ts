/* eslint-disable no-underscore-dangle */

import { ServiceError } from '../business/errors';
import MongoHelper from '../helpers/mongodb/mongodb';

async function get(coordinates: number[]) {
  const coverageAreaCollection = await MongoHelper.getCollection('coverage-area');
  try {
    const response = await coverageAreaCollection.findOne({
      geometry: {
        $geoIntersects: {
          $geometry: {
            type: 'Point',
            coordinates,
          },
        },
      },
    });

    if (!response) {
      return [];
    }
    const { geometry: { coordinates: coverageArea } } = response;
    return coverageArea;
  } catch (error) {
    throw new ServiceError('Erro ao buscar a área de atuação');
  }
}

export default { get };
