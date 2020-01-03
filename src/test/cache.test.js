import cache from '../Cache';

describe('Cache', () => {
  it('should work when setting and getting items', () => {
    const string1 = 'string1';
    cache.setItem('Object-1', string1);
    expect(cache.getItem('Object-1')).toEqual(string1);
  });

  it('should work when setting and removing an item', () => {
    const string2 = 'strong';
    cache.setItem('Object-2', string2);
    expect(cache.getItem('Object-2')).toEqual(string2);
    cache.removeItem('Object-2');
    expect(cache.getItem('Object-2')).toEqual(null);
  });

  it('should work when setting and calling object keys', () => {
    const string2 = 'strong';
    cache.setItem('Object-2', string2);
    expect(cache.getItem('Object-2')).toEqual(string2);
    expect(cache.key(0)).toEqual('Object-1');
    expect(cache.key(1)).toEqual('Object-2');
    expect(cache.key(2)).toEqual(null);
  });

  it('should work when calling the legnth of the cache', () => {
    expect(cache.key(0)).toEqual('Object-1');
    expect(cache.key(1)).toEqual('Object-2');
    expect(cache.key(2)).toEqual(null);
    expect(cache.length()).toEqual(2);
  });

  it('should work when clearing cache', () => {
    expect(cache.key(0)).toEqual('Object-1');
    expect(cache.key(1)).toEqual('Object-2');
    cache.clear();
    expect(cache.key(0)).toEqual(null);
    expect(cache.key(1)).toEqual(null);
  });
});