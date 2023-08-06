// импорт
import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

// функция попапа добавления карточки
function AddPlacePopup(props) {
  const [ cardPlaceName, setCardPlaceName ] = useState('');
  const [ cardPlaceLink, setCardPlaceLink ] = useState('');

  // эффект для очистки полей
  useEffect(() => {
    if(props.isOpen) {
      setCardPlaceName('');
      setCardPlaceLink('');
    }
  }, [ props.isOpen ]);

  // внесение данных о название картинки
  const handleChangeCardPlaceName = (evt) => {
    setCardPlaceName(evt.target.value);
  }
  // внесение данных о ссылки на картинку
  const handleChangeCardPlaceLink = (evt) => {
    setCardPlaceLink(evt.target.value);
  }
  // сабмит данных карточки
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onAddPlace({ 
      name: cardPlaceName,
      link: cardPlaceLink,
    })
  }


  return (
    <PopupWithForm
      isOpen={ props.isOpen }
      onClose={ props.onClose }
      onSubmit={ handleSubmit }
      id='card-add'
      styleClass='card-add'
      title='Новое место'
      name='contentNewCardForm'
      buttonText='Создать' >
        <input 
          value={ cardPlaceName }
          onChange={ handleChangeCardPlaceName }
          id='popup__photo-name'
          type='text'
          name='photoName'
          className='popup__text popup__text_photo-name'
          minLength='2' 
          maxLength='30'
          autoComplete='off'
          placeholder='Название'
          required >  
        </input>
        <span 
          id='error-popup__photo-name'
          className='popup__error-message'>
        </span>
        <input
          value={ cardPlaceLink }
          onChange={ handleChangeCardPlaceLink }
          id='popup__photo-link'
          type='url'
          name='link'
          className='popup__text popup__text_photo-link'
          autoComplete='off'
          placeholder='Ссылка на картинку'
          required> 
        </input>
        <span
          id='error-popup__photo-link'
          className='popup__error-message'>
        </span>
      </PopupWithForm>
  )
}

// экспорт
export default AddPlacePopup
