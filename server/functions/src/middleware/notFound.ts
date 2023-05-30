import { Request, Response } from 'express';

function notFound(req: Request, res: Response) {
  res.status(404).send('Rota não encontrada');
}

export default notFound;
