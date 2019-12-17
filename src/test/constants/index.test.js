import data from '../../constants';

describe('constants', () => {
  it('consist of expected objects', () => {
    expect(data).toBeTruthy();
    expect(data.timeFormat).toBeTruthy();
  });
});
