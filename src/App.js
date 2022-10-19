import React, {Fragment} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home'
import SeriesInfo from './pages/series/info'
import SeriesPlay from './pages/series/play'

function App() {
  return (
      <Fragment>
        <Router>
          <Routes>
              <Route path={'/'} element={<Home />} />
              <Route path={'/series/:id'} element={<SeriesInfo />} />
              <Route path={'/series/:id/play/:episode'} element={<SeriesPlay />} />
          </Routes>
        </Router>
      </Fragment>
  )
}

export default App