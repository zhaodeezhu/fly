const program = require('commander');
const fs = require('fs')
const config = require('./cli')
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
  .option('-p, --path [fileName]', 'add Something')
  .parse(process.argv);
  
// AddModule();

const fly = new FlyCli();

fly.AddModule();

class FlyCli {
  // 添加模块
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
      console.log(Colors.green(`【successful!!!】Module '${fileName}' is created, in ${dirPath}`))
    }
  }
}

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
    console.log(Colors.green(`【successful!!!】Module '${fileName}' is created, in ${dirPath}`))
  }
}

// 在注册文件中加入新建的模块
function updataRegisterLayout(dirPath, fileName) {
  // 将文件名首字母大写
  let fileNameArr = fileName.split('')
  fileName = fileNameArr[0].toUpperCase() + fileNameArr.slice(1, fileNameArr.length).join('')
  // 读取文件
  let data = fs.readFileSync(config.registUrl, 'utf8');
  // 获取当前import 的个数
  let importLength = data.match(/import/g).length
  // 使用/n分割源文件
  let sourceFileArr = data.split('\n')
  
  sourceFileArr.splice(importLength, 0, `import ${fileName} from '@${dirPath.split('src')[1]}';`)
  
  let registerIndex = sourceFileArr.indexOf('};') - 1
  sourceFileArr.splice(registerIndex, 1, `${sourceFileArr[registerIndex]},`, `    ${fileName}`)
  let afterData = sourceFileArr.join('\n')
  fs.writeFileSync(config.registUrl, afterData);
}

// 获取事件列表
async function getActionList(fileName) {
  let res = await config.http(`http://apstest.gz.cvte.cn/api/apsert/view/dataview/getDvView/${fileName}/`);
  // console.log(res[0].progId)
  let acitonList = await config.http(`http://apstest.gz.cvte.cn/api/apsert/common/utilapi/sys/prog_action/${fileName}/${res[0].progId}`)
  // console.log(acitonList)
  let actionList = ''
  let viewList = ''
  acitonList.forEach((item, index) => {
    if(index === 0) {
      actionList += `${item.actionNo}={() => {}} // ${item.actionType} ${item.actionName}\n`
    } else {
      actionList += `          ${item.actionNo}={() => {}} // ${item.actionType} ${item.actionName}\n`
    }
  })

  res.forEach((item, index) => {
    if(index === 0) {
      viewList += `${item.viewNo}: '${item.viewNo}'`
    } else {
      viewList += `,\n  ${item.viewNo}: '${item.viewNo}'`
    }
  })
  return {
    actionList,
    viewList
  }
}