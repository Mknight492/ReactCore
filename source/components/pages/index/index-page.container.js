import { connect } from 'react-redux'
import indexPage from './index-page'
import { addTestGenerator} from '../../../actions/testActions'

function mapStateToProps (state) {
    return {
        
    }
}

function mapDispatchToProps (dispatch) {
    return {
        addTest: (test) => {
            dispatch(addTestGenerator(test))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(indexPage)