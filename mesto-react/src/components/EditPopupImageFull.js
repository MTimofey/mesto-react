// импорт
import React from 'react';

// функция попапа зума фотографии
function PopupImageFull(props) {
  return (
    <div className={` popup popup_full-img ${ props.isOpen ? 'popup__opened_dark' : '' }`} id={ props.id }>
      <div className='popup__container popup__container_full-img'>
        <button 
          className='popup__close-button popup__close-button_full-img'
          type='reset' 
          onClick={ props.onClose } >
        </button>
        <img
          className='popup__img' 
          src={ props.card.link }
          alt={ props.card.name }
          />
        <p className='popup__description'>{ props.card.name }</p>
      </div>
    </div>
  )
}

// экспорт
export default PopupImageFull
