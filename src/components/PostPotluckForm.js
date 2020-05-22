import React, { Component } from 'react'
import './PostPotluckForm.css'
import PotluckApiService from '../services/potluck-api-service'
import PotluckContext from '../context/PotluckContext'


export default class PostPotluckForm extends Component {
    static contextType = PotluckContext

    state = { error: null, values: [""], people: [""] }

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
            this.props.history.push('/')
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
      //FOR PEOPLE IN STATE
      handleChangePeople = (event, i) => {
        let people = [...this.state.people];
        let val = event.target.value;
        people[i] = val;
        this.setState({ people });
      };
      addClickPeople = () => {
        this.setState(prevState => ({
          people: [...prevState.people, ""]
        }));
      };
      removeClickPeople = i => {
        let people = [...this.state.people];
        people.splice(i, 1);
        this.setState({ people });
      };
      render() {
        const { error } = this.state;
        return (
          <form className="submit-potluck-form" onSubmit={this.handleSubmit}>
            <div> {error && <p>{error} </p>} </div>
            <label htmlFor="potluck-name"> Name Your Potluck:</label>
            <input name="potluck_name" required />
            <br />
            <label htmlFor="potluck-items"> Add Items to Your Potluck: </label>
            {this.state.values.map((el, i) => (
              <div key={i}>
                <input
                  type="text"
                  value={this.state.values[i]}
                  onChange={e => this.handleChange(e, i)}
                />{" "}
                &nbsp;&nbsp;
                <input
                  type="button"
                  value="remove"
                  onClick={() => this.removeClick(i)}
                />
              </div>
            ))}
            <input type="button" value="add more" onClick={() => this.addClick()} />
            <br />
            <label htmlFor="potluck-people"> Add People to Your Potluck: </label>
            {this.state.people.map((el, i) => (
              <div key={i}>
                <input
                  type="text"
                  value={this.state.people[i]}
                  onChange={e => this.handleChangePeople(e, i)}
                />{" "}
                &nbsp;&nbsp;
                <input
                  type="button"
                  value="remove"
                  onClick={() => this.removeClickPeople(i)}
                />
                <input type="button" value="add more" onClick={() => this.addClickPeople()} />
              </div>
            ))}
 
            <br />
            <button type="submit"> Post </button>
          </form>
        );
      }
    }