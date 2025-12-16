const t = require("@babel/types");

// babel 插件用白话来讲就是
// 一个函数，这个函数返回一个对象，这个对象有一个属性叫 visitor
// visitor 是一个对象，这个对象的属性是我们想要访问的 AST 节点类型，属性值是一个函数，这个函数会在访问对应类型节点时被调用
module.exports = function () {
  return {
    visitor: {
      VariableDeclaration: function (path) {
        if (path.node.kind === "const") {
          console.log("in there ");

          path.node.kind = "let";
        }
        console.log("first plugin visited VariableDeclaration");
      },
      ArrowFunctionExpression: function (path) {
        console.log("arrow function visited");
        let body = path.node.body;
        if (!t.isBlockStatement(body)) {
          body = t.blockStatement([t.returnStatement(body)]);
        }
        path.replaceWith(
          t.functionExpression(null, path.node.params, body, path.node.async)
        );
      },
    },
  };
};
