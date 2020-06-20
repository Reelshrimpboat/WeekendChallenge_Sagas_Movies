import React, { Component } from 'react';
import { connect } from 'react-redux';


class Edit extends Component {

    state = {
        id: this.props.movie.id,
        title: this.props.movie.title,
        poster: this.props.movie.poster,
        description: this.props.movie.description
    }

    componentDidMount = () => {
        console.log('movie for edit:', this.props.movie)
    }

    handleTitleChange = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    handleDescriptionChange = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    cancelButton = () => {
        //returns page to details route
        this.props.history.push('/details');
    }

    saveButton = () => {
        console.log('EDIT_DETAILS', this.state);
        if(this.state.id){

        this.props.dispatch({
            type: 'EDIT_DETAILS',
            payload: this.state
        })

        //this is a bandaid!! FIX
        this.props.dispatch({
            type: 'SET_DETAILS',
            payload: this.state
        })

        this.props.history.push('/details')
        }
        else{
            this.props.history.push('/');
        }

    }

  render() {
    return (
        <div>
            {this.props.movie &&
                <div>
                    <p>Current Title: {this.props.movie.title}</p>
                    <input value={this.state.title} onChange={this.handleTitleChange}></input>
                    <p>Current Description: {this.props.movie.description}</p>
                    <textarea value={this.state.description} onChange={this.handleDescriptionChange}></textarea>
                </div>
            }
            <button onClick={this.cancelButton}>Cancel</button>
            <button onClick={this.saveButton}>Save</button>
        </div>
    );
  }
  
}

const mapStateToProps = (reduxState) => ({
  movie: reduxState.movieDetails
})

export default connect(mapStateToProps)(Edit);