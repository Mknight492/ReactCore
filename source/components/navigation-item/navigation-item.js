import React from 'react'
import PropTypes from 'prop-types'
import styles from './navigation-item.css'
import classNames from 'classnames'

export default function NavigationItem ({path, onClickFunction, children, isCurrent}) {
    const containerClassNames = classNames(
        styles.container,
        {[styles.selected]: isCurrent},

    )
    return(
        <div className={containerClassNames}>
            <a
                className={styles.link}
                href={path}
                onClick={(e) => { 
                    e.preventDefault()
                    onClickFunction(path)
                }}
            >
                {children}
            </a>
        </div>
    )
}

NavigationItem.propTypes = {
    path: PropTypes.string.isRequired,
    onClickFunction: PropTypes.func.isRequired,
    isCurrent: PropTypes.bool.isRequired,
}