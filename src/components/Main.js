// импорт
import React, {useEffect, useState} from 'react';
import api from '../utils/Api';
import Card from './Card';

// функция разметки в main
function Main(props) {
  const [ userName, setUserName ] = useState('');
  const [ userDescription, setUserDescription ] = useState('');
  const [ userAvatar, setUserAvatar ] = useState('');
  const [ cards, setCards ] = useState([]);

  useEffect(() => {
    Promise.all([ api.getUserData(), api.getInitialCards() ])
    .then(([  userItem, cardsData ]) => {
      setUserName(userItem.name);
      setUserDescription(userItem.about);
      setUserAvatar(userItem.avatar);
      setCards(cardsData);

    })
    .catch((err) => { console.log(`Ыыы, ошибка ${err}`) })
  }, [])

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__cover">
          <div className="profile__avatar-area">
            <img
              className="profile__avatar"
              src={ userAvatar }
              alt="Аватар профиля" />
            <button
              type="button"
              className="profile__edit-avatar-button"
              onClick={ props.onEditAvatar}></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{ userName }</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={ props.onEditProfile }></button>
            <p className="profile__position">{ userDescription }</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={ props.onAddPlace }></button>
      </section>
      <section className="elements">
        { cards.map((cardsItem) => (
          <Card
            link={ cardsItem.link }
            name={ cardsItem.name }
            likes={ cardsItem.likes.length }
            key={ cardsItem._id }
            onCardClick={ props.onCardClick }
            onCardDelete={ props.onCardDelete }
            card={ cardsItem } >
          </Card>
        ))}
      </section>
    </main> 
  )
}

// экспорт
export default Main;
