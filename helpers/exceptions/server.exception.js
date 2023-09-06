class ServerException extends Error {
    status = 400;
    message = "Something went wrong with your request";
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export default ServerException;
