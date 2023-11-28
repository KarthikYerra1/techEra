import {Component} from 'react'

import LoaderComponent from '../LoaderComponent'
import CourseItem from '../CourseItem'
import FailureView from '../FailureView'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TechEra extends Component {
  state = {
    technologiesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTechnologies()
  }

  getTechnologies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({
        technologiesList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  clickedRetryBtn = () => {
    this.getTechnologies()
  }

  renderLoader = () => <LoaderComponent />

  renderFailureView = () => (
    <FailureView clickedRetryBtn={this.clickedRetryBtn} />
  )

  renderTechnologies = technologies => (
    <div className="content-container">
      <Header />
      <h1 className="courses-heading">Courses</h1>
      <ul className="tech-list-container">
        {technologies.map(each => (
          <CourseItem key={each.id} details={each} />
        ))}
      </ul>
    </div>
  )

  getContent = () => {
    const {technologiesList, apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTechnologies(technologiesList)
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <div className="app-container">{this.getContent()}</div>
  }
}

export default TechEra
