const { palindrome } = require('../utils/for_testin');

describe('palindrome', ()=>{
  test('is equals a ala', ()=>{
    const resp = palindrome('ala');
    expect(resp).toBe('ala');
  });

  test('is empty string', ()=>{
    const resp = palindrome('');
    expect(resp).toBe('');
  });

  test('is undefined', ()=>{
    const resp = palindrome();
    expect(resp).toBeUndefined();
  });
});