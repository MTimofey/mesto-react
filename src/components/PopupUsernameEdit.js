// импорт
import React from 'react';
import PopupWithForm from './PopupWithForm';

// функция попапа редактирования профиля
function PopupUserNameEdit(props) {
  return (
    <PopupWithForm
      isOpen={ props.isOpen } 
      onClose={ props.onClose }
      id='usernamEdit'
      styleClass='username-edit'
      title='Редактировать профиль'
      name='contentProfileForm'
      buttonText='Сохранить'>
        <input 
          id='popup__username'
          type='text'
          name='userName'
          className='popup__text popup__text_username'
          minLength='2'
          maxLength='40'
          autoComplete='off'
          placeholder='Введите ваше имя'
          required />
        <span
          id='error-popup__username'
          className='popup__error-message' >
        </span>
        <input 
          id='popup__user-position'
          type='text'
          name='userPosition'
          minLength='2'
          maxLength='200'
          className='popup__text'
          autoComplete='off'
          placeholder='Расскажите о себе'
          required
        />
        <span
          id='error-popup__user-position'
          className='popup__error-message'>
        </span>
    </PopupWithForm>
  )
}

// экспорт
export default PopupUserNameEdit
