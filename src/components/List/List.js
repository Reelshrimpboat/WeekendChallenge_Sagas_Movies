import React, { Component } from 'react';
import { connect } from 'react-redux';


class List extends Component {
    
    //gets then disptaches details for a movie
    selectDetails = (event) => {
        console.log('Set Details, Movie Name:' , event.target.name);

        //creates constant that holds details of selected movie
        const movieDetails = this.props.movies.filter((movie) => movie.id == event.target.id);
        
        //dispatch for movie details
        this.props.dispatch({
            type: 'SET_DETAILS',
            payload: movieDetails[0]
        })

        //changes page to details route
        this.props.history.push('/details');
    }

  render() {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">Movie:</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Populates movie table on GET return */}
                    {this.props.movies &&
                        this.props.movies.map((movie, index) => 
                        <tr key={movie.id}>
                            <td>
                                <img src={movie.poster}
                                    onClick={this.selectDetails}
                                    alt={movie.title}
                                    id={movie.id}
                                    name={movie.title}>
                                </img>
                            </td>
                            <td>
                                <h2>{movie.title}</h2>
                            </td>
                        </tr>)
                    }       
                </tbody>
            </table>
        </div>
    );
  }
  
}

const mapStateToProps = (reduxState) => ({
  movies: reduxState.movies
})

export default connect(mapStateToProps)(List);