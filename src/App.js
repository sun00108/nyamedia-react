import React, {Fragment} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home'
import SeriesIndex from './pages/series/index'
import SeriesInfo from './pages/series/info'
import SeriesPlay from './pages/series/play'
import WishList from './pages/wish/index'
import StaffList from './pages/staff/index'
import StaffInfo from './pages/staff/info'
import OnAirIndex from "./pages/onair/index";
import OnAirAdd from "./pages/onair/add";
import TagList from "./pages/tag/index";
import SeriesEdit from './pages/series/edit'
import StreamPlay from './pages/stream/play'
import MovieList from './pages/movie/index'

import SeriesAdd from './pages/series/add'
import StreamAdd from './pages/stream/add'
import MovieAdd from './pages/movie/add'
import StaffAdd from './pages/staff/add'
import RelationshipAdd from "./pages/relationship/add";

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
              <Route path={'/stream/:id'} element={<StreamPlay />} />
              <Route path={'/movie'} element={<MovieList />} />
              <Route path={'/admin/stream/add'} element={<StreamAdd />} />
              <Route path={'/admin/movie/add'} element={<MovieAdd />} />
              <Route path={'/wishlist'} element={<WishList />} />
              <Route path={'/staff'} element={<StaffList />} />
              <Route path={'/staff/:id'} element={<StaffInfo />} />
              <Route path={'/staff/add'} element={<StaffAdd />} />
              <Route path={'/relationship/add'} element={<RelationshipAdd />} />
              <Route path={'/onair'} element={<OnAirIndex />} />
              <Route path={'/onair/add'} element={<OnAirAdd />} />
              <Route path={'/tag'} element={<TagList />} />
              <Route path={'/series/:id/edit'} element={<SeriesEdit />} />
          </Routes>
        </Router>
      </Fragment>
  )
}

export default App