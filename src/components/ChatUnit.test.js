import React from 'react';
import { shallowWithTheme } from '../utils/test';
import ChatUnit from './ChatUnit';

describe('<ChatUnit>', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    mockProps = {
      imageUrl: 'panda.com',
      name: 'panda',
      text: 'panda is cute',
      ownerId: 'asd',
      userId: 'aaa',
    };

    wrapper = shallowWithTheme(<ChatUnit {...mockProps} />);
  });
  it('should renders correctly depended on props', () => {
    expect(wrapper.find('.chatunit__name').text()).toEqual(mockProps.name);
    expect(wrapper.find('.chatunit__text').text()).toEqual(mockProps.text);
  });

  it('should render diffenrently depending on isHost prop', () => {
    wrapper.setProps({ isHost: true });
    expect(wrapper.find('.chatunit__hostMark').text()).toEqual('판매자');

    wrapper.setProps({ isHost: false });
    expect(wrapper.find('.chatunit__hostMark')).toEqual({});
  });
});
