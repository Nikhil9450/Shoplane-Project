// import logo from './logo.svg';
import './App.css';
import { Route,Routes,Navigate } from 'react-router-dom';
// import Dashboard from './components/Pages/Dashboard/Dashboard';
// import Login from './components/Pages/Login/Login';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect,useState } from "react";
import {auth} from "./firebase";
import Home from './Components/Home';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar';
// import RecipeInfo from './components/RecipeInfo';
// import ViewRecipe from './components/ViewRecipe';
// import AddRecipe from './components/Pages/AddRecipe';
// import AddFilter from './components/Pages/AddFilter';
// import MyRecipes from './components/Pages/MyRecipes';
// import LikedRecipes from './components/Pages/LikedRecipes';

function App() {
  const[authUser,setAuthUser]=useState(null);
  useEffect(()=>{
      const listen = onAuthStateChanged(auth,(user)=>{
          if(user){
              setAuthUser(user)
              console.log("user-------->",user);
          }else{
              setAuthUser(null);
              console.log("user-------->",user);

          }
      })
  },[]);

  return (
    <>
    {authUser?
    <div>
       <Navbar/>
        <Routes>
              {/* {authUser?<Route path='/' element={<Dashboard/>} />:<Route path='/' element={<Login/>} />}  */}
              {/* <Route path='/' element={<Login/>} /> */}
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/" element={<Home/>} />

              {/* <Route path="/view_recipe" element={<ViewRecipe/>} /> */}
        </Routes>
    </div>
    :
    <div className='login_route'>
      <Routes>
          <Route path='/' element={<Login/>} />
          <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
    }
    </>
  );
}

export default App;

