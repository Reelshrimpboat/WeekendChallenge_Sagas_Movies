import React, { Component } from 'react';
import { connect } from 'react-redux';


class List extends Component {

  render() {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Movie:</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.movies &&
                        this.props.movies.map((movie, index) => 
                        <tr key={movie.id}>
                            <td>{movie.title}</td>
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