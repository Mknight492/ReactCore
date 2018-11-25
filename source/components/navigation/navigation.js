import React from 'react'
import PropTypes from 'prop-types'
import NavigationItem from '../navigation-item/navigation-item'
import styles from './navigation.css'


export default function Navigation ({ navigate, pages, currentPath }) {
    
    
    const items = pages.map(({title, path}, index) => (
        <NavigationItem
            key={index}
            path={path}
            onClickFunction ={navigate}
            isCurrent={path === currentPath}
        >
            {title}
        </NavigationItem>
    ))
    const stylesKeys = Object.values(styles)
    const stylesTag = stylesKeys.reduce ((acc, cur) => {return acc + ' ' + cur})
    return(
        <div className={stylesTag}>
            {items}
        </div>
    )
}

Navigation.propTypes = {
    pages: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
    navigate: PropTypes.func.isRequired,
    currentPath: PropTypes.string.isRequired,
}