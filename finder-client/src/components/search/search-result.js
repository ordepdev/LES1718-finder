import React, { Component } from 'react';

class SearchResult extends Component {
  render() {
    return (
      <div>
        {
            this.props.data.errorData === undefined &&
            <div>
                <span>Name: {this.props.data.roomData.name}</span><br/>
                <span>Coordinates: {this.props.data.roomData.coordinates}</span>
            </div>
        }

        {
            this.props.data.errorData !== undefined &&
            <div>
                {this.props.data.errorData}
            </div>
        }
        
      </div>
    );
  }
}

export default SearchResult;
