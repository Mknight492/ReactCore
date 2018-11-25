import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

export default function IndexPage(){
    return(
        <div>
            <h2>Index bitches</h2>
            <Link to="/search"> Go To Search</Link>
        </div>
    )
}

IndexPage.propTypes ={
    //tests: PropTypes.array.isRequired,
    //addTest: PropTypes.func.isRequired
}