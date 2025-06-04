export class HttpResult<T> {
  // Indicates whether the operation succeeded or not.
  public success: boolean;
  // Holds the returned data or is null if there is none.
  public data: T | null;
  // Error message if something goes wrong.
  public error: string;

  // We use static methods to create an instance.
  private constructor(success: boolean, data: T | null, error: string) {
    this.success = success;
    this.data = data;
    this.error = error;
  }

  // Method to create a success result.
  // Can receive data, but if nothing is passed, defaults to null.
  public static Success<T>(data: T | null = null): HttpResult<T> {
    return new HttpResult<T>(true, data, "");
  }

  // Method to create a failure result, setting an error message.
  public static Fail(error: string): HttpResult<any> {
    return new HttpResult<any>(false, null, error);
  }
}
