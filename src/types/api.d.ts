type ApiConfiguration = {
  apiUrl: string;
  isDryRun: boolean;
}

type ApiResponse = {
  data?: object
  error?: object
}

interface Api {
  getSessions(): Promise<Array<Session>>
  postSessionSchedule(user: User, Session: Session): Promise<ApiResponse>
  postCreateUser(user: User): Promise<ApiResponse>
}

type WithApi = {
  api: Api
}

type ApiError = {
  response: {
    data: {
      error: string
    }
  }
}

