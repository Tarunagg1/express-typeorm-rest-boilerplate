
function errorMiddleware(error, request, response, next) {
    const status = error.status || 500;
    const message = error.message || "something wrong ";
    response.status(status).send({
        message,
        status,
    });
}

export default errorMiddleware;
