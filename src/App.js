import {Switch, Route, Redirect} from 'react-router-dom'

import NotFound from './components/NotFound'
import TechEra from './components/TechEra'
import CourseDetails from './components/CourseDetails'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={TechEra} />
    <Route exact path="/courses/:id" component={CourseDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
