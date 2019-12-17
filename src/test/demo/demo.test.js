const sum = (a, b) => {
  return a + b;
};

const multiplication = (a, b, c) => {
  return a * b * c;
};

describe('unit test for function', () => {
  it('case 1: function sum should return 7', () => {
    const v1 = 3;
    const v2 = 4;

    const outcome = sum(v1, v2);
    const expectedValue = 7;

    expect(outcome).toBe(expectedValue);
  });
  it('case 2: function multiplication should return 7', () => {
    const v1 = 3;
    const v2 = 4;
    const v3 = 2;

    const outcome = multiplication(v1, v2, v3);
    const expectedValue = 24;

    expect(outcome).toBe(expectedValue);
  });
  it('case 3: mock function gets called once', () => {
    const mock1 = jest.fn(() => 4);

    expect(mock1()).toBe(4);
    expect(mock1).toHaveBeenCalled();
    expect(mock1).toHaveBeenCalledTimes(1);
  });
  it('case 4: mock async function gets called', async () => {
    const mockAsync = jest.fn();
    mockAsync.mockReturnValue(Promise.resolve('Merry Christmas'));

    const callBack = async () => {
      return await mockAsync();
    };

    const outcome1 = await mockAsync();

    expect(outcome1).toBe('Merry Christmas');
    expect(mockAsync).toHaveBeenCalledTimes(1); 

    const outcome2 = await callBack();
    expect(outcome2).toBe('Merry Christmas');
    expect(mockAsync).toHaveBeenCalledTimes(2);
  });
});
