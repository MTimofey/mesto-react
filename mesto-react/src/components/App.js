// импорты 
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditPopupAvatar from './EditPopupAvatar';
import AddPopupCard from './AddPopupCard';
import EditPopupImageFull from './EditPopupImageFull';
import EditPopupUsername from './EditPopupUsername';
import EditPopupWithForm from './EditPopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/Api';

// функция сбора всех фрагментов кода в общую 
function App() {
  const [ isEditOptnPopupAvatar, setIsEditOpenPopupAvatar ] = useState(false);
  const [ isAddOpenPopupCard, setIsAddOpenPopupCard ] = useState(false);
  const [ isOpenPopupImageFull, setIsOpenPopupImageFull ] = useState(false);
  const [ isEditOpenPopupUsername, setIsEditOpenPopupUsername ] = useState(false);
  const [ isDeletePopup, setIsDeletePopup ] = useState(false);
  const [ selectedCard, setSelectedCard ] = useState({});
  const [ cards, setCards ] = useState([]);
  const [ currentUser, setCurrentUser] = useState({});

  // Рендер карточек пользоателя
  useEffect(() => {
    Promise.all([ api.getUserData(), api.getInitialCards() ])
    .then(([  userItem, cardsData ]) => {
      setCurrentUser(userItem)
      setCards(cardsData);
    })
    .catch((err) => { console.log(`Ыыы, ошибка ${err}`) })
  }, [])

  // обработчик открытия попапа редактирования аватарки
  const handlePopupAvatarEditClick = () => {
    setIsEditOpenPopupAvatar(true);
  }
  // обработчик открытия попапа добавления карточки
  const handlePopupCardAddClick = () => {
    setIsAddOpenPopupCard(true);
  }
  // оAvatarбработчик открытия попапа редактирования профиля
  const handlePopupUsernameEditClick = () => {
    setIsEditOpenPopupUsername(true);
  }
  const handleDeleteClick = () => {
    setIsDeletePopup(true);
  }

  // обработчки зума фотографии 
  const handleCardClick = (zoomCards) => {
    setIsOpenPopupImageFull(true);
    setSelectedCard({
      ...selectedCard,
      name: zoomCards.name,
      link: zoomCards.link
    })
  }

  // общая функция закрытия всех попапов
  const closeAllPopups = () => {
    setIsEditOpenPopupUsername(false);
    setIsAddOpenPopupCard(false);
    setIsEditOpenPopupAvatar(false);
    setIsOpenPopupImageFull(false);
  }

  // функция изменения аватарки
  const handleUpdateAvatar = (newAvatar) => {
    api.updateAvatar(newAvatar)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log( `Ну как можно изменить такую моську? ${ err }` )
    })
  }

  // функция добавления новых карточек
  const handleAddNewCard = (newCard) => {
    api.addNewCard(newCard.name, newCard.link)
    .then((card) => {
      setCards([ card, ...cards ]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log( `Кто посмел доавить новую фотку?! ${ err }` )
    })
  }

  // функция изменения данных пользователя
  const handleUpdateUser = (newUserCard) => {
    api.editUserProfile(newUserCard.name, newUserCard.about)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log( `Простите, но под этим именем мы вас не знаем ${ err }` )
    })
  }

  // функция удаления попапа с карточкой 
  const handlePopupDeleteClick = (deleteCard) => {
     api.deleteCard(deleteCard._id)
    .then(() => { 
      setCards((cards)=> cards.filter((cardItem) => cardItem._id !== deleteCard._id))
    })
    .catch((err) => {
      console.log( `Слишком красивый, чтобы тебя удалять! ${ err }` )
    })
  }

  // функция лайка
  const handleLikeCard = (likeCard) => {
    const isLiked = likeCard.likes.some(card => card._id === currentUser._id)
    api.setCardLike(likeCard._id, !isLiked)
    .then((newCard) => {
      setCards((card) => card.map((cardItem) => cardItem._id === likeCard._id ? newCard : cardItem));
    })
    .catch((err) => {
      console.log( `Мое сердце остановилось ${ err }` )
    })
  }

  return (
    < CurrentUserContext.Provider value={ currentUser } > 
      < div className='root'>
        < Header />
        < Main
          onEditAvatar={ handlePopupAvatarEditClick }
          onEditProfile={ handlePopupUsernameEditClick }
          onAddPlace={ handlePopupCardAddClick }
          onCardClick={ handleCardClick }
          onCardDelete={ handlePopupDeleteClick }
          onCardLike={ handleLikeCard }
          onDeleteClick={ handleDeleteClick }
          cards={ cards }
        />
        < Footer />
        < EditPopupAvatar
          isOpen={ isEditOptnPopupAvatar }
          onClose={ closeAllPopups } 
          onUpdateAvatar={ handleUpdateAvatar }
        />
        < AddPopupCard 
          isOpen={ isAddOpenPopupCard }
          onClose={ closeAllPopups }
          onAddPlace={ handleAddNewCard }
        />
        < EditPopupImageFull
          isOpen={ isOpenPopupImageFull }
          onClose={ closeAllPopups }
          card={ selectedCard } />
        < EditPopupUsername 
          isOpen={ isEditOpenPopupUsername }
          onClose={ closeAllPopups }
          onUpdateUser={ handleUpdateUser }
        />
        < EditPopupWithForm 
          isOpen={ isDeletePopup }
          onClose={ closeAllPopups }
          styleClass='delete-card'
          title='Вы уверены?'
          name='contentNewCardForm'
          buttonText='Да, уверен'/>
      </ div>
    </ CurrentUserContext.Provider>
  )
}

export default App;
