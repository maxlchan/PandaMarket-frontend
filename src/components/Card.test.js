import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card';
import Button from './Button';

describe('<Card>', () => {
  const mockProps = {
    color: 'blue',
    backgroundImg: 'https://interact.jpg',
  };

  const wrapper = shallow(
    <Card {...mockProps}>
      <Button text='mockButton' />
    </Card>
  );

  it('renders children when passed in', () => {
    expect(wrapper.contains(<Button text='mockButton' />)).toEqual(true);
  });

  it('should have proper props', () => {
    expect(wrapper.prop('color')).toEqual(mockProps.color);
    expect(wrapper.prop('backgroundImg')).toEqual(mockProps.backgroundImg);
  });
});
