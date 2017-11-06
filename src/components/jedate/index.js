/**
 * Created by puban on 2017/6/26.
 */

import './jedate/jedate/skin/jedate.css'

import $ from 'jquery'

import jeDate from './jedate/jedate/jquery.jedate'


export default function ($dom, params) {
  let obj = Object.assign({
    format: "YYYY-MM-DD hh:mm:ss",
    isTime: true
  }, params)
  $dom.jeDate(obj)
}