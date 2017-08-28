import React, { Component } from 'react'
import PropTypes from 'prop-types'
import qs from 'qs'

import DomainProfileHeader from './DomainProfileHeader'
import DomainStatsbar from './DomainStatsbar'
import DomainProfileInfo from './DomainProfileInfo'
import DomainProfileActionContainer from './DomainProfileActionContainer'

import './DomainProfile.css'

class DomainProfile extends Component {
  constructor (props) {
    super()

    const {params} = props.match
    const {domain} = params

    const query = qs.parse(props.location.search.substr(1))
    const action = query.action

    this.state = {
      domain,
      siteName: domain.toUpperCase().replace(/\..*/gi, ''),
      country: 'United States',
      action
    }
  }

  render () {
    const {
      domain,
      siteName,
      country,
      action
    } = this.state

    return (
      <div className='DomainProfile'>
        <div className='ui grid stackable padded'>
          <div className='row'>
            <div className='column seven wide'>
              <DomainProfileHeader
                domain={domain}
                name={siteName}
                country={country}
              />
            </div>
            <div className='column nine wide'>
              <DomainStatsbar domain={domain} />
            </div>
          </div>
          <div className='row'>
            <div className='column ten wide'>
              <DomainProfileInfo
                domain={domain}
              />
            </div>
            <div className='column six wide'>
              <DomainProfileActionContainer
                domain={domain}
                action={action}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DomainProfile.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object
}

export default DomainProfile
