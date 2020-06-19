import React, { Component } from 'react';
import { connect } from 'react-redux';


class Details extends Component {

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