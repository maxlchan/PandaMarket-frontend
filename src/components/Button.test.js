import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('<Button>', () => {
  const onClickMock = jest.fn();
  const mockProps = {
    id: 'open',
    className: 'button',
    disabled: true,
    onClick: onClickMock,
    color: 'yellow',
    width: '10px',
    padding: '10px',
    text: 'button',
  };

  const wrapper = shallow(<Button {...mockProps} />);

  it('should renders correctly depended on props', () => {
    expect(wrapper.find('h1').text()).toEqual(mockProps.text);
  });

  it('should have proper props', () => {
    expect(wrapper.find('#open')).toHaveLength(1);
    expect(wrapper.find('.button')).toHaveLength(1);
    expect(wrapper.find('disabled')).toBeTruthy();
    expect(wrapper.prop('color')).toEqual(mockProps.color);
    expect(wrapper.prop('width')).toEqual(mockProps.width);
    expect(wrapper.prop('padding')).toEqual(mockProps.padding);
  });

  it('should call function provided by prop when clicked', () => {
    wrapper.simulate('click');
    expect(onClickMock).toHaveBeenCalled();
  });
});
