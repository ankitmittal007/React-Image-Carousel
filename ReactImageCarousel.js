import React,{Component} from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Carousel extends Component{
	constructor(props) {
		super(props);
		this.state ={
			currentId: 0
		};
		this.setCurrent = this.setCurrent.bind(this);
		this.addCurrent = this.addCurrent.bind(this);
		this.subCurrent = this.subCurrent.bind(this);
		this.navigateTo = this.navigateTo.bind(this);
		//this.getMainImgStyle = this.getMainImgStyle.bind(this);
	}
	
	componentDidMount () {
		if (this.props.autoplay > 0){
			this._timer = setInterval( () => this.setCurrent(this.state.currentId + 1), this.props.autoplay);
		}		
	}
	componentWillUnmount () {
		if (this._timer)
			clearInterval(this._timer );
	}
	
	navigateTo(url){
		window.location=url;
	}
	addCurrent(){
		this.setCurrent( this.state.currentId + 1);
	}
	subCurrent(){
		this.setCurrent( this.state.currentId - 1);
	}
	setCurrent(id){
		let images = this.props.images || [];
		if (this.props.loop){
			id = (id + images.length) % images.length;
		}else{
			id = (id < 0)? 0: ((id >= images.length)? images.length - 1 : id);
		}
		this.setState({	currentId: id});
	}
	render(){
		let images = this.props.images || [];
		let cImage= images[this.state.currentId];
		return (
			<div className="carousel">
				<div className="carousel-main" alt="">
				
						<img src={cImage} key={cImage} /> {/*onClick={this.navigateTo(imgUrl)}*/}
					
				</div>
				<div className="prev" onClick={this.subCurrent}/>
				<div className="next" onClick={this.addCurrent}/>
				<Footer images={images} currentId={this.state.currentId} setCurrent={this.setCurrent} thumb={this.props.thumb} />
			</div>
		);
	}
}
Carousel.propTypes = {
  images: PropTypes.array.isRequired,
  thumb: PropTypes.bool,
  loop: PropTypes.bool ,
  autoplay: PropTypes.number 
};

Carousel.defaultProps = {
  images: [],
  thumb: true,  // for dots
  loop: true
};

class Footer extends React.Component{
	constructor(props) {
		super(props);
		this.getActiveStyle = this.getActiveStyle.bind(this);
		this.getFooterStyle = this.getFooterStyle.bind(this);
		this.changeCurrent = this.changeCurrent.bind(this);		
	}
	getActiveStyle(id){
		let s = {
			opacity: (id === this.props.currentId)?1:.5
		};
		if (this.props.thumb){
			s.backgroundImage = `url( ${this.props.images[id]})`;
		}
		return s;
	}
	getFooterStyle(){
		let s = {};
		if (!this.props.thumb){
			s.height = "30px";
		}
		return s;
	}
	changeCurrent(e){
		let id = parseInt(e.target.getAttribute("data-id"));
		this.props.setCurrent(id);
	}
	render(){
		let footerClass= this.props.thumb?"carousel-thumb":"carousel-dot";
		return (
			<div className="carousel-footer" style={this.getFooterStyle()}>
				<div className="box">
				{
					this.props.images.map((item, id) => (<div className={footerClass} key={id} data-id={id} style={this.getActiveStyle(id)} onClick={this.changeCurrent} />))
				}
				</div>
			</div>
		);
	}
}
Footer.propTypes = {
  images: React.PropTypes.array.isRequired,
  thumb: React.PropTypes.bool,
  currentId: React.PropTypes.number,
  setCurrent: React.PropTypes.func.isRequired
};


export default Carousel;


