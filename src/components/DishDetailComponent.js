import React, { Component } from 'react';
import { Card,CardImg,CardBody,CardTitle,CardText,Modal,ModalBody,ModalHeader,Button,Row,Col,Label } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Breadcrumb,BreadcrumbItem} from 'reactstrap';
import { render } from '@testing-library/react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


class CommentForm extends Component{

  constructor(props){
    super(props);
    this.toggleModal = this.toggleModal.bind(this);

    this.state = {

      isModalOpen:false
    }

  }
  toggleModal(){
    this.setState(
        {
            isModalOpen:!this.state.isModalOpen
        }
    );
  }
    handleSubmit(values) {
      this.toggleModal();
      this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);

  }
  render(){
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
    return(
      <div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
            <Row className="form-group">
            <Label htmlFor="rating" md={12}>Rating</Label>
            </Row>
            <Row className="form-group">
              <Col md={{size: 12}}>
                  <Control.select model=".rating" name="rating"
                      className="form-control">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                  </Control.select>
              </Col>
          </Row>
            <Row className="form-group">
              <Label htmlFor="your_name" md={10}>Your Name</Label>
              </Row>
              <Row className="form-group">
                <Col md={12}>
                  <Control.text model=".your_name" id="your_name" name="your_name"
                      placeholder="Your Name"
                      className="form-control" md={10}
                      validators={
                          {required,maxLength:maxLength(15),minLength:minLength(3)}}
                        />
                  <Errors
                      className="text-danger"
                      model=".your_name"
                      show="touched"
                      messages={{
                          required: 'Required',
                          minLength: 'Must be greater than 2 characters',
                          maxLength: 'Must be 15 characters or less'
                      }}
                      >
                  </Errors>
                  </Col>
              
              </Row>
              <Row className="form-group">
                  <Label htmlFor="comment" md={10}>Comment</Label>
                  </Row>
                  <Row className="form-group">
                  <Col md={12}>
                      <Control.textarea model=".comment" id="comment" name="comment"
                          rows="12"
                          className="form-control"  />
                  </Col>
              </Row>
              <Row className="form-group">
                  <Col md={{size:12}}>
                      <Button type="submit" color="primary">
                      Submit
                      </Button>
                  </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
        <Button  onClick={this.toggleModal} color="basic">
           <span className="fa fa-pencil fa-lg"></span>Submit Comment
       </Button>
      </div>
      
    );
  }
  
}

  function RenderDish({dish}){
   
      return(
      <Card className="col-12 col-md-5 m-1"> 
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>);    
  }
  function RenderComment({comment,postComment,dishId}){
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
        <CommentForm dishId={dishId} postComment={postComment} />
      </div>
    );
}
const DishDetail = (props) => {
  if(props.isLoading){
    return(
  <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
    
  }
  else if(props.errMess){
    return(
<div className="container">
      <div className="row">
        <h4>{props.errMess}</h4>
      </div>
  </div>
    );
    
  }
  else if(props.dish!=null)
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
                <RenderComment comment={props.comments}
        postComment={props.postComment}
        dishId={props.dish.id}
      />
              </div>
          </div>
    );
  else
    return(
      <div> </div>
    );
}

export default DishDetail;