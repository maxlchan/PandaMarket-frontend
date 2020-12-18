import React from 'react';
import { shallow } from 'enzyme';
import ChatInput from './ChatInput';

describe('<ChatInput>', () => {
  let wrapper;
  let onKeyPressMock;
  let onChangeMock;

  beforeEach(() => {
    onKeyPressMock = jest.fn();
    onChangeMock = jest.fn();

    wrapper = shallow(
      <ChatInput
        onKeyPress={onKeyPressMock}
        onChange={onChangeMock}
        value='the-value'
      />
    );
  });

  it('should works diffenrently depending on disabeld prop', () => {
    wrapper.setProps({ disabled: false });
    wrapper.simulate('keyPress', { key: 'Enter' });

    expect(onKeyPressMock).toHaveBeenCalledTimes(1);

    wrapper.setProps({ disabled: true });
    wrapper.simulate('keyPress', { key: 'Enter' });

    expect(onKeyPressMock).toHaveBeenCalledTimes(1);
  });
});
