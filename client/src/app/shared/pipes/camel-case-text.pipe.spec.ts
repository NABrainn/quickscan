import { CamelCaseTextPipe } from './camel-case-text.pipe';

describe('CamelCaseTextPipe', () => {
  it('create an instance', () => {
    const pipe = new CamelCaseTextPipe();
    expect(pipe).toBeTruthy();
  });
});
