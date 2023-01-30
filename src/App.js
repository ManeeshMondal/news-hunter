
// import './App.css'; 
import React, { useState } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'  

const App =()=>{
 const apikey=process.env.REACT_APP_NEWS_API 
 const [progress, setProgress] = useState(0);
  
    return (
      <div>
       <Router>
          <Navbar/>
          <LoadingBar
           color='#f11946'
           progress={progress}
      />
          <Switch>
            <Route exact path="/"><News  setProgress={setProgress} apikey={apikey}  key="general" pagesize={12} country="in" category="general"/></Route>
            <Route exact path="/business"><News  setProgress={setProgress} apikey={apikey} key="business" pagesize={12} country="in" category="business "/></Route>
            <Route exact path="/entertainment"><News  setProgress={setProgress} apikey={apikey} key="entertainment" pagesize={12} country="in" category="entertainment"/></Route>
            <Route exact path="/health"><News  setProgress={setProgress} apikey={apikey} key="health" pagesize={12} country="in" category="health"/></Route>
            <Route exact path="/science"><News  setProgress={setProgress} apikey={apikey} key="science" pagesize={12} country="in" category="science"/></Route>
            <Route exact path="/sports"><News  setProgress={setProgress} apikey={apikey} key="sports" pagesize={12} country="in" category="sports"/></Route>
            <Route exact path="/technology"><News  setProgress={setProgress} apikey={apikey} key="technology" pagesize={12} country="in" category="technology"/></Route>
            </Switch>
        </Router>
      </div>
    )
  
}
export default App;

