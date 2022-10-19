import React, {Fragment} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home'
import SeriesIndex from './pages/series/index'
import SeriesInfo from './pages/series/info'
import SeriesPlay from './pages/series/play'

import SeriesAdd from './pages/series/add'

function App() {
  return (
      <Fragment>
        <Router>
          <Routes>
              <Route path={'/'} element={<Home />} />
              <Route path={'/series'} element={<SeriesIndex />} />
              <Route path={'/series/:id'} element={<SeriesInfo />} />
              <Route path={'/series/:id/play/:episode'} element={<SeriesPlay />} />
              <Route path={'/admin/series/add'} element={<SeriesAdd />} />
          </Routes>
        </Router>
      </Fragment>
  )
}

export default App