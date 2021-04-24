import { RequestHandler } from 'express';

export default function unless(path: string) {
  return (middleware: RequestHandler): RequestHandler => (req, res, next) => {
    if (req.path === path) return next();
    return middleware(req, res, next);
  };
}
