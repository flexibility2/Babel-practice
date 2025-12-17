// convert to AST

/**
 * 
 *{
  type: 'CallExpression',
  name: 'AND',
  arguments: [
    { type: 'NumberLiteral', value: 1 },
    {
      type: 'CallExpression',
      name: 'SUBTRATION',
      arguments: [
        { type: 'NumberLiteral', value: 3 },
        { type: 'NumberLiteral', value: 1 }
      ]
    }
  ]
}
 */
function parse(input) {
  input = input.replace(/\s+/g, "");
  let i = 0;

  function parseExpr() {
    // NumberLiteral
    if (/\d+/.test(input[i])) {
      let numStr = "";
      while (/\d/.test(input[i])) {
        numStr += input[i];
        i++;
      }
      return {
        type: "NumberLiteral",
        value: Number(numStr),
      };
    }

    // CallExpression
    let name = "";
    while (/[a-zA-Z]/.test(input[i])) {
      name += input[i];
      i++;
    }
    if (input[i++] !== "(") {
      throw new Error("Expected ( after function name");
    }
    let args = [];
    while (input[i] !== ")") {
      args.push(parseExpr());
      if (input[i] === ",") {
        i++;
      }
    }
    i++; // skip ')'
    return {
      type: "CallExpression",
      name,
      arguments: args,
    };
  }

  return parseExpr();
}

const ops = {
  AND: (args) => args.reduce((a, b) => a + b, 0),
  SUBTRATION: (args) => args.reduce((a, b) => a - b),
};
// input AST
function evaluate(node) {
  if (node.type === "NumberLiteral") {
    return node.value;
  }
  if (node.type === "CallExpression") {
    const args = node.arguments.map(evaluate);
    const fn = ops[node.name];
    return fn(args);
  }
}

const input = "AND(1, SUBTRATION(3,1))";
const ast = parse(input);

console.log("ast: ", ast);

const result = evaluate(ast);
console.log("result: ", result);
