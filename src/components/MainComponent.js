import React,{Component} from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponents';
import DishDetails from  './dishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import {addcomment} from '../redux/ActionCreators';
import { Switch, Route, Redirect,withRouter } from 'react-router-dom';
import {connect } from 'react-redux';


const mappropsToProps=props=>{
  return{
    dishes: props.dishes,
    comments: props.comments,
    promotions: props.promotions,
    leaders: props.leaders
  }
}

const mapDispatchToProps=dispatch=>({
  addcomment:(dishId,rating,author,comment)=>dispatch(addcomment(dishId,rating,author,comment))
});


class Main extends Component {

  constructor(props){
    super(props);
   
  }



  render() {
    const HomePage = () => {
      return(
          <Home
          dish={this.props.dishes.filter((dish)=>dish.featured)[0]}
          promotion={this.props.promotions.filter((promo)=>promo.featured)[0]}
          leader={this.props.leaders.filter((leader)=>leader.featured)[0]}

          />
      );
    }
    const DishWithId=({match})=>{
      return(
        <DishDetails dish={this.props.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10 ))[0]}
        comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
        addcomment={this.props.addcomment}
          />
      );
    
    }
    return (
      
      <div>
        <Header />
          <Switch>
            <Route path="/home" component={HomePage} />
              <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
              <Route exact path='/contactus' component={Contact} />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />}/>
            <Redirect path="/home" />
         </Switch>
        <Footer />
      </div>
      
    );
  }
}
  

export default withRouter(connect(mappropsToProps,mapDispatchToProps)(Main));
