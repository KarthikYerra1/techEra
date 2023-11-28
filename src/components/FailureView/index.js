import Header from '../Header'

import './index.css'

const FailureView = props => {
  const {clickedRetryBtn} = props

  const onClickRetry = () => {
    clickedRetryBtn()
  }

  return (
    <>
      <Header />
      <div className="failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
          className="failure-view-image"
        />
        <h1 className="failure-view-main">Oops! Something Went Wrong</h1>
        <p className="failure-view-description">
          We cannot seem to find the page you are looking for.
        </p>
        <button type="button" className="retry-button" onClick={onClickRetry}>
          Retry
        </button>
      </div>
    </>
  )
}

export default FailureView
