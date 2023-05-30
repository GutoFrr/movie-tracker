"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function errorHandlerMiddleware(err, req, res, next) {
    console.log(err);
    let customError = {
        statusCode: err.statusCode || 500,
        msg: err.message || 'Algo deu errado, tente novamente mais tarde.',
    };
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(',');
    }
    if (err.code && err.code === 11000) {
        customError.msg = `Valor duplicado para o campo ${Object.keys(err.keyValue)}, por favor, escolha outro valor.`;
        customError.statusCode = 400;
    }
    if (err.name === 'CastError') {
        customError.msg = `Item com id: ${err.value} não encontrado.`;
        customError.statusCode = 404;
    }
    return res.status(customError.statusCode).json({ msg: customError.msg });
}
exports.default = errorHandlerMiddleware;
//# sourceMappingURL=errorHandler.js.map