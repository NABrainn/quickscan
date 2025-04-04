import { IsFormArrayPipe } from './is-form-array.pipe';

describe('IsFormArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new IsFormArrayPipe();
    expect(pipe).toBeTruthy();
  });
});
