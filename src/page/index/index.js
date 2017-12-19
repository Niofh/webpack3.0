/**
 * Created by puban on 2017/11/6.
 */

import "./index.styl"

import "@/js/common/common.js"


main()

async function main() {
   button();
}

async function button() {
  // 按需异步加载 es6
  const button = await import("./components/button/button");
  $("#btn").find(".context").html(button.default.main())
}


