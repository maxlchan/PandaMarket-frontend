import React from 'react';
import Modal, { ModalWrapper } from './Modal';
import Card from './Card';
import { shallowWithTheme } from '../utils/test';

describe('<Modal>', () => {
  const onClickMock = jest.fn();
  const wrapper = shallowWithTheme(
    <Modal onClick={onClickMock}>
      <Card />
    </Modal>
  );

  it('renders children when passed in', () => {
    expect(wrapper.contains(<Card />)).toEqual(true);
  });

  it('should not call onClick when content is clicked', () => {
    const content = wrapper.find('Card');
    content.simulate('click');

    expect(onClickMock).not.toHaveBeenCalled();
  });

  it('should call onClick when outside of content is clicked', () => {
    const ModalOutsideOfContnent = wrapper.find(ModalWrapper);
    ModalOutsideOfContnent.simulate('click');

    expect(onClickMock).toHaveBeenCalled();
  });
});
