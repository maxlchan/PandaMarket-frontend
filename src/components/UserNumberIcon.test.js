import React from 'react';
import { shallow } from 'enzyme';
import UserNumberIcon from './UserNumberIcon';

describe('<UserNumberIcon>', () => {
  const mockProps = {
    className: 'mockname',
    userNumber: 3,
  };

  const wrapper = shallow(<UserNumberIcon {...mockProps} />);

  it('should renders correctly depended on props', () => {
    expect(wrapper.find('.mockname')).toHaveLength(1);
    expect(wrapper.find('span').text()).toEqual(String(mockProps.userNumber));
  });
});
