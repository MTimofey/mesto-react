// импорт
import React, { useEffect, useRef } from 'react';
import EditPopupWithForm from './EditPopupWithForm';

// функция попапа редактирования аватарки
function PopupAvatarEdit(props) {

  const avatarPhoto = useRef();

  // очистка формы
  useEffect(() => { 
    avatarPhoto.current.value = '' 
  },[ props.isOpen ])

  // сабмит на очитску формы
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarPhoto.current.value
    });
  }

  return (
    <EditPopupWithForm
      isOpen={ props.isOpen }
      onClose={ props.onClose }
      onSubmit={ handleSubmit }
      id='edit-avatar'
      styleClass='edit-avatar'
      title='Обновить аватар'
      name='userAvatar'
      buttonText='Сохранить' >        
      <input
        ref={ avatarPhoto }
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
    </EditPopupWithForm>
  )
}

// экспорт
export default PopupAvatarEdit;
