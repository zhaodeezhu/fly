import {IRoutes} from '../routes';
import workCenter from './workCenter';
import Test from './Test';

const moduleRoutes = {
  workCenter,
  Test
};

function makeMenus():IRoutes[] {
  let routes:IRoutes[] = []
  Object.keys(moduleRoutes).forEach(key => {
    routes.push(
      moduleRoutes[key]
    )
  })
  return routes
}

export const routes = makeMenus()

export default moduleRoutes