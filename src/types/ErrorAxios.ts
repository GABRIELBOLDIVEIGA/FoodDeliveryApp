export interface ErrorAxios {
  response: {
    data: {
      error: string,
      message: string,
      statusCode: number
    }
  }
}