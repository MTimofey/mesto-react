// импорт
import React from "react";

// функция создания новой карточки
function Card(props) {
  function handleCardClick() {
    props.onCardClick(props.card)
  }
  function handleCardDelete() {
    props.onCardDelete(props.card)
  }
  
  return (
    <div className="element">
    <button
      className="element__delete-button"
      type="reset" 
      onClick={ handleCardDelete }></button>
    <img
      className="element__image"  
      src={ props.link }
      alt={ props.name }
      onClick={ handleCardClick } />
    <div className="element__context">
      <p className="element__title">{ props.name }</p>
      <div className="element__like-area">
        <button
          className="element__like-button"
          type="submit" ></button>
        <p className="element__like-number">{ props.likes > 0 ? props.likes : null }</p>
      </div>
    </div>
  </div>
  )
}

// экспорт
export default Card
