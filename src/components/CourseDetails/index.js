import {Component} from 'react'

import Header from '../Header'
import LoaderComponent from '../LoaderComponent'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseDetails extends Component {
  state = {
    courseDetails: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        courseDetails: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  clickedRetryBtn = () => {
    this.getCourseDetails()
  }

  renderLoader = () => <LoaderComponent />

  renderFailureView = () => (
    <FailureView clickedRetryBtn={this.clickedRetryBtn} />
  )

  renderCourseDetails = details => {
    const {name, imageUrl, description} = details
    return (
      <div className="course-container">
        <Header />
        <div className="course-details-container">
          <div className="course-details">
            <img src={imageUrl} alt={name} className="specific-course-image" />
            <div className="details-container">
              <h1 className="specific-course-name">{name}</h1>
              <p className="specific-course-description">{description}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  getCourseInfo = () => {
    const {apiStatus, courseDetails} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseDetails(courseDetails)
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="specific-course-container">{this.getCourseInfo()}</div>
    )
  }
}

export default CourseDetails
