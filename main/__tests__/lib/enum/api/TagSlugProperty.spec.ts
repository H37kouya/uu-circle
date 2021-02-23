import * as TestFunc from '@/lib/enum/api/TagSlugProperty'

describe('Enum TagSlugProperty', () => {
  it('isSport', () => {
    expect(TestFunc.TagSlugProperty.sport).toBe('sport')
    expect(TestFunc.isTagSlugProperty('sport')).toBeTruthy()
    expect(TestFunc.isSport('sport')).toBeTruthy()
    expect(TestFunc.isSport('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isMusic', () => {
    expect(TestFunc.TagSlugProperty.music).toBe('music')
    expect(TestFunc.isTagSlugProperty('music')).toBeTruthy()
    expect(TestFunc.isMusic('music')).toBeTruthy()
    expect(TestFunc.isMusic('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isCulture', () => {
    expect(TestFunc.TagSlugProperty.culture).toBe('culture')
    expect(TestFunc.isTagSlugProperty('culture')).toBeTruthy()
    expect(TestFunc.isCulture('culture')).toBeTruthy()
    expect(TestFunc.isCulture('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isNature', () => {
    expect(TestFunc.TagSlugProperty.nature).toBe('nature')
    expect(TestFunc.isTagSlugProperty('nature')).toBeTruthy()
    expect(TestFunc.isNature('nature')).toBeTruthy()
    expect(TestFunc.isNature('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isCommunity', () => {
    expect(TestFunc.TagSlugProperty.community).toBe('community')
    expect(TestFunc.isTagSlugProperty('community')).toBeTruthy()
    expect(TestFunc.isCommunity('community')).toBeTruthy()
    expect(TestFunc.isCommunity('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isInternational', () => {
    expect(TestFunc.TagSlugProperty.international).toBe('international')
    expect(TestFunc.isTagSlugProperty('international')).toBeTruthy()
    expect(TestFunc.isInternational('international')).toBeTruthy()
    expect(TestFunc.isInternational('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isIncare', () => {
    expect(TestFunc.TagSlugProperty.incare).toBe('incare')
    expect(TestFunc.isTagSlugProperty('incare')).toBeTruthy()
    expect(TestFunc.isIncare('incare')).toBeTruthy()
    expect(TestFunc.isIncare('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isProgram', () => {
    expect(TestFunc.TagSlugProperty.program).toBe('program')
    expect(TestFunc.isTagSlugProperty('program')).toBeTruthy()
    expect(TestFunc.isProgram('program')).toBeTruthy()
    expect(TestFunc.isProgram('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isVolunteer', () => {
    expect(TestFunc.TagSlugProperty.volunteer).toBe('volunteer')
    expect(TestFunc.isTagSlugProperty('volunteer')).toBeTruthy()
    expect(TestFunc.isVolunteer('volunteer')).toBeTruthy()
    expect(TestFunc.isVolunteer('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isActive', () => {
    expect(TestFunc.TagSlugProperty.active).toBe('active')
    expect(TestFunc.isTagSlugProperty('active')).toBeTruthy()
    expect(TestFunc.isActive('active')).toBeTruthy()
    expect(TestFunc.isActive('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isLoose', () => {
    expect(TestFunc.TagSlugProperty.loose).toBe('loose')
    expect(TestFunc.isTagSlugProperty('loose')).toBeTruthy()
    expect(TestFunc.isLoose('loose')).toBeTruthy()
    expect(TestFunc.isLoose('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isMonday', () => {
    expect(TestFunc.TagSlugProperty.monday).toBe('monday')
    expect(TestFunc.isTagSlugProperty('monday')).toBeTruthy()
    expect(TestFunc.isMonday('monday')).toBeTruthy()
    expect(TestFunc.isMonday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isTuesday', () => {
    expect(TestFunc.TagSlugProperty.tuesday).toBe('tuesday')
    expect(TestFunc.isTagSlugProperty('tuesday')).toBeTruthy()
    expect(TestFunc.isTuesday('tuesday')).toBeTruthy()
    expect(TestFunc.isTuesday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isWednesday', () => {
    expect(TestFunc.TagSlugProperty.wednesday).toBe('wednesday')
    expect(TestFunc.isTagSlugProperty('wednesday')).toBeTruthy()
    expect(TestFunc.isWednesday('wednesday')).toBeTruthy()
    expect(TestFunc.isWednesday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isThursday', () => {
    expect(TestFunc.TagSlugProperty.thursday).toBe('thursday')
    expect(TestFunc.isTagSlugProperty('thursday')).toBeTruthy()
    expect(TestFunc.isThursday('thursday')).toBeTruthy()
    expect(TestFunc.isThursday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isFriday', () => {
    expect(TestFunc.TagSlugProperty.friday).toBe('friday')
    expect(TestFunc.isTagSlugProperty('friday')).toBeTruthy()
    expect(TestFunc.isFriday('friday')).toBeTruthy()
    expect(TestFunc.isFriday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isOnlyMonday', () => {
    expect(TestFunc.TagSlugProperty.only_monday).toBe('only_monday')
    expect(TestFunc.isTagSlugProperty('only_monday')).toBeTruthy()
    expect(TestFunc.isOnlyMonday('only_monday')).toBeTruthy()
    expect(TestFunc.isOnlyMonday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isOnlyTuesday', () => {
    expect(TestFunc.TagSlugProperty.only_tuesday).toBe('only_tuesday')
    expect(TestFunc.isTagSlugProperty('only_tuesday')).toBeTruthy()
    expect(TestFunc.isOnlyTuesday('only_tuesday')).toBeTruthy()
    expect(TestFunc.isOnlyTuesday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isOnlyWednesday', () => {
    expect(TestFunc.TagSlugProperty.only_wednesday).toBe('only_wednesday')
    expect(TestFunc.isTagSlugProperty('only_wednesday')).toBeTruthy()
    expect(TestFunc.isOnlyWednesday('only_wednesday')).toBeTruthy()
    expect(TestFunc.isOnlyWednesday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isOnlyThursday', () => {
    expect(TestFunc.TagSlugProperty.only_thursday).toBe('only_thursday')
    expect(TestFunc.isTagSlugProperty('only_thursday')).toBeTruthy()
    expect(TestFunc.isOnlyThursday('only_thursday')).toBeTruthy()
    expect(TestFunc.isOnlyThursday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isOnlyFriday', () => {
    expect(TestFunc.TagSlugProperty.only_friday).toBe('only_friday')
    expect(TestFunc.isTagSlugProperty('only_friday')).toBeTruthy()
    expect(TestFunc.isOnlyFriday('only_friday')).toBeTruthy()
    expect(TestFunc.isOnlyFriday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isHoliday', () => {
    expect(TestFunc.TagSlugProperty.holiday).toBe('holiday')
    expect(TestFunc.isTagSlugProperty('holiday')).toBeTruthy()
    expect(TestFunc.isHoliday('holiday')).toBeTruthy()
    expect(TestFunc.isHoliday('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isMammoth', () => {
    expect(TestFunc.TagSlugProperty.mammoth).toBe('mammoth')
    expect(TestFunc.isTagSlugProperty('mammoth')).toBeTruthy()
    expect(TestFunc.isMammoth('mammoth')).toBeTruthy()
    expect(TestFunc.isMammoth('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isUrgentRecruitment', () => {
    expect(TestFunc.TagSlugProperty.urgent_recruitment).toBe('urgent_recruitment')
    expect(TestFunc.isTagSlugProperty('urgent_recruitment')).toBeTruthy()
    expect(TestFunc.isUrgentRecruitment('urgent_recruitment')).toBeTruthy()
    expect(TestFunc.isUrgentRecruitment('aaaaabbbbcccc')).toBeFalsy()
  })
  it('isMystery', () => {
    expect(TestFunc.TagSlugProperty.mystery).toBe('mystery')
    expect(TestFunc.isTagSlugProperty('mystery')).toBeTruthy()
    expect(TestFunc.isMystery('mystery')).toBeTruthy()
    expect(TestFunc.isMystery('aaaaabbbbcccc')).toBeFalsy()
  })
})
