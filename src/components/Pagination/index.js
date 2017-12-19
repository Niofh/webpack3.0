/**
 * Created by puban on 2017/4/17.
 */

import $ from 'jquery'


import './lib/Mricode.Pagination-master/mricode.pagination.css'
import './index.css'

import pagination from './lib/Mricode.Pagination-master/mricode.pagination'



function pageRender(obj) {
    let $id = $("#" + obj.id);
    $id.pagination('destroy');
    $id.pagination({
        pageIndex: 0,
        pageSize: obj.pageSize||10,
        showInfo: true,
        showJump: true,
        showPageSizes: true,
        loadFirstPage: true,
        showFirstLastBtn: true,
        firstBtnText: '首页',
        lastBtnText: '尾页',
        nextBtnText: '下一页',
        prevBtnText: '上一页',
        infoFormat: '总共 <span class="red">{total}</span> 条数据，每页显示',
        noInfoText: "暂无数据",
        pageElementSort: ['$page', '$info', '$size', '$kuozhang', '$jump'],
        remote: obj.remote
    })

}
export default pageRender