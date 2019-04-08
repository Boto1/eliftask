import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadDocumentRequest } from '../store/actions/fileUpload';

const Button = (props) => {
  const handleFileUpload = (files) => {
    props.uploadDocumentRequest(files[0])
    document.getElementById('inputfile').value = '';
  }

  return (
    <div>
      <div className="input-group">
        <div className="custom-file">
          <input type="file" className="custom-file-input" id="inputfile" onChange={(e) => handleFileUpload(e.target.files)} />
          <label className="custom-file-label" htmlFor="inputfile" aria-describedby="inputGroupFileAddon02">Choose file</label>
        </div>
      </div>
    </div>
  )
}

Button.propTypes = {
  uploadDocumentRequest: PropTypes.func.isRequired
}

const dispatchToProps = (dispatch) => ({
  uploadDocumentRequest: (file) => dispatch(uploadDocumentRequest(file))
})

export default connect(() => ({}), dispatchToProps)(Button);

