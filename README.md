# Babel-practice

## Babel 编译流程

转化型编译器的核心流程

1. input ==> tokenizer ==> tokens; // 词法分析
2. tokens ==> parser ==> AST; // 语法分析
3. AST ==> transformer ==> new AST; // 语法树转换
4. new AST ==> code generator ==> output; // 代码生成

## 项目文件说明

- `compiler.js`：演示 Babel 编译流程，包含代码解析为 AST、遍历和修改 AST、再生成代码的完整过程。
- `calculator-interpretor.js`：实现了一个简单的表达式解析器和解释器，将自定义的表达式字符串解析为 AST 并计算结果。
- `plugins/arrow-function.js`：Babel 插件示例，将箭头函数（Arrow Function）转换为普通的 function 表达式。
