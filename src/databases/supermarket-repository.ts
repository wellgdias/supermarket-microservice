/* eslint-disable no-underscore-dangle */

import { InsertOneWriteOpResult } from 'mongodb';
import Supermarket from '../business/models/supermarket';
import MongoHelper from '../helpers/mongodb/mongodb';

async function show(): Promise<Supermarket[]> {
  const supermarketCollection = await MongoHelper.getCollection('supermarket');
  const response = await supermarketCollection.find().toArray();
  const supermarkets = response.map((supermarket: any) => ({
    _id: supermarket._id.toString(),
    name: supermarket.name,
    address: supermarket.address,
  }));
  return supermarkets;
}

async function create(supermarket: Supermarket): Promise<InsertOneWriteOpResult<Supermarket>> {
  const supermarketCollection = await MongoHelper.getCollection('supermarket');
  return supermarketCollection.insertOne(supermarket);
}

export default { show, create };
