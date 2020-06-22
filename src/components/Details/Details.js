import React, { Component } from 'react';
import { connect } from 'react-redux';


class Details extends Component {

    componentDidMount = () => {
        console.log('movie for details:', this.props.movie)
    }

    backToList = () => {
        this.props.history.push('/');
    }
    toEdit = () => {
        this.props.history.push('/Edit');
    }

  render() {
    return (
        <div>
            {this.props.movie &&
            <table>
                <thead>
                    <tr>
                        <th colSpan="3">{this.props.movie.title}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img src={this.props.movie.poster}></img></td>
                        <td className="description">{this.props.movie.description}</td>
                        <td className="genresDetails">{this.props.movie.genre_name}</td>
                    </tr>
                </tbody>
            </table>
            }
            <button onClick={this.backToList}>Back To List</button>
            <button onClick={this.toEdit}>Edit</button>
        </div>
    );
  }
  
}

const mapStateToProps = (reduxState) => ({
  movie: reduxState.movieDetails
})

export default connect(mapStateToProps)(Details);