import {observable, action} from 'mobx'

class Common {
  /** 屏幕变化的判断 */
  @observable screenWidthCheck:boolean = false;
  /** 主页和介绍页的切换 */
  @observable pageToggleCheck:boolean = false;
  /** 菜单折叠 */
  @observable menuState:boolean = false

  constructor () {}
  /** 改变数据的值 */
  @action 
  changeStateValue<T>(name:string, value:T) {
    console.log(value)
    this[name] = value
  }
  @action
  changeScreenWidth (screenWidthCheck:boolean) {
    this.screenWidthCheck = screenWidthCheck
  }
  @action
  changePageToggleCheck(pageToggleCheck:boolean) {
    this.pageToggleCheck = pageToggleCheck
  }
}

export default new Common()