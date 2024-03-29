
import { useRoutes } from 'react-router-dom'
import routerList from './routerList'

const CombineRoute = () => {
    return useRoutes(routerList)
}

export default CombineRoute


