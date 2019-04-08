import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Purchases from './components/purchases'
import Button from './components/button'

class App extends Component {

  render () {
    return (
      <Provider store={ store }>
        <div className="container">
          <div className='jumbotron mt-4 pl-5 pr-5'>
            <div className='row justify-content-between'>
              <h3 className='heading'>Customers List</h3>
              <Button />
            </div>
            <Purchases />
          </div>
        </div>
      </Provider>
    )
  }
}

export default App
