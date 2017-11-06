import validate from 'jquery-validation'
import './messages_zh'

// !validator(formName).form() return
export default function ($form) {
  $.validator.addMethod("alpassword", function (value, element) {
    return /^([a-zA-Z]+)\d[a-zA-Z0-9]+/.test(value);
  }, "字母数字组合");
  $.validator.addMethod("length6", function (value, element) {
    return value.length > 5
  }, "密码不能低于6位");
  $.validator.addMethod("length13", function (value, element) {
    return value.length < 13
  }, "密码不能高于13位");
  $.validator.addMethod("phone", function (value, element) {
    return /^member[34578]\d{9}$/.test(value);
  }, "手机格式错误");
  return $form.validate({
    errorPlacement: function (error, element) {
      console.log(element, error)
      $(element).nextAll('.require').html(error)
    }
  });
}
