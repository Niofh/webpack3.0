// https://github.com/aui/art-template-loader 案列
import buttonTemplate from "./button.art"


// ajax请求回来权限列表， 不能存在sessionStorage
var roles = [1, 2, 3];

// 用户登录获取他的权限编码  不能存在sessionStorage,容易修改，权限无作用
var userRoles = 1;


// role 参数是根据权限来渲染对应html
const buttonHtml = buttonTemplate({button: "哈哈", header: "头部", role: roles.indexOf(userRoles)});

// 处理逻辑
const main = function () {
  $("#main").html(buttonHtml);

  $("#of-button").on("click", function () {
    alert("哈哈哈");
  })
};

// 导出主方法和button的html,方便以后其他组件调用
export default {
  main,
  buttonHtml
}

