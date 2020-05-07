"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./cli/index");
var program = require('commander');
var fs = require('fs');
var Colors = require('colors/safe');
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
var FlyCli = /** @class */ (function () {
    function FlyCli() {
        /** 程序名 */
        this.fileName = program.add;
        /** 路径 */
        this.dirPath = program.path ? index_1.default.rootPagePath + "/" + program.path + "/" + this.fileName : index_1.default.rootPagePath + "/" + this.fileName;
        /** 模块名 */
        this.moduleName = program.path;
        /** 标题 */
        this.title = program.title;
    }
    /** 添加模块 */
    FlyCli.prototype.addModule = function () {
        if (program.add) {
            var fileName = program.add;
            var dirPath = program.path ? index_1.default.rootPagePath + "/" + program.path + "/" + fileName : index_1.default.rootPagePath + "/" + fileName;
            var data = fs.readFileSync('./cli/demo.ts', 'utf8');
            data = data.replace('{{Demo}}', fileName);
            data = data.replace('{{class}}', fileName.toLowerCase());
            console.log(Colors.silly("You create module: "), fileName);
            var dirPathArr = dirPath.split('/');
            var dataPathStr = '';
            var flag = true;
            for (var i = 0; i < dirPathArr.length; i++) {
                if (i === 0) {
                    dataPathStr += dirPathArr[i];
                }
                else {
                    dataPathStr += '/' + dirPathArr[i];
                }
                var statObj = fs.existsSync(dataPathStr);
                if (i === dirPathArr.length - 1 && statObj) {
                    console.log(Colors.error('【error!!!】' + dataPathStr + ' 模块名重复，请修改重新创建'));
                    flag = false;
                    break;
                }
                if (!statObj) {
                    fs.mkdirSync("" + dataPathStr);
                }
            }
            if (!flag) {
                return false;
            }
            fs.writeFileSync(dirPath + "/" + fileName + ".tsx", data);
            fs.writeFileSync(dirPath + "/index.less", ".fly-" + fileName.toLowerCase() + " {}");
            fs.writeFileSync(dirPath + "/index.ts", "import " + fileName + " from './" + fileName + "'\nexport default " + fileName);
            this.makeModuleIndex();
            console.log(Colors.green("\u3010successful!!!\u3011Module '" + fileName + "' is created, in " + dirPath));
            return true;
        }
        return true;
    };
    // 三步走
    /** 判断模块是否存在 */
    FlyCli.prototype.isEsist = function () {
        var statFlag = fs.existsSync("src/router/moduleRoutes/" + this.moduleName + ".ts");
        return statFlag;
    };
    /** 生成模块文件 */
    FlyCli.prototype.makeModuleIndex = function () {
        if (this.isEsist()) {
            var fileData = fs.readFileSync("src/router/moduleRoutes/" + this.moduleName + ".ts", 'utf8');
            var fileDataArr = fileData.split('\n');
            // 引入模块处理
            var importIndex = fileDataArr.indexOf('export default {');
            fileDataArr.splice(importIndex, 0, "const " + this.firstModuleNameUpper + " = React.lazy(() => import('@/pages/" + this.moduleName + "/" + this.fileName + "'));");
            // 插入具体的路由处理
            var routerIndex = fileDataArr.length - 3;
            fileDataArr.splice(routerIndex, 1, '    },');
            var routerModule = "    {\n      path: '/index/" + this.moduleName + "/" + this.fileName + "',\n      Component: " + this.firstModuleNameUpper + ",\n      exact: true,\n      meta: {\n        title: '" + this.title + "',\n        show: true\n      }\n    }";
            fileDataArr.splice(routerIndex + 1, 0, routerModule);
            var data = fileDataArr.join('\n');
            // 将数据重新写回文件
            fs.writeFileSync("src/router/moduleRoutes/" + this.moduleName + ".ts", data);
        }
        else {
            var moduleIndexData = fs.readFileSync('cli/moduleIndex.ts', 'utf8');
            moduleIndexData = moduleIndexData.replace(/{{name}}/g, this.firstModuleNameUpper);
            moduleIndexData = moduleIndexData.replace(/{{path}}/, this.moduleName + "/" + this.fileName);
            moduleIndexData = moduleIndexData.replace(/{{base}}/, "" + this.moduleName);
            moduleIndexData = moduleIndexData.replace(/{{router}}/, (this.moduleName + "/" + this.fileName).toLocaleLowerCase());
            moduleIndexData = moduleIndexData.replace('{{title}}', this.title);
            // 创建路由表文件
            fs.writeFileSync("src/router/moduleRoutes/" + this.moduleName + ".ts", moduleIndexData);
            // 将文件引入到导出文件中
            this.willModuleIndex();
            // 改变路由文件
            this.explainInsertRoutes();
        }
    };
    /** 将新建的模块引入到导出文件中 */
    FlyCli.prototype.willModuleIndex = function () {
        // 读取文件
        var data = fs.readFileSync('src/router/moduleRoutes/index.ts', 'utf8');
        // 获取import个数
        var importLength = data.match(/import/g).length;
        // 使用/n分割源文件
        var sourceFileArr = data.split('\n');
        sourceFileArr.splice(importLength, 0, "import " + this.moduleName + " from './" + this.moduleName + "';");
        var moduleIndex = sourceFileArr.indexOf('};');
        sourceFileArr.splice(moduleIndex - 1, 1, sourceFileArr[moduleIndex - 1] + ",");
        sourceFileArr.splice(moduleIndex, 0, "  " + this.moduleName);
        var indexData = sourceFileArr.join('\n');
        fs.writeFileSync("src/router/moduleRoutes/index.ts", indexData);
    };
    /** 解析插入到路由表中 */
    FlyCli.prototype.explainInsertRoutes = function () {
        // 读取路由文件
        var data = fs.readFileSync('src/router/routes.ts', 'utf8');
        // 解析要插入的位置
        var dataArrReverse = data.split('\n').reverse();
        var insertReverseIndex = dataArrReverse.findIndex(function (item) {
            return item.indexOf('moduleRoutes') > -1;
        });
        var dataArr = dataArrReverse.reverse();
        var insertIndex = dataArrReverse.length - insertReverseIndex;
        dataArr.splice(insertIndex - 1, 1, dataArr[insertIndex - 1] + ",");
        dataArr.splice(insertIndex, 0, "          ...(moduleRoutes." + this.moduleName + ".routes && moduleRoutes." + this.moduleName + ".routes.length > 0 ? moduleRoutes." + this.moduleName + ".routes : [moduleRoutes." + this.moduleName + "])");
        fs.writeFileSync("src/router/routes.ts", dataArr.join('\n'));
    };
    Object.defineProperty(FlyCli.prototype, "firstModuleNameUpper", {
        /** 将文件名首字母大写 */
        get: function () {
            var fileNameArr = this.fileName.split('');
            return fileNameArr[0].toUpperCase() + fileNameArr.slice(1, fileNameArr.length).join('');
        },
        enumerable: true,
        configurable: true
    });
    return FlyCli;
}());
var fly = new FlyCli();
// fly.makeModuleIndex()
fly.addModule();
// fly.explainInsertRoutes()
// 创建模块
function AddModule() {
    return __awaiter(this, void 0, void 0, function () {
        var fileName, dirPath, data, dirPathArr, dataPathStr, flag, i, statObj;
        return __generator(this, function (_a) {
            if (program.add) {
                fileName = program.add;
                dirPath = program.path ? index_1.default.rootPagePath + "/" + program.path + "/" + fileName : index_1.default.rootPagePath + "/" + fileName;
                data = fs.readFileSync('./cli/demo.ts', 'utf8');
                data = data.replace('{{Demo}}', fileName);
                data = data.replace('{{class}}', fileName.toLowerCase());
                console.log(Colors.silly("You create module: "), fileName);
                dirPathArr = dirPath.split('/');
                dataPathStr = '';
                flag = true;
                for (i = 0; i < dirPathArr.length; i++) {
                    if (i === 0) {
                        dataPathStr += dirPathArr[i];
                    }
                    else {
                        dataPathStr += '/' + dirPathArr[i];
                    }
                    statObj = fs.existsSync(dataPathStr);
                    if (i === dirPathArr.length - 1 && statObj) {
                        console.log(Colors.error('【error!!!】' + dataPathStr + ' 模块名重复，请修改重新创建'));
                        flag = false;
                        break;
                    }
                    if (!statObj) {
                        fs.mkdirSync("" + dataPathStr);
                    }
                }
                if (!flag) {
                    return [2 /*return*/, false];
                }
                fs.writeFileSync(dirPath + "/" + fileName + ".tsx", data);
                fs.writeFileSync(dirPath + "/index.less", ".fly-" + fileName.toLowerCase() + " {}");
                fs.writeFileSync(dirPath + "/index.ts", "import " + fileName + " from './" + fileName + "'\nexport default " + fileName);
                console.log(Colors.green("\u3010successful!!!\u3011Module '" + fileName + "' is created, in " + dirPath));
                return [2 /*return*/, true];
            }
            return [2 /*return*/, true];
        });
    });
}
