# skPlayer (已支持拉取网易云音乐歌单)
抱歉，服务器到期忘记续费了。  
周末有空会续费，恢复正常。  
接口是出于开源的目的提供无偿服务，希望理解。  
Time:2016/12/16  
更新提醒：  
由于2016/12/14服务器到期忘记续费，导致接口发生变化，烦请更新源文件以正常使用。  
竟然有同学想要捐助，在底部列出了捐助支付方式，有想支持接口服务器的，随意捐助数目。

[![npm](https://img.shields.io/npm/v/skplayer.svg)]() [![npm](https://img.shields.io/npm/dt/skplayer.svg)]()  
a simple HTML5 music player  
一款基于HTML5的web音乐播放器  

# Demo
[在线预览](http://www.chengfeilong.com/skPlayer/)  
预览：  
![demo](http://o9vplcp9o.bkt.clouddn.com/demo.gif)  
多曲列表模式预览：  
![demo](http://o9vplcp9o.bkt.clouddn.com/demo_mutil.jpg)  
red主题预览：  
![demo](http://o9vplcp9o.bkt.clouddn.com/demo_red.jpg)

# 使用方法
方式1：NPM  

`npm install skplayer`  


方式2：引入文件  

引入css文件： 
```html
<link rel="stylesheet" href="./dist/skPlayer.min.css">
```
写入播放器DOM：
```html
<div id="skPlayer"></div>
```
引入js文件：
```html
<script src="./dist/skPlayer.min.js"></script>
```
配置skPlayer对象：
```js
//无列表单曲模式
skPlayer({
	music:{
	    src:'http://o9vplcp9o.bkt.clouddn.com/music.mp3',//音乐文件，必填
	    name:'打呼',//歌曲名称，必填
	    author:'潘玮柏&杨丞琳',//歌手，必填
	    cover:'http://o9vplcp9o.bkt.clouddn.com/cover.jpg'//专辑封面，必填
	}
    //loop:true 是否单曲循环，选填
    //theme:'red' 切换red主题，选填
});
//有列表多曲模式
skPlayer({
	music:[
		{
		    src:'http://o9vplcp9o.bkt.clouddn.com/Solitude.mp3',//音乐文件，必填
		    name:'Solitude',//歌曲名称，必填
		    author:'Re:plus',//歌手，必填
		    cover:'http://o9vplcp9o.bkt.clouddn.com/Solitude_cover.jpg'//专辑封面，必填
		},
		{
            src:'http://o9vplcp9o.bkt.clouddn.com/CountingStars.mp3',
            name:'Counting Stars',
            author:'OneRepublic',
            cover:'http://o9vplcp9o.bkt.clouddn.com/CountingStars_cover.jpg'
        },
        {
            src:'http://o9vplcp9o.bkt.clouddn.com/music.mp3',
            name:'打呼',
            author:'潘玮柏&杨丞琳',
            cover:'http://o9vplcp9o.bkt.clouddn.com/cover.jpg'
        }
	],
    //loop:true 是否单曲循环，选填
    //theme:'red' 切换red主题，选填
});
//获取网易云歌单模式
skPlayer({
	music:317921676 //歌单id(登陆网页版网易云音乐，进入歌单详情后，在url中可找到歌单id，例：'http://music.163.com/#/playlist?id=317921676'),
	theme:'red'
});
```

# TODO
* 滚动歌词
* 兼容移动端

# 捂脸
竟然有同学想给我捐助，鉴于服务器到期的事情不好意思了，这里列上捐助方式吧，有愿意捐助的朋友就当支持一下歌单拉取服务器。  
支付宝：<img src="http://www.chengfeilong.com/img/skPlayer/zfb.jpg">
微信：<img src="http://www.chengfeilong.com/img/skPlayer/wx.jpg">

# 最后
UI参考：[dribbble](https://dribbble.com/shots/1233843-Ui-Kit-Rainy-Season)
