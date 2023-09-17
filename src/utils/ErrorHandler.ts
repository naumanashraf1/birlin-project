class ErrorHandler extends Error {
  public status: string;
  public isOperation: boolean;
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.status = `${statusCode.toString().startsWith('4') ? 'fail' : 'pass'}`;
    this.isOperation = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
export default ErrorHandler;
