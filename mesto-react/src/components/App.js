// импорты 
import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupAvatarEdit from './PopupAvatarEdit';
import PopupCardAdd from './PopupCardAdd';
import PopupImageFull from './PopupImageFull';
import PopupUsernameEdit from './PopupUsernameEdit';
import PopupWithForm from './PopupWithForm';

// функция сбора всех фрагментов кода в общую 
function App() {
  const [ isPopupAvatarEditOpen, setIsPopupAvatarEditOpen ] = useState(false);
  const [ isPopupCardAddOpen, setIsPopupCardAddOpen ] = useState(false);
  const [ isPopupImageFullOpen, setIsPopupImageFullOpen ] = useState(false);
  const [ isPopupUsernameEditOpen, setIsPopupUsernameEditOpen ] = useState(false);
  const [ isPopupDeleteOpen, setIsPopupDeleteOpen ] = useState(false);
  const [ selectedCard, setSelectedCard ] = useState({});

  // обработчик открытия попапа редактирования аватарки
  const handlePopupAvatarEditClick = () => {
    setIsPopupAvatarEditOpen(true);
  }
  // обработчик открытия попапа добавления карточки
  const handlePopupCardAddClick = () => {
    setIsPopupCardAddOpen(true);
  }
  // обработчик открытия попапа редактирования профиля
  const handlePopupUsernameEditClick = () => {
    setIsPopupUsernameEditOpen(true);
  }
  // обработчки удаления попапа с карточкой 
  const handlePopupDeleteClick = () => {
    setIsPopupDeleteOpen(true);
  }
  // обработчки зума фотографии 
  const handleCardClick = (cards) => {
    setIsPopupImageFullOpen(true);
    setSelectedCard({
      ...selectedCard,
      name: cards.name,
      link: cards.link
    })
  }
  // общая ункция закрытия всех попапов
  const closeAllPopups = () => {
    setIsPopupUsernameEditOpen(false);
    setIsPopupCardAddOpen(false);
    setIsPopupAvatarEditOpen(false);
    setIsPopupImageFullOpen(false);
    setIsPopupDeleteOpen(false);
  }

  return (
    <div className='root'>
      < Header />
      < Main
        onEditProfile = { handlePopupUsernameEditClick }
        onAddPlace = { handlePopupCardAddClick }
        onEditAvatar = { handlePopupAvatarEditClick }
        onCardClick = { handleCardClick }
        onCardDelete = { handlePopupDeleteClick } />
      < Footer />
      < PopupAvatarEdit
        isOpen={ isPopupAvatarEditOpen }
        onClose={ closeAllPopups } />
      < PopupCardAdd 
        isOpen={ isPopupCardAddOpen }
        onClose={ closeAllPopups } />
      < PopupImageFull
        isOpen={ isPopupImageFullOpen }
        onClose={ closeAllPopups }
        card={ selectedCard } />
      < PopupUsernameEdit 
        isOpen={ isPopupUsernameEditOpen }
        onClose={ closeAllPopups } />
      < PopupWithForm 
        isOpen={ isPopupDeleteOpen }
        onClose={ closeAllPopups }
        styleClass='delete-card'
        title='Вы уверены?'
        name='contentNewCardForm'
        buttonText='Да, уверен'/>
    </div>
  )
}

export default App;
