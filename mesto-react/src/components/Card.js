// импорт
import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

// функция создания новой карточки
function Card(props) {
  // константы для контекста, определения владельца и лайка карточки
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(user => user._id === currentUser._id);  
  
  const handleCardClick = () => {
    props.onCardClick(props.card)
  }
  const handleCardDelete = () => {
    props.onCardDelete(props.card)
  }
  const handleCardLike = () => {
    props.onCardLike(props.card)
  }
  
  return (
    <div className="element">
    { isOwn && <button
      className="element__delete-button"
      type="reset" 
      onClick={ handleCardDelete }></button> }
    <img
      className="element__image"  
      src={ props.link }
      alt={ props.name }
      onClick={ handleCardClick } />
    <div className="element__context">
      <p className="element__title">{ props.name }</p>
      <div className="element__like-area">
        <button
          onClick={ handleCardLike }
          className={ `element__like-button ${ isLiked ? 'element__like-button_active' : ''}` }
          type="submit" ></button>
        <p className="element__like-number">{ props.likes > 0 ? props.likes : null }</p>
      </div>
    </div>
  </div>
  )
}

// экспорт
export default Card
