// импорт
import React from 'react';
import PopupWithForm from './PopupWithForm';

// функция попапа редактирования аватарки
function PopupAvatarEdit(props) {
  return (
    <PopupWithForm
      isOpen={ props.isOpen }
      onClose={ props.onClose }
      id='edit-avatar'
      styleClass='edit-avatar'
      title='Обновить аватар'
      name='userAvatar'
      buttonText='Сохранить' >        
      <input
        id='popup__avatar-picture' 
        type='url'
        name='avatarPicture' 
        className='popup__text'
        autoComplete='off'
        placeholder='Введите ссылку на аватар'
        required />
      <span 
        id='error-popup__avatar-picture'
        className='popup__error-message'>
      </span>
    </PopupWithForm>
  )
}
// экспорт
export default PopupAvatarEdit;
