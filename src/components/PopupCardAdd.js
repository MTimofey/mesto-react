// импорт
import React from 'react';
import PopupWithForm from './PopupWithForm';

// функция попапа добавления карточки
function PopupCardAdd(props) {
  return (
    <PopupWithForm
      isOpen={ props.isOpen }
      onClose={ props.onClose }
      id='card-add'
      styleClass='card-add'
      title='Новое место'
      name='contentNewCardForm'
      buttonText='Создать' >
        <input 
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
