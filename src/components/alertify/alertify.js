/**
 * Created by puban on 2017/6/19.
 */
import 'node_modules/alertifyjs/build/css/alertify.css'
import 'node_modules/alertifyjs/build/css/themes/bootstrap.min.css'
import 'node_modules/alertifyjs/build/css/themes/bootstrap.rtl.min.css'
import './inde.styl'
import alertify from 'alertifyjs'


export default {
  alert({message, ok}) {
    alertify.alert(message).setting({
      'title': '提示',
      'label': '确定',
      'closableByDimmer': false,
      'onok': function () {
        ok && ok()
      }
    })
  },
  confirm({message, ok, cancel}) {
    alertify.confirm(message).setting({
      'title': '提示',
      'labels': {ok: '确定', cancel: '取消'},
      'closableByDimmer': false,
      'onok': function () {
        ok && ok()
      },
      'oncancel': function () {
        cancel && cancel()
      }
    })
  },
  success(title){
    alertify.success(title)
  },
  error(title) {
    alertify.error(title)
  }
}