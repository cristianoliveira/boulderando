declare type SessionDate = string

declare type Session = {
  gym_name: string
  day_of_week: SessionDate
  scheduled_time: string
  time: string
}

type SessionContext = {
  sessions: StorageData<Session>
  deleteCustomSessions(): void
  scheduleSession(
    session: Session,
    user: User
  ): Promise<{ data?: object; error?: object }>
  saveCustomSession(session: Session): void
  isProcessing: boolean
  hasSubmitted: boolean
}

