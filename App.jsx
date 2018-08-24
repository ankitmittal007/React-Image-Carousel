import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactBootstrap from 'react-bootstrap';
import Carousel from './ReactImageCarousel.js';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';


const imagesJSON = [     // Modify Accordingly
    {url: '../images/av1.jpg'},
    {url: '../images/kf1.jpg'},
    {url: '../images/jl1.jpg'},
    {url: '../images/mm1.jpg'},
    {url: '../images/dd1.jpg'}
];
const images = [];  // Can Get the same from API Call
 imagesJSON.forEach(function(obj,index){
    images.push(obj.url);
 });

class App extends React.Component {
  constructor(props) {
    super(props);

  }
   render() {
      return (
        <div className="strategy-carousel-container" >
           <div>Hiiiiiiiii</div> 
            <Carousel images={images} 
                        thumb={true}
                        loop={true}
                        autoplay={3000} />
            </div>
      );
   }
}

export default App;
