/**
 * Created by Scott on 2016/7/7.
 */
;(function(window,document){
    //公共方法
    var Public = {
        'timeFormat': function (time) {
            var tempMin = parseInt(time / 60);
            var tempSec = parseInt(time % 60);
            var curMin = tempMin < 10 ? ('0' + tempMin) : tempMin;
            var curSec = tempSec < 10 ? ('0' + tempSec) : tempSec;
            return curMin + ':' + curSec;
        },
        'leftDistance': function (el) {
            var left = el.offsetLeft;
            while (el.offsetParent) {
                el = el.offsetParent;
                left += el.offsetLeft;
            }
            return left;
        },
        'ajax': function (options) {
            var options = options || {};
            var xhr = new XMLHttpRequest();
            xhr.open('GET',options.url);
            xhr.setRequestHeader('Accept','*/*');
            xhr.send(null);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    var status = xhr.status;
                    if (status >= 200 && status < 300) {
                        options.success && options.success(xhr.responseText, xhr.responseXML);
                    } else {
                        options.fail && options.fail(status);
                    }
                }
            };
        }
    };
    //对象主体
    skPlayer = function(options){
        //配置检测
        if(Array.isArray(options.music)){
            for(var item in options.music){
                if(!(options.music[item].src && options.music[item].name && options.music[item].author && options.music[item].cover)){
                    console.error('请正确配置对象！');
                    return;
                }
            }

            //初始化
            var music = options.music,
                target = document.getElementById('skPlayer'),
                HTMLcontent = '<audio src="' + music[0].src + '" preload="auto"></audio>';
                HTMLcontent+= '<div class="skPlayer-picture">';
                HTMLcontent+= '    <img src="' + music[0].cover + '" alt="" class="skPlayer-cover">';
                HTMLcontent+= '    <a href="javascript:;" class="skPlayer-play-btn">';
                HTMLcontent+= '        <span class="skPlayer-left"></span>';
                HTMLcontent+= '        <span class="skPlayer-right"></span>';
                HTMLcontent+= '    </a>';
                HTMLcontent+= '</div>';
                HTMLcontent+= '<div class="skPlayer-control">';
                HTMLcontent+= '    <p class="skPlayer-name">' + music[0].name + '</p>';
                HTMLcontent+= '    <p class="skPlayer-author">' + music[0].author + '</p>';
                HTMLcontent+= '    <div class="skPlayer-percent">';
                HTMLcontent+= '        <div class="skPlayer-line"></div>';
                HTMLcontent+= '    </div>';
                HTMLcontent+= '    <p class="skPlayer-time">';
                HTMLcontent+= '        <span class="skPlayer-cur">00:00</span>/<span class="skPlayer-total">00:00</span>';
                HTMLcontent+= '    </p>';
                HTMLcontent+= '    <div class="skPlayer-volume skPlayer-hasList">';
                HTMLcontent+= '        <i class="skPlayer-icon" data-volume="0"></i>';
                HTMLcontent+= '        <div class="skPlayer-percent">';
                HTMLcontent+= '            <div class="skPlayer-line"></div>';
                HTMLcontent+= '        </div>';
                HTMLcontent+= '    </div>';
                HTMLcontent+= '    <div class="skPlayer-list-switch">';
                HTMLcontent+= '        <i class="skPlayer-list-icon"></i>';
                HTMLcontent+= '    </div>';
                HTMLcontent+= '</div>';
                HTMLcontent+= '<ul class="skPlayer-list">';
            for(var item in options.music){
                HTMLcontent+= '    <li data-index="' + item + '">';
                HTMLcontent+= '        <i class="skPlayer-list-sign"></i>';
                HTMLcontent+= '        <span class="skPlayer-list-index">' + (parseInt(item)+1) + '</span>';
                HTMLcontent+= '        <span class="skPlayer-list-name">' + options.music[item].name + '</span>';
                HTMLcontent+= '        <span class="skPlayer-list-author" title=" ' + options.music[item].author + ' ">' + options.music[item].author + '</span>';
                HTMLcontent+= '    </li>';
            }
                HTMLcontent+= '</ul>';

            target.innerHTML = HTMLcontent;
            if(options.theme === 'red'){
                target.className = 'skPlayer-red';
            }
            var audio = target.querySelector('audio'),
                playBtn = target.querySelector('.skPlayer-play-btn'),
                currentTime = target.querySelector('.skPlayer-percent').querySelector('.skPlayer-line'),
                totalTime = target.querySelector('.skPlayer-percent'),
                currentVolume = target.querySelector('.skPlayer-volume').querySelector('.skPlayer-line'),
                totalVolume = target.querySelector('.skPlayer-volume').querySelector('.skPlayer-percent'),
                quietVolume = target.querySelector('.skPlayer-icon'),
                currentTime_text = target.querySelector('.skPlayer-cur'),
                totalTime_text = target.querySelector('.skPlayer-total'),
                cover = target.querySelector('.skPlayer-cover');
            if(Array.isArray(music)){
                var musicItem = target.querySelectorAll('.skPlayer-list li');
                var listSwitch = target.querySelector('.skPlayer-list-switch');
                target.classList.add('skPlayer-list-on');
            }

            var duration;

            //事件绑定
            handleEvent();

        }else if(typeof options.music === 'object'){
            if(!(options.music.src && options.music.name && options.music.author && options.music.cover)){
                console.error('请正确配置对象！');
                return;
            }

            //初始化
            var music = options.music,
                target = document.getElementById('skPlayer'),
                HTMLcontent = '<audio src="' + music.src + '" preload="auto"></audio>';
                HTMLcontent+= '<div class="skPlayer-picture">';
                HTMLcontent+= '    <img src="' + music.cover + '" alt="" class="skPlayer-cover">';
                HTMLcontent+= '    <a href="javascript:;" class="skPlayer-play-btn">';
                HTMLcontent+= '        <span class="skPlayer-left"></span>';
                HTMLcontent+= '        <span class="skPlayer-right"></span>';
                HTMLcontent+= '    </a>';
                HTMLcontent+= '</div>';
                HTMLcontent+= '<div class="skPlayer-control">';
                HTMLcontent+= '    <p class="skPlayer-name">' + music.name + '</p>';
                HTMLcontent+= '    <p class="skPlayer-author">' + music.author + '</p>';
                HTMLcontent+= '    <div class="skPlayer-percent">';
                HTMLcontent+= '        <div class="skPlayer-line"></div>';
                HTMLcontent+= '    </div>';
                HTMLcontent+= '    <p class="skPlayer-time">';
                HTMLcontent+= '        <span class="skPlayer-cur">00:00</span>/<span class="skPlayer-total">00:00</span>';
                HTMLcontent+= '    </p>';
                HTMLcontent+= '    <div class="skPlayer-volume">';
                HTMLcontent+= '        <i class="skPlayer-icon" data-volume="0"></i>';
                HTMLcontent+= '        <div class="skPlayer-percent">';
                HTMLcontent+= '            <div class="skPlayer-line"></div>';
                HTMLcontent+= '        </div>';
                HTMLcontent+= '    </div>';
                HTMLcontent+= '</div>';

            target.innerHTML = HTMLcontent;
            if(options.theme === 'red'){
                target.className = 'skPlayer-red';
            }
            var audio = target.querySelector('audio'),
                playBtn = target.querySelector('.skPlayer-play-btn'),
                currentTime = target.querySelector('.skPlayer-percent').querySelector('.skPlayer-line'),
                totalTime = target.querySelector('.skPlayer-percent'),
                currentVolume = target.querySelector('.skPlayer-volume').querySelector('.skPlayer-line'),
                totalVolume = target.querySelector('.skPlayer-volume').querySelector('.skPlayer-percent'),
                quietVolume = target.querySelector('.skPlayer-icon'),
                currentTime_text = target.querySelector('.skPlayer-cur'),
                totalTime_text = target.querySelector('.skPlayer-total'),
                cover = target.querySelector('.skPlayer-cover');
            if(Array.isArray(music)){
                var musicItem = target.querySelectorAll('.skPlayer-list li');
                var listSwitch = target.querySelector('.skPlayer-list-switch');
                target.classList.add('skPlayer-list-on');
            }

            var duration;

            //事件绑定
            handleEvent();
        }else if(typeof options.music === 'number'){
            var music,target,audio,playBtn,currentTime,totalTime,currentVolume,totalVolume,quietVolume,currentTime_text,totalTime_text,cover,duration,musicItem,listSwitch;
            var sign = false;
            Public.ajax({
                url:'http://120.24.162.247:8001/api/Music?id=' + options.music,
                success:function(responseText){
                    //初始化
                        music = JSON.parse(responseText);
                        target = document.getElementById('skPlayer');
                    var HTMLcontent = '<audio src="' + music[0].src + '" preload="auto"></audio>';
                        HTMLcontent+= '<div class="skPlayer-picture">';
                        HTMLcontent+= '    <img src="' + music[0].cover + '" alt="" class="skPlayer-cover">';
                        HTMLcontent+= '    <a href="javascript:;" class="skPlayer-play-btn">';
                        HTMLcontent+= '        <span class="skPlayer-left"></span>';
                        HTMLcontent+= '        <span class="skPlayer-right"></span>';
                        HTMLcontent+= '    </a>';
                        HTMLcontent+= '</div>';
                        HTMLcontent+= '<div class="skPlayer-control">';
                        HTMLcontent+= '    <p class="skPlayer-name">' + music[0].name + '</p>';
                        HTMLcontent+= '    <p class="skPlayer-author">' + music[0].author + '</p>';
                        HTMLcontent+= '    <div class="skPlayer-percent">';
                        HTMLcontent+= '        <div class="skPlayer-line"></div>';
                        HTMLcontent+= '    </div>';
                        HTMLcontent+= '    <p class="skPlayer-time">';
                        HTMLcontent+= '        <span class="skPlayer-cur">00:00</span>/<span class="skPlayer-total">00:00</span>';
                        HTMLcontent+= '    </p>';
                        HTMLcontent+= '    <div class="skPlayer-volume skPlayer-hasList">';
                        HTMLcontent+= '        <i class="skPlayer-icon" data-volume="0"></i>';
                        HTMLcontent+= '        <div class="skPlayer-percent">';
                        HTMLcontent+= '            <div class="skPlayer-line"></div>';
                        HTMLcontent+= '        </div>';
                        HTMLcontent+= '    </div>';
                        HTMLcontent+= '    <div class="skPlayer-list-switch">';
                        HTMLcontent+= '        <i class="skPlayer-list-icon"></i>';
                        HTMLcontent+= '    </div>';
                        HTMLcontent+= '</div>';
                        HTMLcontent+= '<ul class="skPlayer-list">';
                    for(var item in music){
                        HTMLcontent+= '    <li data-index="' + item + '">';
                        HTMLcontent+= '        <i class="skPlayer-list-sign"></i>';
                        HTMLcontent+= '        <span class="skPlayer-list-index">' + (parseInt(item)+1) + '</span>';
                        HTMLcontent+= '        <span class="skPlayer-list-name">' + music[item].name + '</span>';
                        HTMLcontent+= '        <span class="skPlayer-list-author" title="' + music[item].author + '">' + music[item].author + '</span>';
                        HTMLcontent+= '    </li>';
                    }
                        HTMLcontent+= '</ul>';

                    target.innerHTML = HTMLcontent;
                    if(options.theme === 'red'){
                        target.className = 'skPlayer-red';
                    }
                    audio = target.querySelector('audio');
                    playBtn = target.querySelector('.skPlayer-play-btn');
                    currentTime = target.querySelector('.skPlayer-percent').querySelector('.skPlayer-line');
                    totalTime = target.querySelector('.skPlayer-percent');
                    currentVolume = target.querySelector('.skPlayer-volume').querySelector('.skPlayer-line');
                    totalVolume = target.querySelector('.skPlayer-volume').querySelector('.skPlayer-percent');
                    quietVolume = target.querySelector('.skPlayer-icon');
                    currentTime_text = target.querySelector('.skPlayer-cur');
                    totalTime_text = target.querySelector('.skPlayer-total');
                    cover = target.querySelector('.skPlayer-cover');
                    musicItem = target.querySelectorAll('.skPlayer-list li');
                    listSwitch = target.querySelector('.skPlayer-list-switch');
                    target.classList.add('skPlayer-list-on');

                    //事件绑定
                    handleEvent();

                },
                fail:function(status){
                    console.error('歌单拉取失败！');
                    sign = true;
                }
            });
            if(sign){
                return;
            }
        }

        //可播放状态
        function canPlayThrough(){
            if(options.loop === true){
                audio.loop = true;
            }
            duration = this.duration;
            currentTime_text.innerHTML = '00:00';
            totalTime_text.innerHTML = Public.timeFormat(parseInt(duration));
            if(audio.volume == 1){
                audio.volume = 0.7;
                currentVolume.style.width = '70%';
            }
        }
        //歌曲时长变动
        function durationChange() {
            duration = this.duration;
        }
        //时间更新
        function timeUpdate(){
            var curTime = parseInt(audio.currentTime);
            var playPercent = (curTime / duration) * 100;
            currentTime.style.width = playPercent.toFixed(2) + '%';
            currentTime_text.innerHTML = Public.timeFormat(curTime);
        }
        //播放结束
        function audioEnd(){
            if(Array.isArray(music) && music.length !== 1){
                var index = parseInt(target.querySelector('.skPlayer-curMusic').getAttribute('data-index')) + 1;
                if(index < music.length){
                    if(target.querySelector('.skPlayer-curMusic').nextSibling !== 1){
                        target.querySelector('.skPlayer-curMusic').nextSibling.nextSibling.classList.add('skPlayer-curMusic');
                    }else{
                        target.querySelector('.skPlayer-curMusic').nextSibling.classList.add('skPlayer-curMusic');
                    }
                    target.querySelector('.skPlayer-curMusic').classList.remove('skPlayer-curMusic');
                    var data = music[index];
                }else{
                    target.querySelector('.skPlayer-list li').classList.add('skPlayer-curMusic');
                    target.querySelectorAll('.skPlayer-curMusic')[1].classList.remove('skPlayer-curMusic');
                    var data = music[0];
                }
                target.querySelector('.skPlayer-name').innerHTML = data.name;
                target.querySelector('.skPlayer-author').innerHTML = data.author;
                target.querySelector('.skPlayer-cover').src = data.cover;
                audio.src = data.src;
                if(playBtn.classList.contains('skPlayer-pause')){
                    audio.play();
                }
            }else{
                playBtn.classList.remove('skPlayer-pause');
                cover.classList.remove('skPlayer-pause');
            }
            currentTime_text.innerHTML = '00:00';
            currentTime.style.width = 0;
        }
        //播放控制
        function playClick(){
            if(audio.paused){
                audio.play();
            }else{
                audio.pause();
            }
            if(playBtn.classList.contains('skPlayer-pause')){
                playBtn.classList.remove('skPlayer-pause');
                cover.classList.remove('skPlayer-pause');
            }else{
                playBtn.classList.add('skPlayer-pause');
                cover.classList.add('skPlayer-pause');
            }
        }
        //进度控制
        function timeLineClick(event){
            var e = window.event || event;
            var clickPercent;
            if(e.pageX){
                clickPercent = (e.pageX - Public.leftDistance(this)) / this.offsetWidth;
            }else{
                clickPercent = (e.clientX - Public.leftDistance(this)) / this.offsetWidth;
            }
            currentTime.style.width = clickPercent * 100 + '%';
            audio.currentTime = parseInt(clickPercent * duration);
        }
        //音量控制
        function volumeLineClick(event) {
            var e = window.event || event;
            if(quietVolume.classList.contains('skPlayer-quiet')){
                quietVolume.classList.remove('skPlayer-quiet');
            }
            var clickPercent;
            if(e.pageX){
                clickPercent = (e.pageX - Public.leftDistance(this)) / this.offsetWidth;
            }else{
                clickPercent = (e.clientX - Public.leftDistance(this)) / this.offsetWidth;
            }
            currentVolume.style.width = clickPercent * 100 + '%';
            audio.volume = clickPercent.toFixed(2);
        }
        //静音控制
        function volumeQuiet(){
            if(audio.volume != 0){
                quietVolume.setAttribute('data-volume',audio.volume);
                audio.volume = 0;
                currentVolume.style.width = 0;
                quietVolume.classList.add('skPlayer-quiet');
            }else{
                audio.volume = quietVolume.getAttribute('data-volume');
                currentVolume.style.width = quietVolume.getAttribute('data-volume') * 100 +'%';
                quietVolume.setAttribute('data-volume','0');
                quietVolume.classList.remove('skPlayer-quiet');
            }
        }
        function changeMusic(){
            if(!this.classList.contains('skPlayer-curMusic')){
                target.querySelector('.skPlayer-curMusic').classList.remove('skPlayer-curMusic');
                this.classList.add('skPlayer-curMusic');
                var index = this.getAttribute('data-index');
                var data = music[index];
                target.querySelector('.skPlayer-name').innerHTML = data.name;
                target.querySelector('.skPlayer-author').innerHTML = data.author;
                target.querySelector('.skPlayer-cover').src = data.cover;
                audio.src = data.src;
                if(playBtn.classList.contains('skPlayer-pause')){
                    audio.play();
                }
                currentTime_text.innerHTML = '00:00';
                currentTime.style.width = 0;
            }
        }
        function switchList(){
            target.classList.contains('skPlayer-list-on') ? target.classList.remove('skPlayer-list-on') : target.classList.add('skPlayer-list-on') ;

        }
        //事件绑定函数
        function handleEvent(){
            //audio.addEventListener('canplaythrough', canPlayThrough);
            playBtn.addEventListener('click', playClick);
            audio.addEventListener('canplay', canPlayThrough);
            audio.addEventListener('durationchange', durationChange);
            audio.addEventListener('timeupdate', timeUpdate);
            audio.addEventListener('ended', audioEnd);
            totalTime.addEventListener('click', timeLineClick);
            totalVolume.addEventListener('click', volumeLineClick);
            quietVolume.addEventListener('click', volumeQuiet);
            if(Array.isArray(music)){
                for(var item in music){
                    musicItem[item].addEventListener('click',changeMusic);
                }
                target.querySelector('.skPlayer-list li:nth-child(1)').classList.add('skPlayer-curMusic');
                listSwitch.addEventListener('click',switchList);
            }
        }
    };
    //暴露接口
    window.skPlayer = skPlayer;
})(window,document);
//处理模块化
if(typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
    module.exports = window.skPlayer;
}