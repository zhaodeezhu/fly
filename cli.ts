import config from './cli/index'
const program = require('commander');
const fs = require('fs')
const Colors = require('colors/safe')

Colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

program
  .version('1.0.0')
  .option('-a, --add <fileName>', 'add Something')
  .option('-p, --path <fileName>', 'add Something')
  .option('-t, --title <fileName>', 'add Something')
  .parse(process.argv);
  
/** 脚手架对象 */
class FlyCli {
  /** 程序名 */
  fileName:string = program.add;
  /** 路径 */
  dirPath:string = program.path ? `${config.rootPagePath}/${program.path}/${this.fileName}` : `${config.rootPagePath}/${this.fileName}`
  /** 模块名 */
  moduleName:string = program.path;
  /** 标题 */
  title:string = program.title;
  /** 添加模块 */
  addModule() {
    if (program.add) {
      let fileName = program.add
      let dirPath = program.path ? `${config.rootPagePath}/${program.path}/${fileName}` : `${config.rootPagePath}/${fileName}`
      let data = fs.readFileSync('./cli/demo.ts', 'utf8');
      data = data.replace('{{Demo}}', fileName)
      data = data.replace('{{class}}', fileName.toLowerCase())
      console.log(Colors.silly(`You create module: `), fileName);
      let dirPathArr = dirPath.split('/');
      let dataPathStr = ''
      let flag = true
      for(let i = 0; i < dirPathArr.length; i++) {
        if(i === 0) {
          dataPathStr += dirPathArr[i]
        } else {
          dataPathStr += '/' + dirPathArr[i]
        }
    
        let statObj = fs.existsSync(dataPathStr)
        
        if(i === dirPathArr.length - 1 && statObj) {
          console.log(Colors.error('【error!!!】' + dataPathStr + ' 模块名重复，请修改重新创建'))
          flag = false
          break;
        }
    
        if(!statObj) {
          fs.mkdirSync(`${dataPathStr}`)
        }
      }
    
      if(!flag) {
        return false
      }
  
      fs.writeFileSync(`${dirPath}/${fileName}.tsx`, data);
      fs.writeFileSync(`${dirPath}/index.less`, `.fly-${fileName.toLowerCase()} {}`);
      fs.writeFileSync(`${dirPath}/index.ts`, `import ${fileName} from './${fileName}'\nexport default ${fileName}`);
      this.makeModuleIndex();
      console.log(Colors.green(`【successful!!!】Module '${fileName}' is created, in ${dirPath}`))
      return true
    }
    return true
  }
  // 三步走
  /** 判断模块是否存在 */
  isEsist():boolean {
    let statFlag = fs.existsSync(`src/router/moduleRoutes/${this.moduleName}.ts`);
    return statFlag
  }

  /** 生成模块文件 */
  makeModuleIndex() {
    if(this.isEsist()) {
      let fileData = fs.readFileSync(`src/router/moduleRoutes/${this.moduleName}.ts`, 'utf8');
      let fileDataArr = fileData.split('\n');
      // 引入模块处理
      let importIndex = fileDataArr.indexOf('export default {');
      fileDataArr.splice(importIndex, 0, `const ${this.firstModuleNameUpper} = React.lazy(() => import('@/pages/${this.moduleName}/${this.fileName}'));`);
      // 插入具体的路由处理
      let routerIndex = fileDataArr.length - 3;
      fileDataArr.splice(routerIndex, 1, '    },');
      let routerModule = `    {\n      path: '/index/${this.moduleName}/${this.fileName}',\n      Component: ${this.firstModuleNameUpper},\n      exact: true,\n      meta: {\n        title: '${this.title}',\n        show: true\n      }\n    }`
      fileDataArr.splice(routerIndex + 1, 0, routerModule);
      let data = fileDataArr.join('\n')
      // 将数据重新写回文件
      fs.writeFileSync(`src/router/moduleRoutes/${this.moduleName}.ts`, data)
    } else {
      let moduleIndexData = fs.readFileSync('cli/moduleIndex.ts', 'utf8');
      moduleIndexData = moduleIndexData.replace(/{{name}}/g, this.firstModuleNameUpper);
      moduleIndexData = moduleIndexData.replace(/{{path}}/, `${this.moduleName}/${this.fileName}`);
      moduleIndexData = moduleIndexData.replace(/{{base}}/, `${this.moduleName}`);
      moduleIndexData = moduleIndexData.replace(/{{router}}/, `${this.moduleName}/${this.fileName}`.toLocaleLowerCase());
      moduleIndexData = moduleIndexData.replace('{{title}}', this.title);
      // 创建路由表文件
      fs.writeFileSync(`src/router/moduleRoutes/${this.moduleName}.ts`, moduleIndexData);
      // 将文件引入到导出文件中
      this.willModuleIndex();
      // 改变路由文件
      this.explainInsertRoutes();
    }
  }

