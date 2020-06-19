import React, { Component } from 'react';
import { connect } from 'react-redux';


class List extends Component {
    
    selectDetails = (event) => {
        console.log('Set Details, Movie Name:' , event.target.name);
        const movieDetails = this.props.movies.filter((movie) => movie.id == event.target.id);
        console.log('payload:', movieDetails);
        
        this.props.dispatch({
            type: 'SET_DETAILS',
            payload: movieDetails[0]
        })
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