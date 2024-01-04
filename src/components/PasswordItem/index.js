import './index.css'

const passwordItem = props => {
  const {eachDetails, isShow, onClickDeleteItem} = props
  const {
    id,
    websiteName,
    userName,
    password,
    initialLetterColorName,
  } = eachDetails
  //   console.log('colorName', initialLetterColorName)

  const onDeleteButton = () => {
    onClickDeleteItem(id)
  }

  return (
    <li className="display-each-password-item">
      <div className={`${initialLetterColorName} display-each-item-logo`}>
        <p className="display-letter-logo">{userName[0]}</p>
      </div>
      <div className="display-input-items">
        <p className="display-input-website">{websiteName}</p>
        <p className="display-input-username">{userName}</p>
        {isShow && <p className="display-input-password">{password}</p>}
        {!isShow && (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png "
            alt="stars"
            className="star-image"
          />
        )}
      </div>
      <div className="display-password-delete-container">
        <button
          type="button"
          className="delete-button"
          onClick={onDeleteButton}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-image"
          />
        </button>
      </div>
    </li>
  )
}
export default passwordItem
