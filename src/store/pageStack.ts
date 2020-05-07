import {observable, action} from 'mobx';
import {IRoutes, IHistory} from '../base.d'

class PageStack {
  /** 页面栈 */
  @observable pageStack:IRoutes[] = [];
  /** 当前页面栈 */
  @observable acitveKey:string = '';
  /** 改变数据的值 */
  @action 
  changeStateValue<T>(name:string, value:T) {
    this[name] = value
  }

  /** 页面栈中增加页面 */
  @action
  addPage(route:IRoutes, history:IHistory):void {
    let index:number = this.isPageExist(route);
    console.log(index)
    if(index === -1) {
      this.pageStack.push(route);
    }
    this.pageSwitch(route.path, history);
  }

  /** 页面栈中减少页面 */
  @action
  removePage(route:IRoutes|string, history:IHistory):void {
    let index = this.isPageExist(route);
    console.log(index)
    if(index > -1) {
      let remove = this.pageStack[index]
      this.pageStack.splice(index, 1);
      if(remove.path === this.acitveKey) {
        if(index > 0) {
          this.pageSwitch(index - 1, history);
        } else if (this.pageStack.length > 0) {
          this.pageSwitch(index, history);
        } else {
          this.acitveKey= ''
          history.push('/index')
        }
      }
    }
  }

  /** 切换页面 */
  @action
  pageSwitch(index:number|string, history:IHistory):void {
    if(typeof index === 'string') {
      this.acitveKey = index;
    } else {
      this.acitveKey = this.pageStack[index].path;
    }
    history.push(this.acitveKey)
  }
  /** 判断页面是否存在 */
  private isPageExist(route:IRoutes|string):number {
    return this.pageStack.findIndex(page => {
      if(typeof route === 'string') {
        return page.path === route
      } else {
        return page.path === route.path;
      }
    })
  }
}

export default new PageStack();