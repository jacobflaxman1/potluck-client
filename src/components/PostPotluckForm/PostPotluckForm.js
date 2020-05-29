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
        focused: false,
        currentStep: 1
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
      
      nextStep = () => {
        let currentStep = this.state.currentStep
        // If the current step is 1 or 2, then add one on "next" button click
        currentStep = currentStep >= 2? 3: currentStep + 1
        this.setState({
          currentStep: currentStep
        })
      }

      prevStep = () => {
        let currentStep = this.state.currentStep
        // If the current step is 2 or 3, then subtract one on "previous" button click
        currentStep = currentStep <= 1? 1: currentStep - 1
        this.setState({
          currentStep: currentStep
        })
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
            console.log(this.state.values, this.state.people)
        return (
          <form className="submit-potluck-form" onSubmit={this.handleSubmit}>
            <div> {error && <p>{error} </p>} </div>
         {this.state.currentStep === 1 && <> <label htmlFor="potluck-name"> Name Your Potluck:</label>
            <input name="potluck_name" required className = 'field'/>
            <button onClick = {this.nextStep}> next step </button>
             </> }
            <br />
           {this.state.currentStep === 2 && <>
            <label htmlFor="potluck-items"> Add Items to Your Potluck </label>
            {this.state.values.map((el, i) => (
              <div key={i} className = 'additems'>
                <input className = 'field'  
                  type="text"
                  value={this.state.values[i]}
                  onChange={e => this.handleChange(e, i)}
                />{" "}
                &nbsp;&nbsp;
                <input className = 'remove-input'
                  type="button"
                  value="-"
                  onClick={() => this.removeClick(i)}
                />
              </div>
            ))}
            <input className = 'add-input' type="button" value="Add More Items" onClick={() => this.addClick()} />
            <button onClick = {this.nextStep}> next step </button>
            </>}
            <br />
           {this.state.currentStep === 3 && <>
            <label htmlFor="potluck-people"> Add Friends By UserName </label>
            {this.state.people.map((el, i) => (
                <div className = 'addpeople' key = {i}>
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
                        value="-"
                        onClick={() => this.removeClickPeople(i)}
                    />
                 </div>
            ))}
           <input className = 'add-input' type="button" value="Add Another Person" onClick={() => this.addClickPeople()} />
            </>}
            <br />
           <button type="submit" className = 'submit-post'> Create </button>
          </form>
        );
      }
    }
