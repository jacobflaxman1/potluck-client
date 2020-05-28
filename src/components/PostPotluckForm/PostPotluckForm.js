import React, { Component } from 'react'
import './PostPotluckForm.css'
import PotluckApiService from '../../services/potluck-api-service'
import PotluckContext from '../../context/PotluckContext'
import { ReactDOM } from 'react-dom'

export default class PostPotluckForm extends Component {
    static contextType = PotluckContext

    state = { 
        error: null,
        values: [""],
        people: [""],
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        indexOfInput: 0,
        focused: false
    }

    handleSubmit = e => {
        e.preventDefault()
        const { potluck_name } = e.target
        PotluckApiService.postPotluck({
            potluck_name: potluck_name.value,
            potluck_items: this.state.values,
            potluck_people: this.state.people
        })
        .then(potluck => {
            potluck_name.value = ''
            this.setState({ values: ['']})
            this.setState({ people: ['']})
            this.context.addPostedPotluck(potluck)
            this.context.setShowForm()
        })
        
        .catch(res => {
            this.setState({ error: res.error})
        })
    }
    //FOR VALUES IN STATE
    handleChange = (event, i) => {
        let values = [...this.state.values];
        let val = event.target.value;
        values[i] = val;
        this.setState({ values });
      };
      addClick = () => {
        this.setState(prevState => ({
          values: [...prevState.values, ""]
        }));
      };
      removeClick = i => {
        let values = [...this.state.values];
        values.splice(i, 1);
        this.setState({ values });
      };

      //SET STATE FOR PEOPLE IN STATE AND SUGGESTIONS
      handleChangePeople = (event, i) => {
        let people = [...this.state.people];
        let val = event.target.value;
        people[i] = val;
        this.setState({ people });
        //AUTOCOMPLETE BASED ON WHAT THEY ARE TYPING INTO INPUT
        const { users } = this.context

        let arrayOfUsers = users.map(user => {
            return Object.values(user)
        })
        const filteredSuggestions = arrayOfUsers.filter(
            suggestion => {
                return suggestion[0].toLowerCase().indexOf(val.toLowerCase()) > -1 }
        )
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true
        })
      };
      //ADD INPUT FIELD
      addClickPeople = () => {
        this.setState({people: [...this.state.people, ""]})
      };

      //DELETE INPUT FIELD
      removeClickPeople = i => {
        let people = [...this.state.people];
        people.splice(i, 1);
        this.setState({ people });
      };

      onClickSuggestion = (e, i) => {
        let { activeSuggestion, filteredSuggestions } = this.state
        let people = this.state.people
        activeSuggestion = e.target.getAttribute("data-index")
        people[this.state.indexOfInput] = (filteredSuggestions[activeSuggestion])
          this.setState({
              activeSuggestion: 0,
              filteredSuggestions: [],
              showSuggestions: false,
              people
          })
      }
      
      onFocus = (i) => {
        this.setState({ focused: true, indexOfInput: i })
      }
      onBlur = (i) => {
        this.setState({ focused: false, indexOfInput: i })
      }
      
      render() {
        const { error, filteredSuggestions, activeSuggestion } = this.state;
        const { onClickSuggestion } = this
        let suggestionsListComponent;
        let noSuggestionsList;

        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;
              if (index === activeSuggestion && this.state.focused && this.state.indexOfInput === index) {
                className = "suggestion-active";
              }
              return (
                <li data-index={index} className={className} key={suggestion} onClick={onClickSuggestion}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
        noSuggestionsList = (
          <ul className="suggestions">
          </ul>
        );
            console.log(this.state.indexOfInput)
        return (
          <form className="submit-potluck-form" onSubmit={this.handleSubmit}>
            <div> {error && <p>{error} </p>} </div>
            <label htmlFor="potluck-name"> Name Your Potluck:</label>
            <input name="potluck_name" required className = 'field'/>
            <br />
            <label htmlFor="potluck-items"> Add Items to Your Potluck: </label>
            {this.state.values.map((el, i) => (
              <div key={i}>
                <input className = 'field'
                  type="text"
                  value={this.state.values[i]}
                  onChange={e => this.handleChange(e, i)}
                />{" "}
                &nbsp;&nbsp;
                <input className = 'remove-input'
                  type="button"
                  value="remove"
                  onClick={() => this.removeClick(i)}
                />
              </div>
            ))}
            <input className = 'add-input' type="button" value="add more" onClick={() => this.addClick()} />
            <br />
            <label htmlFor="potluck-people"> Add People to Your Potluck: </label>
            {this.state.people.map((el, i) => (
                <div>
                    <input className = 'field'
                        type="text"
                        value={this.state.people[i]}
                        onChange={e => this.handleChangePeople(e, i)}
                        onFocus = {() => this.onFocus(i)}
                        onBlur = {() => this.onBlur(i)}
                    />
                    {(this.state.indexOfInput === i) ? suggestionsListComponent : noSuggestionsList}
                    &nbsp;&nbsp;
                    <input className = 'remove-input'
                        type="button"
                        value="remove"
                        onClick={() => this.removeClickPeople(i)}
                    />
                 </div>
            ))}
           <input className = 'add-input' type="button" value="add more" onClick={() => this.addClickPeople()} />
            <br />
            <button type="submit"> Post </button>
          </form>
        );
      }
    }
