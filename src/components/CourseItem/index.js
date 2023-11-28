import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {details} = props
  const {id, name, logoUrl} = details

  return (
    <li className="course-list-item">
      <Link to={`/courses/${id}`} className="link-item">
        <div className="course-link-container">
          <img src={logoUrl} alt={name} className="course-img" />
          <p className="course-name">{name}</p>
        </div>
      </Link>
    </li>
  )
}

export default CourseItem
