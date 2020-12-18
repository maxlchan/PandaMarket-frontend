import React from 'react';
import { shallowWithTheme } from '../utils/test';
import AuctionCategory, { StyldBox } from './AuctionCategory';

describe('<AuctionCategory>', () => {
  const onClickMock = jest.fn();
  const mockProps = {
    title: 'panda',
    index: 0,
    onClick: onClickMock,
  };

  const wrapper = shallowWithTheme(<AuctionCategory {...mockProps} />);

  it('should renders correctly depended on props', () => {
    expect(wrapper.find('h1').text()).toEqual(mockProps.title);
  });

  it('should have proper props', () => {
    expect(wrapper.find(StyldBox).prop('id')).toEqual(mockProps.title);
  });

  it('should call function provided by prop with target id when clicked', () => {
    wrapper.simulate('click', { target: { id: mockProps.title } });
    expect(onClickMock).toHaveBeenCalledWith(mockProps.title);
  });
});
