# Babel-practice

## Babel 编译流程

转化型编译器的核心流程

1. input ==> tokenizer ==> tokens; // 词法分析
2. tokens ==> parser ==> AST; // 语法分析
3. AST ==> transformer ==> new AST; // 语法树转换
4. new AST ==> code generator ==> output; // 代码生成
