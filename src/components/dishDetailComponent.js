import React from 'react';
import { Card,CardImg,CardBody,CardTitle,CardText } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Breadcrumb,BreadcrumbItem} from 'reactstrap';


  function RenderDish({dish}){
   
      return(
      <Card className="col-12 col-md-5 m-1"> 
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>);    
  }
  function RenderComment({comment}){
    if(comment!=null)
    return(
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {comment.map((comments) => {
            return(
              <li key={comments.id}>
                <p>{comments.comment}</p>
                
              <p>  --{comments.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</p>

              </li>
            );
          })}
        </ul>
      </div>
    );
}
const DishDetail = (props) => {
  if(props.dish!=null)
        return(
          <div className="container">
             <div className="row">
              <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
              </div>
            </div>
            <div className="row">
                <RenderDish dish={props.dish} />
                <RenderComment comment={props.comments} />
            </div>
          </div>
    );
  else
    return(
      <div> </div>
    );
}

export default DishDetail;