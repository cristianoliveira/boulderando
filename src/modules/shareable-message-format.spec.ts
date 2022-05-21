import shareableMessage from './shareable-message-format'

describe('Shareble Message', () => {
  it('formats the message to the correct format', () => {
    const session = {
      day_of_week: 'monday',
      gym_name: 'basement',
      scheduled_time: '10:00 - 12:00',
      time: '0',
    }
    const message = shareableMessage(session)
    expect(message).toContain(session.day_of_week)
    expect(message).toContain(session.gym_name)
    expect(message).toContain(session.scheduled_time)
  })

  it("returns empty if no session is given", () => {
    expect(shareableMessage(undefined)).toBe('')
  })
})
