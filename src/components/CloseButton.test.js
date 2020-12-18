import React from 'react';
import { shallow } from 'enzyme';
import CloseButton from './CloseButton';

describe('<CloseButton>', () => {
  const onClickMock = jest.fn();
  const wrapper = shallow(<CloseButton onClick={onClickMock} />);

  it('should call function provided by prop when clicked', () => {
    wrapper.simulate('click');

    expect(onClickMock).toHaveBeenCalled();
  });
});
