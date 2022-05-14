import dayjs from 'dayjs'
import getNextPossibleDay from './weekday';

describe('getNextPossibleDay', () => {
  it('gets the next possible date of next week if today is after the looking day', () => {
    const today = dayjs('2022-03-17');
    expect(today.format('dddd')).toEqual('Thursday')

    expect(getNextPossibleDay('monday', today.toDate())).toEqual('21/03/2022')
    expect(getNextPossibleDay('tuesday', today.toDate())).toEqual('22/03/2022')
    expect(getNextPossibleDay('thursday', today.toDate())).toEqual('24/03/2022')
  })

  it('gets the next possible date inside of the same week', () => {
    const today = dayjs('2022-03-17');
    expect(today.format('dddd')).toEqual('Thursday')

    expect(getNextPossibleDay('friday', today.toDate())).toEqual('18/03/2022')
    expect(getNextPossibleDay('saturday', today.toDate())).toEqual('19/03/2022')
  })
})
