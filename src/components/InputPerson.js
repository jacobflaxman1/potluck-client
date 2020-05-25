import React, { Component } from 'react'

export default class InputPerson extends Component {

    state = {
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false
    }

    render() {
        return(
        <div>
            <input
              type="text"
              value={this.props.people}
              onChange={e => this.props.handleChangePeople(e, this.props.i)}
              onKeyDown={this.props.onKeyDown}
            />
            {this.props.suggestionsListComponent}
            &nbsp;&nbsp;
            <input
              type="button"
              value="remove"
              onClick={() => this.props.removeClickPeople(this.props.i)}
            />
            <input type="button" value="add more" onClick={() => this.props.addClickPeople()} />
        </div>
        )
    }
}