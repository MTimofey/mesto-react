// импорт
import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from './Card';

// функция разметки в main
function Main(props) {
  const userData = useContext(CurrentUserContext);

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__cover">
          <div className="profile__avatar-area">
            <img
              className="profile__avatar"
              src={ userData.avatar }
              alt="Аватар профиля" />
            <button
              type="button"
              className="profile__edit-avatar-button"
              onClick={ props.onEditAvatar}></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{ userData.name }</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={ props.onEditProfile }></button>
            <p className="profile__position">{ userData.about }</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={ props.onAddPlace }></button>
      </section>
      <section className="elements">
        { props.cards.map((cardsItem) => (
          <Card
            link={ cardsItem.link }
            name={ cardsItem.name }
            likes={ cardsItem.likes.length }
            key={ cardsItem._id }
            onCardClick={ props.onCardClick }
            onCardDelete={ props.onCardDelete }
            onCardLike={ props.onCardLike }
            card={ cardsItem } >
          </Card>
        ))}
      </section>
    </main> 
  )
}

// экспорт
export default Main;
