import React, { Component } from 'react'
import Navbar from './components/Navbar'
import Newsbox from './components/Newsbox'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
export default class App extends Component {

  pagesize = 6 ;
  apikey="7bb5c3448f1d4358acccd5de49d822f2"
  
state = {
  progress : 0
}


setProgress= (progress)=>{
  this.setState({progress: progress });

}

  render() {
    
    return (
      <>
         <Router>
         <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
           <Navbar/>
          <Routes>
            <Route  exact path="/" element={<Newsbox setProgress =  {this.setProgress}    api = {this.apikey}key="general" country='in' pagesize={this.pagesize} category = 'general'/>}/>
            <Route  exact path="/home" element={<Newsbox setProgress =  {this.setProgress}    api = {this.apikey} key="home" country='in' pagesize={this.pagesize} category = 'general'/>}/>
            <Route  exact path="/business" element={<Newsbox setProgress =  {this.setProgress}    api = {this.apikey}key="business" country='in' pagesize={this.pagesize} category = 'business'/>}/>
            <Route  exact path="/entertainment" element={<Newsbox setProgress =  {this.setProgress}    api = {this.apikey}key="entertainment" country='in' pagesize={this.pagesize} category = 'entertainment'/>}/>
            <Route  exact path="/health" element={<Newsbox setProgress =  {this.setProgress}    api = {this.apikey}key="health" country='in' pagesize={this.pagesize} category = 'health'/>}/>
            <Route  exact path="/science" element={<Newsbox setProgress =  {this.setProgress}    api = {this.apikey}key="science" country='in' pagesize={this.pagesize} category = 'science'/>}/>
            <Route  exact path="/sports" element={<Newsbox setProgress =  {this.setProgress}    api = {this.apikey}key="sports" country='in' pagesize={this.pagesize} category = 'sports'/>}/>
            <Route  exact path="/technology" element={<Newsbox setProgress =  {this.setProgress}    api = {this.apikey}key="technology" country='in' pagesize={this.pagesize} category = 'technology'/>}/>
          </Routes>
       </Router>
      </>
      
    )
  }
}


