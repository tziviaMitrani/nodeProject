import './App.css'
import Login from './components/Forms/Login'
import Register from './components/Forms/Register'
import Home from './components/Home/Home'
import Start from './components/Start'
import Info from './components/Info/Info'
import Posts from './components/Posts/Posts'
import Todos from './components/Todos/Todos'
import Comments from './components/Comments/Comments'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home/user/:name" element={<Home />} >
            <Route path="info" element={<Info />} />
            <Route path="todo" element={<Todos />} />
            <Route path='post'>
              <Route index element={<Posts />} />
            <Route path=":postId/comment" element={<Comments />} />
            </Route>
          </Route>
         <Route path="*" element={<p>This site cannot be accessed</p>} />
        </Routes>
      </Router>
    </>
  )
}


export default App
