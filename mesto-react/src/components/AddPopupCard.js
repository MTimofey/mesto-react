// импорт
import React, { useEffect, useRef } from 'react';
import PopupWithForm from './EditPopupWithForm';

// функция попапа добавления карточки
function PopupCardAdd(props) {

  const cardName = useRef();
  const cardLink = useRef();

  // эффект для очистки полей
  useEffect( () => {
    cardName.current.value = '';
    cardLink.current.value = '';
  }, [ props.isOpen ]);
  
  // сабмит данных карточки
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onAddPlace({ 
      name: cardName.current.value, 
      link: cardLink.current.value,
    });
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
          ref={ cardName }
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
          ref={ cardLink }
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
export default PopupCardAdd
