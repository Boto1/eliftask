import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Message = (props) => {
    return (
      <h4 className='text-center mt-5'>{props.msg}</h4>
    )
}

Message.propTypes = {
  msg: PropTypes.string
}

const mapStateToProps = (state) => ({
  msg: state.msg
})


export default connect(mapStateToProps, () =>({}))(Message);

