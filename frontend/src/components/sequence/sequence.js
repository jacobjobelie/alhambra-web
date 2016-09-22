import './sequence.scss';

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import { connect } from 'react-redux';

import MagipackPlayer from './magipack_player'

import {
  REMOTE_ASSETS_DIR
} from '../../constants/config';

class Sequence extends Component {

  componentDidMount() {
    const { browser, sequence, tour } = this.props;
  }

  componentWillReceiveProps(nextProps) {
    const { browser, sequence, tour } = this.props;
    let _n = nextProps.tour.locationIndex

    if (tour.locationIndex !== _n &&
      !isNaN(_n)
    ) {
      this._newLocation(nextProps.tour.locationIndex)
    } else {
      //MagipackPlayer.hide()
    }

    if (nextProps.tour.isIn) {
      this.show()
    } else {
      this.hide()
    }


    if (nextProps.tour.speakingPlaying) {
      this.show()
    } else {
      this.hide()
    }
  }

  hide() {
    if (this.refs.magiSrc) {
      MagipackPlayer.pause()
      this.refs.magiSrc.classList.remove('is-visible')
    }
  }

  show() {
    if (this.refs.magiSrc) {
      MagipackPlayer.resume()
      this.refs.magiSrc.classList.add('is-visible')
    }
  }

  _newLocation(index) {
    const { sequence } = this.props;
    let _l = sequence.toArray()
    let _o = _.assign({}, _l[index])
    MagipackPlayer.loadAndPlay(_o, this.refs.magiSrc)
  }



  render() {
    const { browser, sequence, tour } = this.props;
    if (!sequence.size) {
      return (
        <div></div>
      );
    }
    return (
      <div ref="sequence" className="o-page sequence">
        <img ref="magiSrc"></img>
      </div>
    );
  }
}

export default connect(({ sequence, browser, tour }) => ({
  sequence,
  browser,
  tour,
}), {})(Sequence);
