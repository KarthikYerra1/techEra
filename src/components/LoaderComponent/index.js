import Loader from 'react-loader-spinner'

import './index.css'

const LoaderComponent = () => (
  <div className="loader" data-testid="loader">
    <Loader type="ThreeDots" color="#475569" height={50} width={50} />
  </div>
)

export default LoaderComponent
