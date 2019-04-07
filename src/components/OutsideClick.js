import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {outsideClick , insideClick} from '../actions/aplicantionActions'

class OutsideClick extends Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
     return  this.props.outsideClick()
    }
    this.props.insideClick()
  }

  render() {
    return <div style={{width:'40%'}} ref={this.setWrapperRef}>{this.props.children}</div>;
  }
}

OutsideClick.propTypes = {
  children: PropTypes.element.isRequired,
};


export default connect(null , {outsideClick , insideClick})(OutsideClick)
