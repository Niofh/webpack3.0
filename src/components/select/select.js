import 'node_modules/choices.js/assets/styles/css/choices.min.css'
import './select.styl'
import Choices from 'choices.js'


// 下拉多选
export const selectMultiple = function (ele, params) {
    let obj = Object.assign({
        removeItemButton: true,
        noChoicesText: '暂无数据!',
        noResultsText: '暂无数据!',
        itemSelectText: '',
        resetScrollPosition: true   // 不重置滚动
    }, params)
    return new Choices(ele, obj);
}

// 下拉没有搜索的单选
export const select = function (ele) {
    return new Choices(ele, {
        shouldSort: false,
        searchChoices: false,
        searchEnabled: false,
        itemSelectText: '',
        noChoicesText: '暂无数据!',
        noResultsText: '暂无数据!'
    })
}