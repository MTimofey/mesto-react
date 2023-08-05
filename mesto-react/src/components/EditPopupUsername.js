// импорт
import React, { useContext, useState, useEffect } from 'react';
import EditPopupWithForm from './EditPopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

// функция попапа редактирования профиля
function PopupUserNameEdit(props) {

  // константы с наполнением данных о пользователях и подписки
  const userItem = useContext(CurrentUserContext);
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');

  // заполнение корректными данными формы
  useEffect(() => {
    setName(userItem.name ?? '');
    setDescription(userItem.about ?? '');
  }, [props.isOpened, userItem]);

  // апдейт измененний после сабмита
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    })
  }

  // изменение данных имени
  const handleChangeUsername = (evt) => {
    setName(evt.target.value);
  }

  // изменение данных описания
  const handleChangeDescription = (evt) => {
    setDescription(evt.target.value);
  }

  return (
    <EditPopupWithForm
      isOpen={ props.isOpen } 
      onClose={ props.onClose }
      onSubmit={ handleSubmit }
      id='usernamEdit'
      styleClass='username-edit'
      title='Редактировать профиль'
      name='contentProfileForm'
      buttonText='Сохранить'>
        <input 
          value={ name }
          onChange={ handleChangeUsername }
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
          value={ description }
          onChange={ handleChangeDescription }
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
    </EditPopupWithForm>
  )
}

// экспорт
export default PopupUserNameEdit
