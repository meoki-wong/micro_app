
import { useRoutes } from 'react-router-dom'
import routerList from './routerList'
import privateRouterList from './privateRouterList'

const CombineRoute = () => {
    return useRoutes(routerList.concat(privateRouterList))
}

export default CombineRoute


