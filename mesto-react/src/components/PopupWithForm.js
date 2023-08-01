// импорт
import React from 'react';

// функция форма попапа удаления фотографии,
// а так же задел для всех остальных попапов
function PopupWithForm(props) {
  return (
    <div className={ `popup popup_${ props.styleClass } ${ props.isOpen ? 'popup__opened' : '' }`} id={ props.id } >
      <div className='popup__body'>
        <button 
          type='button'
          className='popup__close-button'
          onClick={ props.onClose } >
        </button>
        <h2 className='popup__title'>{ props.title }</h2>
        <form name={ props.name } className='popup__content'noValidate>
          { props.children }
          <button type='submit' className='popup__submit-button'> { props.buttonText }</button>
        </form>
      </div>
    </div>
  )
}

// экспорт
export default PopupWithForm;
