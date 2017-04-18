Page({
    data: {
        orders: []
    },
    onLoad: function (options) {
        this.getOrders();
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    getOrders: function () {
        var that = this;
        var openId = wx.getStorageSync('openId');
        wx.request({
            url: 'https://www.18k.hk/open/api/SpotGood?openId=' + openId + '&logisticType=-1',
            data: {},
            method: 'Get',
            header: { 'content-type': 'application/json' },
            success: function (res) {
                that.setData({
                    orders: res.data
                });
            },
            fail: function (res) {
            },
            complete: function () {
                // complete  
            }
        })
    }
})