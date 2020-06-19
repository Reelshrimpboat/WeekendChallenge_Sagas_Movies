import React, { Component } from 'react';
import { connect } from 'react-redux';


class Details extends Component {

    componentDidMount = () => {
        console.log('movie for details:', this.props.movie)
    }

    backToList = () => {
        this.props.history.push('/');
    }

  render() {
    return (
        <div>
            <button onClick={this.backToList}>Back To List</button>
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">{this.props.movie.title}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img src={this.props.movie.poster}></img></td>
                        <td>{this.props.movie.description}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
  }
  
}

const mapStateToProps = (reduxState) => ({
  movie: reduxState.movieDetails
})

export default connect(mapStateToProps)(Details);