  /** 将新建的模块引入到导出文件中 */
  willModuleIndex() {
    // 读取文件
    let data = fs.readFileSync('src/router/moduleRoutes/index.ts', 'utf8');
    // 获取import个数
    let importLength = data.match(/import/g).length;
    // 使用/n分割源文件
    let sourceFileArr = data.split('\n');
    sourceFileArr.splice(importLength, 0, `import ${this.moduleName} from './${this.moduleName}';`)
    let moduleIndex = sourceFileArr.indexOf('};');
    sourceFileArr.splice(moduleIndex - 1, 1, `${sourceFileArr[moduleIndex - 1]},`);
    sourceFileArr.splice(moduleIndex, 0, `  ${this.moduleName}`);
    let indexData = sourceFileArr.join('\n');
    fs.writeFileSync(`src/router/moduleRoutes/index.ts`, indexData);
  }

  /** 解析插入到路由表中 */
  explainInsertRoutes() {
    // 读取路由文件
    let data = fs.readFileSync('src/router/routes.ts', 'utf8');
    // 解析要插入的位置
    let dataArrReverse = data.split('\n').reverse();
    
    let insertReverseIndex = dataArrReverse.findIndex((item:any) => {
      return item.indexOf('moduleRoutes') > -1;
    })
    let dataArr = dataArrReverse.reverse();
    let insertIndex = dataArrReverse.length - insertReverseIndex;
    dataArr.splice(insertIndex - 1, 1, `${dataArr[insertIndex - 1]},`);
    dataArr.splice(insertIndex, 0, `          ...(moduleRoutes.${this.moduleName}.routes && moduleRoutes.${this.moduleName}.routes.length > 0 ? moduleRoutes.${this.moduleName}.routes : [moduleRoutes.${this.moduleName}])`);
    fs.writeFileSync(`src/router/routes.ts`, dataArr.join('\n'));
  }

  /** 将文件名首字母大写 */
  get firstModuleNameUpper() {
    let fileNameArr = this.fileName.split('')
    return fileNameArr[0].toUpperCase() + fileNameArr.slice(1, fileNameArr.length).join('')
  }
}

const fly = new FlyCli();

// fly.makeModuleIndex()

fly.addModule();
// fly.explainInsertRoutes()
// 创建模块
async function AddModule() {
  if (program.add) {
    let fileName = program.add
    let dirPath = program.path ? `${config.rootPagePath}/${program.path}/${fileName}` : `${config.rootPagePath}/${fileName}`
    let data = fs.readFileSync('./cli/demo.ts', 'utf8');
    data = data.replace('{{Demo}}', fileName)
    data = data.replace('{{class}}', fileName.toLowerCase())
    console.log(Colors.silly(`You create module: `), fileName);
    let dirPathArr = dirPath.split('/');
    let dataPathStr = ''
    let flag = true
    for(let i = 0; i < dirPathArr.length; i++) {
      if(i === 0) {
        dataPathStr += dirPathArr[i]
      } else {
        dataPathStr += '/' + dirPathArr[i]
      }
  
      let statObj = fs.existsSync(dataPathStr)
      
      if(i === dirPathArr.length - 1 && statObj) {
        console.log(Colors.error('【error!!!】' + dataPathStr + ' 模块名重复，请修改重新创建'))
        flag = false
        break;
      }
  
      if(!statObj) {
        fs.mkdirSync(`${dataPathStr}`)
      }
    }
  
    if(!flag) {
      return false
    }

    fs.writeFileSync(`${dirPath}/${fileName}.tsx`, data);
    fs.writeFileSync(`${dirPath}/index.less`, `.fly-${fileName.toLowerCase()} {}`);
    fs.writeFileSync(`${dirPath}/index.ts`, `import ${fileName} from './${fileName}'\nexport default ${fileName}`);
    console.log(Colors.green(`【successful!!!】Module '${fileName}' is created, in ${dirPath}`));
    return true
  }
  return true
}