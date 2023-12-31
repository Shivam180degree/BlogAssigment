import { Fragment } from 'react';
import './App.css';
import '../src/pages/Pages.css';
// Import bootstrap js files
import 'bootstrap/dist/js/bootstrap.bundle';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Post from './pages/UserPosts'
import PostItem from './components/PostItem';
import CreatePost from './pages/CreatePost';

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/posts" element={<Post /> } />
          {/* <Route path="/posts/:id" element={<PostItem /> } />
          <Route path="/users/register" element={<CreateUser /> } />
          <Route path="/posts/create" element={<CreatePost /> } /> */}
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
