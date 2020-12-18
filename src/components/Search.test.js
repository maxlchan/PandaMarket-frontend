import React from 'react';
import Search from './Search';
import { mountWithTheme } from '../utils/test';

describe('<Search>', () => {
  let wrapper;
  let onSearchMock;
  let input;

  beforeEach(() => {
    jest.useFakeTimers('modern');

    onSearchMock = jest.fn();
    wrapper = mountWithTheme(<Search onSearch={onSearchMock} />);
    input = wrapper.find('input');
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should call onSerach prop when press Enter', () => {
    input.simulate('change', { target: { value: 'Hello' } });
    input.simulate('keyPress', { key: 'Enter' });

    expect(onSearchMock).toHaveBeenCalled();
  });

  it('should not call onSerach prop when no input value', () => {
    input.simulate('change', { target: { value: '' } });
    input.simulate('keyPress', { key: 'Enter' });
    expect(onSearchMock).not.toHaveBeenCalled();
  });

  it('should call onSerach prop after 0.5 seconds after onchange is called', () => {
    input.simulate('change', { target: { value: 'Hello' } });
    jest.advanceTimersByTime(500);

    expect(onSearchMock).toHaveBeenCalledTimes(1);

    input.simulate('change', { target: { value: 'Hello' } });
    jest.advanceTimersByTime(500);

    expect(onSearchMock).toHaveBeenCalledTimes(2);
  });
});
