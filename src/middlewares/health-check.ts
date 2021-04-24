import { Request, RequestHandler, Response } from 'express';

type ResultCheck = { name: string; result: boolean };

export interface CheckRequest {
  (req: Request, res: Response): ResultCheck | ResultCheck[];
}

export interface HealthResponse {
  message: string;
  healthy: boolean;
  services: { [key: string]: boolean };
}

const reducer = (req: Request, res: Response, connectionCheck: CheckRequest, current: HealthResponse) => {
  const { message, healthy, services } = current;

  const results = connectionCheck(req, res);

  if (Array.isArray(results)) {
    const allSuccess = results.every((response) => response.result === true);
    const servicesReceived = results.reduce((prev, curr) => ({ ...prev, [curr.name]: curr.result }), {});

    return {
      message,
      healthy: healthy && allSuccess,
      services: { ...services, ...servicesReceived },
    };
  }

  const { name, result } = results;
  return {
    message,
    healthy: healthy && result,
    services: { ...services, [name]: result },
  };
};

const createHealthCheck = (...connectionChecks: CheckRequest[]): RequestHandler => (req, res) => {
  const {
    config: { port },
  } = req.app.locals;

  const body = connectionChecks.reduce<HealthResponse>(
    (current, connectionCheck) => reducer(req, res, connectionCheck, current),
    { message: `Application running at: ${port}`, healthy: true, services: {} },
  );

  res.status(body.healthy ? 200 : 503).json(body);
};

export default createHealthCheck;
