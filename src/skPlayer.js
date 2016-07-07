/**
 * Created by Scott on 2016/7/7.
 */
(function(window){
    //公共方法
    var Public = {
        'timeFormat': function (time) {
            var tempMin = parseInt(time / 60);
            var tempSec = parseInt(time % 60);
            var curMin  = tempMin < 10 ? ('0' + tempMin) : tempMin;
            var curSec  = tempSec < 10 ? ('0' + tempSec) : tempSec;
            return curMin + ':' + curSec;
        },
        'leftDistance': function (el) {
            var left = el.offsetLeft;
            while (el.offsetParent) {
                el = el.offsetParent;
                left += el.offsetLeft;
            }
            return left;
        }
    };
    //对象主体
    skPlayer = function(options){
        //配置检测
        if(!(options.src && options.name && options.author && options.cover)){
            console.error('请正确配置对象！');
            return;
        }
        //初始化
        var music = options,
            target = document.getElementById('skPlayer'),
            HTMLcontent = '<audio src="' + music.src + '" preload="auto"></audio>';
            HTMLcontent+= '<div class="picture">';
            HTMLcontent+= '    <img src="' + music.cover + '" alt="" class="cover">';
            HTMLcontent+= '    <a href="javascript:;" class="play-btn">';
            HTMLcontent+= '        <span class="left"></span>';
            HTMLcontent+= '        <span class="right"></span>';
            HTMLcontent+= '    </a>';
            HTMLcontent+= '</div>';
            HTMLcontent+= '<div class="control">';
            HTMLcontent+= '    <p class="name">' + music.name + '</p>';
            HTMLcontent+= '    <p class="author">' + music.author + '</p>';
            HTMLcontent+= '    <div class="percent">';
            HTMLcontent+= '        <div class="line"></div>';
            HTMLcontent+= '    </div>';
            HTMLcontent+= '    <p class="time">';
            HTMLcontent+= '        <span class="cur"></span>/<span class="total"></span>';
            HTMLcontent+= '    </p>';
            HTMLcontent+= '    <div class="volume">';
            HTMLcontent+= '        <i class="icon"></i>';
            HTMLcontent+= '        <div class="percent">';
            HTMLcontent+= '            <div class="line"></div>';
            HTMLcontent+= '        </div>';
            HTMLcontent+= '    </div>';
            HTMLcontent+= '</div>';
            HTMLcontent+= '<div class="loading">';
            HTMLcontent+= '    LOADING';
            HTMLcontent+= '</div>';

        target.innerHTML = HTMLcontent;

        var audio = target.querySelector('audio'),
            playBtn = target.querySelector('.play-btn'),
            currentTime = target.querySelector('.percent').querySelector('.line'),
            totalTime = target.querySelector('.percent'),
            currentVolume = target.querySelector('.volume').querySelector('.line'),
            totalVolume = target.querySelector('.volume').querySelector('.percent'),
            currentTime_text = target.querySelector('.cur'),
            totalTime_text = target.querySelector('.total'),
            loading = target.querySelector('.loading'),
            cover = target.querySelector('.cover');

        var duration;

        //事件绑定
        handleEvent();
        //可播放状态
        function canPlayThrough(){
            if((music.loop != 'undefined') && (music.loop == true)){
                audio.loop = true;
            }
            duration = this.duration;
            currentTime_text.innerText = '00:00';
            totalTime_text.innerText = Public.timeFormat(parseInt(duration));
            if(audio.volume == 1){
                audio.volume = 0.7;
                currentVolume.style.width = '70%';
            }
            loading.style.backgroundColor = 'rgba(255,255,255,.0)';
            loading.style.color = 'rgba(117,101,98,.0)';
            setTimeout(function(){
                loading.style.display = 'none';
                playBtn.addEventListener('click', playClick);
            },900);
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
            currentTime_text.innerText = Public.timeFormat(curTime);
        }
        //播放结束
        function audioEnd(){
            playBtn.classList.remove('pause');
            cover.classList.remove('pause');
            currentTime_text.innerText = '00:00';
            currentTime.style.width = 0;
        }
        //播放控制
        function playClick(){
            if(audio.paused){
                audio.play();
            }else{
                audio.pause();
            }
            if(Array.prototype.indexOf.call(playBtn.classList,'pause') >= 0){
                playBtn.classList.remove('pause');
                cover.classList.remove('pause');
            }else{
                playBtn.className = "play-btn pause";
                cover.className = "cover pause";
            }
        }
        //进度控制
        function timeLineClick(){
            var clickPercent = (event.pageX - Public.leftDistance(this)) / this.offsetWidth;
            currentTime.style.width = clickPercent * 100 + '%';
            audio.currentTime = parseInt(clickPercent * duration);
        }
        //音量控制
        function volumeLineClick() {
            var clickPercent = (event.pageX - Public.leftDistance(this)) / this.offsetWidth;
            currentVolume.style.width = clickPercent * 100 + '%';
            audio.volume = clickPercent.toFixed(2);
        }
        //事件绑定函数
        function handleEvent(){
            audio.addEventListener('canplaythrough', canPlayThrough);
            audio.addEventListener('durationchange', durationChange);
            audio.addEventListener('timeupdate', timeUpdate);
            audio.addEventListener('ended', audioEnd);
            totalTime.addEventListener('click', timeLineClick);
            totalVolume.addEventListener('click', volumeLineClick);
        }
    };
    //暴露接口
    if(typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
        module.exports = skPlayer;
    }else{
        window.skPlayer = skPlayer;
    }
})(window);