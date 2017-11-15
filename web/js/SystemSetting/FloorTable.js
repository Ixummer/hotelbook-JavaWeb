/**
 * 公共模板部分，自制模板修改
 * 规定：make 0重载 1新增 2修改 3搜索
 *
 * 这个模板来自权限表的jsp与js,因为大体类似，前端完全可以参照同一结构
 * 所以将一些变量名换成了与具体项无关的名称，需要修改的部分通过注释注明
 * 原注释可以参考最初的版本
 */


layui.use(['util', 'layer', 'table'], function () {
    $(document).ready(function () {
        var table = layui.table
            , layer = layui.layer
            , util = layui.util;
        var countNum;
        var tableIns = table.render({
            done: function (res, curr, count) {
                countNum = count;
            }
            , elem: '#tableID'
            , id: 'tableID'
            , url: baseUrl + '/FloorInfoServlet'                  // <--------------------------------模板修改：修改表格接口
            , cols: [[
                {field: 'floorId', title: 'ID', width: 80, sort: true, fixed: true}
                , {field: 'floorName', title: '楼层名称', width: 190}
                , {field: 'right', title: '管理', align: 'center', toolbar: '#barAuth', width: 200}

            ]]
            , page: true
            , where: {
                make: 0
            }
        });

        //监听工具条
        table.on('tool', function (obj) {
            var data = obj.data
                , layEvent = obj.event;

            if (layEvent === 'detail') {                         // <--------------------------------模板修改：查看按钮
                layer.alert('ID：' + data.floorId
                    + '<br>楼层名称：' + data.floorName
                    , {
                        skin: 'layui-layer-lan'
                        , closeBtn: 0
                        , title: '您当前选择的楼层值信息'
                        , anim: 4
                        , offset: '180px'
                    });



            } else if (layEvent === 'del') {                     // <--------------------------------模板修改：删除按钮
                layer.alert('本条目禁止删除！', {
                    title: '警告', icon: 4, anim: 6, offset: '250px'
                });



            } else if (layEvent === 'edit') {                    // <--------------------------------模板修改：编辑按钮
                var floorId = data.floorId;
                var floorName = data.floorName;

            }
        });

        $('#searchButton').click(function () {
            var inputTxt = $('#inputSearch').val();
            if (inputTxt == "")
                layer.msg('您必须输入值', {offset: '250px'});
            else if (inputTxt.length > 10)                       // <-----------------------------模板修改：修改搜索框的长度
                layer.msg('您所输入的值长度不合法', {offset: '250px'});
            else {
                layer.msg('搜索结果', {offset: '250px'});
                //与tableIns.reload方法类似，这种方法是取表格容器索引值
                table.reload('tableID', {
                    where: {                                     // <------------------------------模板修改：修改搜索的传参值
                        make: 3,
                        authItem: inputTxt
                    }
                })
            }
        });

        $('#refreshButton').click(function () {
            layer.msg('重载表格', {offset: '250px'});
            tableIns.reload({where: {make: 0}});
        });

        $('#insertButton').click(function () {
            layer.prompt({
                title: '请输入楼层名称',
                formType: 0,
                offset: '220px',
                maxlength: 10
            }, function (inputValue, index) {
                layer.close(index);
                var params = "floorName=" + inputValue;
                $.post(baseUrl + '/QueryFloorNameServlet', params, function (data) {
                    if (data == 1) {
                        table.reload('tableID', {
                            where: {
                                make: 1,
                                floorName: inputValue
                            }
                        })
                        layer.msg('新增楼层成功', {offset: '250px'});
                    } else {
                        layer.alert('该楼层名称已经存在！', {
                            title: '警告', icon: 4, anim: 6, offset: '220px'
                        });
                    }
                });
            });
        });

        $('#toXlsButton').click(function () {
            tableIns.reload({where: {make: 0, limit: countNum}});
            layer.prompt({
                title: '请输入文件名称',
                formType: 0,
                value: 'FloorInfo',                              // <------------------------------模板修改：修改默认的导出文件名称
                offset: '220px'
            }, function (fileName, index) {
                layer.close(index);
                export_table_to_excel('toxlsTable', fileName);
                layer.alert('当前页面数据导出完成！', {
                    title: '导出成功', icon: 6, anim: 1, offset: '250px'
                });
                tableIns.reload({where: {make: 0}});
            });
        });

        util.fixbar({
            showHeight: 2
            , click: function (type) {
                console.log(type);
            }
        });
    });
});