import { NextFunction, Request, Response } from 'express';

async function errorHandlerMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  console.log(err);

  let customError = {
    statusCode: err.statusCode || 500,
    msg: err.message || 'Algo deu errado, tente novamente mais tarde.',
  };

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(',');
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Valor duplicado para o campo ${Object.keys(
      err.keyValue
    )}, por favor, escolha outro valor.`;

    customError.statusCode = 400;
  }

  if (err.name === 'CastError') {
    customError.msg = `Item com id: ${err.value} não encontrado.`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
}

export default errorHandlerMiddleware;
