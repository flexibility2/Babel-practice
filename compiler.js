const parser = require("@babel/parser"); // I/O 转为 AST
const traverse = require("@babel/traverse").default; // AST 转为 AST
const generator = require("@babel/generator").default; // AST 转为 代码字符串

const code = `const name = "babel";`;
// 1. 将代码转位AST
const ast = parser.parse(code);
console.log("parse result:", ast);

// 2. 游历AST，将AST中的某些代码，转位我们想要的内容，比如 const => var
// 第一种方式，访问着模式

const visitor = {
  VariableDeclaration: function (path) {
    if (path.node.kind === "const") {
      console.log("in there ");

      path.node.kind = "let";
    }
    console.log("first plugin visited VariableDeclaration");
  },
};

// 第二种方式，状态机
const visitor2 = {
  enter(path) {
    if (path.node.kind === "const") {
      path.node.kind = "let";
    }
  },
};

traverse(ast, visitor);

// 3. 将转化后的AST重新生成代码
const output = generator(ast);
console.log("output code:", output.code);
