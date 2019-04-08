import React, { Component } from 'react'
  import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPurchases } from '../store/actions/purchase'
import Message from './message'
import './purchases.css'

class Purchases extends Component {

  static propTypes = {
    getPurchases: PropTypes.func.isRequired,
    purchases: PropTypes.array.isRequired,
    msg: PropTypes.string
  }

  static defaultProps = {
    purchases: [],
    msg: ''
  }

  componentWillMount() {
    this.props.getPurchases();
  }

  render() {

    return (
      <div>
        {this.props.purchases.length === 0 ? 
        <h4 className='text-center mt-5'>Welcome! Please, upload the csv file.</h4> 
        : null}
        {this.props.msg ? <Message /> : null}
          <div className='list'>
            {this.props.purchases.map(purchase =>
              <div className='list-item' key={purchase._id}>
                <div><strong>Customer:</strong> {purchase.user_name}</div>
                <div><strong>Order:</strong> {purchase.order_name}</div>
                <div><strong>Date of order:</strong> {purchase.date}</div>
              </div>
            )}
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  purchases: state.purchases,
  msg: state.msg
})

const dispatchToProps = (dispatch) => ({
  getPurchases: () => dispatch(getPurchases())
})

export default connect(mapStateToProps, dispatchToProps)(Purchases);
