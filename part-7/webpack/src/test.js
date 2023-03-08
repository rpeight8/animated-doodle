"use strict";
async function foo() {
  await bar();
}
function bar() {}
export default foo;
