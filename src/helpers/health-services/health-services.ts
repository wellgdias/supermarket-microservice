/* eslint-disable no-useless-escape */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable import/prefer-default-export */
import net from 'net';
import coreUrl from 'url';

type ResultHealth = {
  name: string;
  result: boolean;
};

type ServicesForChecks = {
  name: string;
  url: string;
};

export const healthServices = async (services: ServicesForChecks[]): Promise<ResultHealth[]> => {
  const servicesWithHosts = services.map((current) => ({
    name: current.name,
    url: new coreUrl.URL(current.url).hostname,
  }));

  return Promise.all(
    servicesWithHosts.map((service) => new Promise<ResultHealth>((resolve, reject) => {
      const socket = new net.Socket();
      socket.connect(80, service.url);
      socket.on('connect', () => {
        resolve({
          name: service.name,
          result: true,
        });
      });
      socket.on('timeout', () => {
        reject({
          name: service.name,
          result: false,
        });
      });
      socket.on('error', () => {
        reject({
          name: service.name,
          result: false,
        });
      });
    }).catch(
      (error): ResultHealth => ({
        name: error.name,
        result: error.result,
      }),
    )),
  );
};
