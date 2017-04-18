// pages/orders/paySuccess.js
Page({
  data: {
    logisticType: 0,
    spotGoodsId: '',
    customerInfo: {
      address: '',
      phone: '',
      name: ''
    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.data.spotGoodsId = options.orderId;
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
  logisticTypeChange: function (e) {
    this.setData({
      logisticType: e.detail.value
    });
  },
  formSubmit: function (e) {
    var that = this;
    var detail = e.detail.value;
    var openId = wx.getStorageSync('openId');
    wx.request({
      url: "https://www.18k.hk/open/SpotGoodsOrder/CustomerInfo/Update",
      data: {
        "SpotGoodsId": that.data.spotGoodsId,
        "CustomerName": detail.customerName,
        "CustomerPhone": detail.customerPhone,
        "Address": detail.address,
      },
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        wx.switchTab({
          url: '../orders/myOrders'
        });
      },
      fail: function (res) {
      },
      complete: function () {
 
      }
    })
  }
})