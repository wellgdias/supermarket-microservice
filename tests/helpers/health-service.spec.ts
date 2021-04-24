/* eslint-disable class-methods-use-this */
// @ts-nocheck
import faker from 'faker';
import net from 'net';
import { healthServices } from '../../src/helpers/health-services';

describe('Helper check services health', () => {
  it('Should return all services with false result', async () => {
    const services = [
      {
        name: faker.internet.domainName().split('.')[0],
        url: faker.internet.url(),
      },
      {
        name: faker.internet.domainName().split('.')[0],
        url: faker.internet.url(),
      },
    ];
    jest.spyOn(net, 'Socket').mockImplementation(() => ({
      connect() {},
      on(type: string, listener: Function) {
        if (type === 'error') {
          listener();
        }
      },
    }));

    const response = await healthServices(services);

    expect(response).toEqual([
      {
        name: services[0].name,
        result: false,
      },
      {
        name: services[1].name,
        result: false,
      },
    ]);
  });
  it('Should return all services with true result', async () => {
    const services = [
      {
        name: faker.internet.domainName().split('.')[0],
        url: faker.internet.url(),
      },
      {
        name: faker.internet.domainName().split('.')[0],
        url: faker.internet.url(),
      },
    ];
    jest.spyOn(net, 'Socket').mockImplementation(() => ({
      connect() {},
      on(type: string, listener: Function) {
        if (type === 'connect') {
          listener();
        }
      },
    }));

    const response = await healthServices(services);

    expect(response).toEqual([
      {
        name: services[0].name,
        result: true,
      },
      {
        name: services[1].name,
        result: true,
      },
    ]);
  });
});
