/* eslint-disable no-underscore-dangle */

import { InsertOneWriteOpResult } from 'mongodb';
import { ServiceError } from '../business/errors';
import Supermarket from '../business/models/supermarket';
import MongoHelper from '../helpers/mongodb/mongodb';

async function getAll(coverageArea: number[][][][]) {
  try {
    const supermarketCollection = await MongoHelper.getCollection('supermarket');
    const response = await supermarketCollection.find({
      location: {
        $geoWithin: {
          $geometry: {
            type: 'Polygon',
            coordinates: coverageArea,
          },
        },
      },
    }).toArray();

    const supermarkets = response.map((supermarket: any) => ({
      _id: supermarket._id.toString(),
      name: supermarket.name,
      address: supermarket.address,
    }));
    return supermarkets;
  } catch (error) {
    throw new ServiceError(error);
  }
}

async function create(supermarket: Supermarket): Promise<InsertOneWriteOpResult<Supermarket>> {
  const supermarketCollection = await MongoHelper.getCollection('supermarket');
  return supermarketCollection.insertOne(supermarket);
}

export default { getAll, create };
