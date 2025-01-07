import { PadNumberPipe } from './pad-number.pipe';

describe('PadNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new PadNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
