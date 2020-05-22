import React, { Component } from 'react'

const PotluckListContext = React.createContext({
  potluckList: [],
  error: null,
  user: '',
  setError: () => {},
  clearError: () => {},
  setPotluckList: () => {},
  setUser: () => {}
})
export default PotluckListContext

export class PotluckListProvider extends Component {
  state = {
    potluckList: [],
    user: '',
    error: null,
  };

  setPotluckList = potluckList => {
    this.setState({ potluckList })
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setUser = (user) => {
    this.setState({ user })
  }

  render() {
    const value = {
      potluckList: this.state.potluckList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setPotluckList: this.setPotluckList,
      setUser: this.setUser
    }
    return (
      <PotluckListContext.Provider value={value}>
        {this.props.children}
      </PotluckListContext.Provider>
    )
  }
}
