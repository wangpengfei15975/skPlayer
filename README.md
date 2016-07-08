# skPlayer
[![npm](https://img.shields.io/npm/v/skplayer.svg)]() [![npm](https://img.shields.io/npm/dt/skplayer.svg)]()
a simple HTML5 music player  
一款基于HTML5的web音乐播放器  
即将发布npm哟 ~

# Demo
[Demo](http://www.chengfeilong.com/skPlayer/)  
预览：  
![demo](http://o9vplcp9o.bkt.clouddn.com/demo.gif)  
单曲循环模式预览：  
![demo](http://o9vplcp9o.bkt.clouddn.com/demo_loop.gif)

# 使用方法
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
skPlayer({
    src:'http://o9vplcp9o.bkt.clouddn.com/music.mp3',//音乐文件，必填
    name:'打呼',//歌曲名称，必填
    author:'潘玮柏&杨丞琳',//歌手，必填
    cover:'http://o9vplcp9o.bkt.clouddn.com/cover.jpg'//专辑封面，必填
    //loop:true 是否单曲循环，选填
});
```

# TODO
* 歌曲列表
* 滚动歌词
* 兼容移动端

# 最后
UI参考：[dribbble](https://dribbble.com/shots/1233843-Ui-Kit-Rainy-Season)  
感谢七牛云存储提供存储服务
