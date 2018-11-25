//envornmnet setup imports
import 'babel-regenerator-runtime'

//React imports
import React from 'react'
import {render} from 'react-dom'
import App from './components/app/app'

//HMR imports
//import { AppContainer } from 'react-hot-loader'

//Redux Imports
import {Provider} from 'react-redux'

import reducer from './reducers'
import {configureStore, history} from './store/configure-store'



//routing Imports
import { Router, Route, Switch } from 'react-router'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'


//Page imports
import IndexPage from './components/pages/index/index-page.container'
import SearchPage from './components/pages/search/search-page.container'




//creating saga and history

//generating redux store with middleware NB routerMiddleWare must remain fist


console.log(process.env.NODE_ENV)

const store = configureStore()

const appRoot = document.getElementById('app')

const renderApp = () => {
    render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path ="/" component={IndexPage} />
                <Route exact path ="/search" component={SearchPage} />
            </Switch>
        </ConnectedRouter>
    </Provider>
    ,appRoot
    )
}
renderApp()


if (module.hot){
	module.hot.accept('./components/app/app', () => {
		renderApp()
	});
}


//allow HMR for js and css imports and auto reloading on changing html
if (process.env.NODE_ENV === "development") {
    require('./index.html')
    
}

module.hot.accept()
