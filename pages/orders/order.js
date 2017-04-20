// pages/orders/order.js
var utilMd5 = require('../../utils/md5.js');
Page({
  data: {
    patterns: [],
    colorForms: [],
    mainStones: [],
    handSizes: [],
    orders: {},
    patternType: "0",
    patternId: "",
    colorFormId: "",
    mainStone: "",
    handSize: "",
    order: {},
    productNo: ''
  },
  onLoad: function (options) {
    this.data.patternType = options.type;
    this.getPatterns();
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
  PatternChange: function (e) {
    var current = e.detail.current;
    var that = this;
    that.setData({
      patternId:that.data.patterns[current].Id
    });
    that.getColorForms();
  },
  ChoseColorForm: function (event) {
    this.setData({
      colorFormId: event.target.dataset.id
    });
    this.getMainStones();
  },
  ChoseMainStone: function (event) {
    this.setData({
      mainStone: event.target.dataset.key
    });
    this.getHandSizes();
  },
  ChoseHandSize: function (event) {
    this.setData({
      handSize: event.target.dataset.key
    });
    this.GetOrder();
  },
  GetOrder: function () {
    var that = this;
    wx.request({
      url: 'https://www.18k.hk/open/SpotGoods',
      data: {
        "PatternId": that.data.patternId,
        "ColorFormId": that.data.colorFormId,
        "MainStone": that.data.mainStone,
        "HandSize": that.data.handSize
      },
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        that.setData({
          order: res.data
        });
      },
      fail: function (res) {
      },
      complete: function () {
        // complete  
      }
    })
  },
  getPatterns: function () {
    var that = this;
    wx.request({
      url: 'https://www.18k.hk/open/spotGood/Patterns/' + that.data.patternType,
      data: {},
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        that.setData({
          patterns: res.data,
          patternId: res.data.length > 0 ? res.data[0].Id : ""
        });
        that.getColorForms();
      },
      fail: function (res) {
        wx.showToast({
          title: res.errMsg,
          icon: 'fail',
          duration: 2000
        });
      },
      complete: function (res) {
        // complete  
      }
    })
  },
  getColorForms: function () {
    var that = this;
    wx.request({
      url: 'https://www.18k.hk/open/spotGood/ColorForms?patternId=' + that.data.patternId,
      data: {},
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        that.setData({
          colorForms: res.data,
          colorFormId: res.data.length > 0 ? res.data[0].Id : ""
        });
        if (that.data.colorFormId !== "") {
          that.getMainStones();
        }
      },
      fail: function (res) {
      },
      complete: function () {
        // complete  
      }
    })
  },
  getMainStones: function () {
    var that = this;
    wx.request({
      url: 'https://www.18k.hk/open/spotGood/MainStones?patternId=' + that.data.patternId + "&colorFromId=" + that.data.colorFormId,
      data: {},
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        that.setData({
          mainStones: res.data,
          mainStone: res.data.length > 0 ? res.data[0] : ""
        });
        that.getHandSizes();
      },
      fail: function (res) {
      },
      complete: function () {
        // complete  
      }
    })
  },
  getHandSizes: function () {
    var that = this;
    wx.request({
      url: "https://www.18k.hk/open/spotGood/HandSizes?patternId=" + that.data.patternId + "&colorFromId=" + this.data.colorFormId + "&mainStone=" + that.data.mainStone,
      data: {},
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        that.setData({
          handSizes: res.data,
          handSize: res.data.length > 0 ? res.data[0] : ""
        });
        that.GetOrder();
      },
      fail: function (res) {
      },
      complete: function () {
        // complete  
      }
    })
  },
  UpdateOrderLock: function (isLock) {
    var that = this;
    wx.request({
      url: "https://www.18k.hk/open/spotGood/UpdateLockStatus?orderId=" + that.data.order.Id + "&isLock=" + isLock,
      data: {},
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: function (res) {
      },
      fail: function (res) {
      },
      complete: function () {
        // complete  
      }
    })
  },
  CreateSpotGoodsOrder: function () {
    var that = this;
    var order = that.data.order;
    var openId = wx.getStorageSync('openId');
    wx.request({
      url: "https://www.18k.hk/open/SpotGoodsOrder/Create",
      data: {
        "SpotGoodsId": order.Id,
        "ProductNo": that.data.productNo,
        "IsMosaic": false,
        "Price": order.Price,
        "openId": openId,
        "GoldPrice": order.DailyGoldPrice
      },
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        wx.navigateTo({
          url: 'paySuccess?orderId=' + order.Id
        });
      },
      fail: function (res) {
      },
      complete: function () {
        // complete  
      }
    })
  },
  PayClick: function () {
    var that = this;
    var order = that.data.order;
    var openId = wx.getStorageSync('openId');
    that.UpdateOrderLock(true);
    wx.request({
      url: "https://www.18k.hk/wx/TenPayV3/NativeNotifyUrl?openId=" + openId + "&product_id=" + order.Id + "&price=" + order.Price,
      data: {},
      method: 'Get',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        if (res.statusCode === 200) {
          var result = res.data.data;
          that.setData({
            productNo: result.prepay_id
          });
          var timestamp = (new Date()).valueOf().toString();
          var signA = "appId=" + result.appid + "&nonceStr=" + result.nonce_str + "&package=prepay_id=" + result.prepay_id + "&signType=MD5&timeStamp=" + timestamp;
          var signB = signA + "&key=mirrorworkshop01mirrorworkshop01";
          var sign = utilMd5.MD5(signB).toUpperCase();
          wx.requestPayment(
            {
              'timeStamp': timestamp,
              'nonceStr': result.nonce_str,
              'package': "prepay_id=" + result.prepay_id,
              'signType': 'MD5',
              'paySign': sign,
              'success': function (res) {
                that.CreateSpotGoodsOrder();
              },
              'fail': function (res) {
                that.UpdateOrderLock(false);
              },
              'complete': function (res) { }
            })
        }
      },
      fail: function (res) {
        that.UpdateOrderLock(false);
      },
      complete: function () {
        // complete  
      }
    })
  }
})