import { connect } from 'react-redux'
import { push } from 'react-router-redux' //pushes path onto router stack
import Navigation from './navigation'


const pages =[
    {path: '/', title: 'Index'},
    {path: '/search', title: 'Search'},

]

function mapStateToProps (state) {
    return { 
        pages,
        currentPath: state.router.location.pathname,
    }
}

function mapDispatchToProps (dispatch) {
    return {
        navigate: (path) => dispatch(push(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)