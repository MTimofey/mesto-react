// импорты 
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/Api';

// функция сбора всех фрагментов кода в общую 
function App() {
  const [ isEditOpenPopupAvatar, setIsEditOpenPopupAvatar ] = useState(false);
  const [ isAddOpenPopupCard, setIsAddOpenPopupCard ] = useState(false);
  const [ isOpenImagePopup, setIsOpenImagePopup ] = useState(false);
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
  const handleEditClickPopupAvatar = () => {
    setIsEditOpenPopupAvatar(true);
  }
  // обработчик открытия попапа добавления карточки
  const handleAddClickPopupCard = () => {
    setIsAddOpenPopupCard(true);
  }
  // оAvatarбработчик открытия попапа редактирования профиля
  const handleEditClickPopupUsername = () => {
    setIsEditOpenPopupUsername(true);
  }
  const handleDeleteClickPopup = () => {
    setIsDeletePopup(true);
  }

  // обработчки зума фотографии 
  const handleClickCard = (zoomCards) => {
    setIsOpenImagePopup(true);
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
    setIsOpenImagePopup(false);
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
  const handleDeleteClickCardPopup = (deleteCard) => {
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
          onEditAvatar={ handleEditClickPopupAvatar }
          onEditProfile={ handleEditClickPopupUsername }
          onAddPlace={ handleAddClickPopupCard }
          onCardClick={ handleClickCard }
          onCardDelete={ handleDeleteClickCardPopup }
          onCardLike={ handleLikeCard }
          onDeleteClick={ handleDeleteClickPopup }
          cards={ cards }
        />
        < Footer />
        < EditAvatarPopup
          isOpen={ isEditOpenPopupAvatar }
          onClose={ closeAllPopups } 
          onUpdateAvatar={ handleUpdateAvatar }
        />
        < AddPlacePopup 
          isOpen={ isAddOpenPopupCard }
          onClose={ closeAllPopups }
          onAddPlace={ handleAddNewCard }
        />
        < ImagePopup
          isOpen={ isOpenImagePopup }
          onClose={ closeAllPopups }
          card={ selectedCard } />
        < EditProfilePopup 
          isOpen={ isEditOpenPopupUsername }
          onClose={ closeAllPopups }
          onUpdateUser={ handleUpdateUser }
        />
        < PopupWithForm 
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
