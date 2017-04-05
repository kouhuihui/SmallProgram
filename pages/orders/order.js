// pages/orders/order.js
Page({
  data:{
    patterns:[],
    colorForms:[],
    mainStones:[],
    handSizes:[],
    orders:{},
    patternType:"0",
    patternId:"",
    colorFormId:"",
    mainStone:"",
    handSize:"",
    order:{}
  },
  onLoad:function(options){
     this.data.patternType = options.type;
     this.getPatterns();
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  ChoseColorForm:function(event){
     this.setData({
      colorFormId: event.target.dataset.id
    });
    this.getMainStones();
  },
  ChoseMainStone:function(event){
     this.setData({
      mainStone: event.target.dataset.key
    });
    this.getHandSizes();
  },
  ChoseHandSize:function(event){
     this.setData({
      handSize: event.target.dataset.key
    });
    this.GetOrder();
  },
  GetOrder:function(){
    var that = this;
     wx.request({  
      url: 'https://www.18k.hk/open/SpotGoods',
      data: {
        "PatternId":that.data.patternId,
        "ColorFormId":that.data.colorFormId,
        "MainStone":that.data.mainStone,
        "HandSize":that.data.handSize
      },
      method: 'POST', 
      header: {'content-type': 'application/json'}, 
      success: function(res){  
        that.setData({  
          order:res.data
        });
      },  
      fail: function(res) {  
      },  
      complete: function() {  
        // complete  
      }  
    }) 
  },
  getPatterns:function(){
    var that = this;
    wx.request({  
      url: 'https://www.18k.hk/open/spotGood/Patterns/'+  that.data.patternType,
      data: {},  
      method: 'POST', 
      header: {'content-type': 'application/json'}, 
      success: function(res){  
          that.setData({  
          patterns:res.data,
          patternId:res.data.length>0?res.data[0].Id:""
        });
          that.getColorForms();
      },  
      fail: function(res) {
      },  
      complete: function() {  
        // complete  
      }  
    }) 
  },
  getColorForms:function(){
    var that = this;
    wx.request({  
      url: 'https://www.18k.hk/open/spotGood/ColorForms?patternId='+  that.data.patternId,
      data: {},  
      method: 'POST', 
      header: {'content-type': 'application/json'}, 
      success: function(res){  
          that.setData({  
          colorForms:res.data,
          colorFormId:res.data.length>0?res.data[0].Id:""
        });
          that.getMainStones();
      },  
      fail: function(res) {
      },  
      complete: function() {  
        // complete  
      }  
    }) 
  },
  getMainStones:function(){
    var that = this;
    wx.request({  
      url: 'https://www.18k.hk/open/spotGood/MainStones?patternId='+  that.data.patternId +"&colorFromId=" + that.data.colorFormId,
      data: {},  
      method: 'POST', 
      header: {'content-type': 'application/json'}, 
      success: function(res){  
          that.setData({  
          mainStones:res.data,
          mainStone: res.data.length>0?res.data[0]:""
        });
         that.getHandSizes();
      },  
      fail: function(res) {
      },  
      complete: function() {  
        // complete  
      }  
    }) 
  },
  getHandSizes:function(){
    var that = this;
    wx.request({  
      url: "https://www.18k.hk/open/spotGood/HandSizes?patternId="+  that.data.patternId +"&colorFromId=" + this.data.colorFormId+"&mainStone=" + that.data.mainStone,
      data: {},  
      method: 'POST', 
      header: {'content-type': 'application/json'}, 
      success: function(res){  
          that.setData({  
          handSizes:res.data,
          handSize: res.data.length>0?res.data[0]:""
        });
        that.GetOrder();
      },  
      fail: function(res) {
      },  
      complete: function() {  
        // complete  
      }  
    }) 
  }
})