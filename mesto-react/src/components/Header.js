// импорт
import headerLogo from '../images/headerLogo.png';

// функция разметки в header
function Header() {
  return (
    <header className="header">
      <a className="header__logo" href="/#">
        <img className="header__logo-image" src={ headerLogo } alt="Логотип с изображением сайта" />
      </a>
    </header>
  )
}

// экспорт
export default Header
