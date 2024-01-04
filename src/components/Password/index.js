import './index.css'
import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'

const initialColorList = [
  'color1',
  'color2',
  'color3',
  'color4',
  'color5',
  'color6',
  'color7',
]

class Password extends Component {
  state = {
    passwordListItems: [],
    isShow: false,
    initialLetterColorName: initialColorList[0],
    websiteNameInput: '',
    userNameInput: '',
    passwordInput: '',
    searchInput: '',
  }

  onSubmitForm = event => {
    event.preventDefault()

    const {websiteNameInput, userNameInput, passwordInput} = this.state

    const randomNumber = Math.abs(
      Math.ceil(Math.random() * initialColorList.length - 1),
    )

    // console.log(randomNumber)
    // console.log(initialColorList[randomNumber])

    const newObject = {
      id: v4(),
      websiteName: websiteNameInput,
      userName: userNameInput,
      password: passwordInput,
      initialLetterColorName: initialColorList[randomNumber],
    }

    this.setState(prevState => ({
      passwordListItems: [...prevState.passwordListItems, newObject],
      websiteNameInput: '',
      userNameInput: '',
      passwordInput: '',
      isShow: false,
    }))
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteNameInput: event.target.value})
  }

  onChangeUserNameInput = event => {
    this.setState({userNameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeShowPassword = () => {
    this.setState(prevState => ({isShow: !prevState.isShow}))
  }

  onClickDeleteItem = id => {
    const {passwordListItems} = this.state

    const filteredItem = passwordListItems.filter(
      eachItem => eachItem.id !== id,
    )

    this.setState({passwordListItems: filteredItem})
  }

  searchResultsList = () => {
    const {passwordListItems, searchInput} = this.state
    const searchResult = passwordListItems.filter(eachItem =>
      eachItem.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return searchResult
  }

  onChangeSearchItem = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {
      initialLetterColorName,
      isShow,
      websiteNameInput,
      userNameInput,
      passwordInput,
      searchInput,
    } = this.state
    const searchResults = this.searchResultsList()
    const lengthList = searchResults.length

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="password-app-container">
          <div className="password-container">
            <h1 className="main-heading">Add New Password</h1>
            <form className="form-container" onSubmit={this.onSubmitForm}>
              <div className="input-container">
                <div className="input-image-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                    alt="website"
                    className="input-image"
                  />
                </div>
                <input
                  id="website"
                  type="text"
                  className="input-text"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsiteInput}
                  value={websiteNameInput}
                />
              </div>
              <div className="input-container">
                <div className="input-image-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                    alt="username"
                    className="input-image"
                  />
                </div>
                <input
                  id="username"
                  type="text"
                  className="input-text"
                  placeholder="Enter Username"
                  onChange={this.onChangeUserNameInput}
                  value={userNameInput}
                />
              </div>
              <div className="input-container">
                <div className="input-image-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                    alt="password"
                    className="input-image"
                  />
                </div>
                <input
                  id="password"
                  type="password"
                  className="input-text"
                  placeholder="Enter Password"
                  onChange={this.onChangePasswordInput}
                  value={passwordInput}
                />
              </div>
              <div className="input-button-container">
                <button type="submit" className="input-button">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="password-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-image"
            />
          </div>
        </div>

        <div className="display-password-container">
          <div className="password-count-search-container">
            <div className="password-count-container">
              <h1 className="password-count-heading">Your Passwords</h1>
              <p className="password-count">{lengthList}</p>
            </div>
            <div className="search-container">
              <div className="search-icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                  alt="search"
                  className="search-icon"
                />
              </div>
              <input
                id="search"
                type="search"
                placeholder="Search"
                className="input-search"
                onChange={this.onChangeSearchItem}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="hr-line" />

          <div className="show-password-container">
            <input
              id="checkbox"
              type="checkbox"
              className="show-password-checkbox"
              onChange={this.onChangeShowPassword}
              checked={isShow}
            />
            <label htmlFor="checkbox" className="show-password-name">
              Show Passwords
            </label>
          </div>
          <div className="display-container">
            {lengthList > 0 && (
              <ul className="display-password-list-container">
                {searchResults.map(eachItem => (
                  <PasswordItem
                    key={eachItem.id}
                    eachDetails={eachItem}
                    initialLetterColorName={initialLetterColorName}
                    isShow={isShow}
                    onClickDeleteItem={this.onClickDeleteItem}
                  />
                ))}
              </ul>
            )}
            {lengthList === 0 && (
              <div className="length-zero-password-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="length-password-image"
                />
                <p className="length-password-name">No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default Password
