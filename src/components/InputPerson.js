import React, { Component } from 'react'
import './PostPotluckForm.css'
export default class InputPerson extends Component {

    state = {
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false
    }

    render() {
        return(
        <div key = {this.props.i}>
            <input className = 'field'
              type="text"
              value={this.props.people}
              onChange={e => this.props.handleChangePeople(e, this.props.i)}
            />
            {this.props.suggestionsListComponent}
            &nbsp;&nbsp;
            <input className = 'remove-input'
              type="button"
              value="remove"
              onClick={() => this.props.removeClickPeople(this.props.i)}
            />
            <input className = 'add-input' type="button" value="add more" onClick={() => this.props.addClickPeople()} />
        </div>
        )
    }
}