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
    this.GetNewSfOrder();
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
  GetNewSfOrder: function (e) {
    var openId = wx.getStorageSync('openId');
    var that = this;
    wx.request({
      url: "https://www.18k.hk/open/GetNewSfAddress?openId=" + openId,
      data: {
      },
      method: 'Get',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        that.setData({
          customerInfo: {
            address: res.data.Address,
            phone: res.data.CustomerPhone,
            name: res.data.CustomerName
          }
        });
      },
      fail: function (res) {
      },
      complete: function () {

      }
    })
  },
  formSubmit: function (e) {
    var that = this;
    var detail = e.detail.value;
    var openId = wx.getStorageSync('openId');
    if (detail.customerName === '' || detail.customerPhone === '' || detail.address === '') {
      wx.showToast({
        title: '收货信息不完整',
        icon: 'fail',
        duration: 2000
      });
      return false;
    }
    wx.request({
      url: "https://www.18k.hk/open/SpotGoodsOrder/CustomerInfo/Update",
      data: {
        "SpotGoodsId": that.data.spotGoodsId,
        "CustomerName": detail.customerName,
        "CustomerPhone": detail.customerPhone,
        "Address": detail.address,
        "IsSF": that.data.logisticType === "1" ? true : false
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