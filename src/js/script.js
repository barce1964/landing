window.addEventListener('DOMContentLoaded', function() {

    'use strict';
    var tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (var i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        var target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for(var i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // Timer
    var deadline = '2020-09-28';

    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor(t / 1000 / 3600);

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime) {
        var timer = document.getElementById(id),
            hours = document.querySelector('.hours'),
            minutes = document.querySelector('.minutes'),
            seconds = document.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            var t = getTimeRemaining(endtime);

            function addZero(num){
                if(num <= 9) {
                    return '0' + num;
                } else return num;
            }

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadline);

    // Modal
    var more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    class Options {
        constructor(height = 10, width = 10, bg = '#ffffff', fontSize = 14, textAlign = 'left') {
            this.height = height;
            this.width = width;
            this.bg = bg;
            this.fontSize = fontSize;
            this.textAlign = textAlign;
            this.rest = document.createElement('div');
            this.popup = document.createElement('div');
            this.popupClose = document.createElement('div');
            this.popupTitle = document.createElement('div');
            this.popupDescr = document.createElement('div');
        }

        createDiv() {
            this.rest.className = "rest fade";
            document.body.appendChild(this.rest);
            this.popup.className = "popup";
            this.rest.appendChild(this.popup);
            this.popupClose.className = "popup-close";
            this.popupClose.textContent = "X";
            this.popup.appendChild(this.popupClose);
            this.popupTitle.className = "popup-title";
            this.popupTitle.textContent = "Ваш отдых";
            this.popup.appendChild(this.popupTitle);
            this.popupDescr.className = 'popup-descr';
            this.popupDescr.textContent = "Йога, массажи и плавание в море - помогут уставшей спине! Индийские йоги считали, что здоровье человека можно определить по тому, насколько здоров и гибок у него позвоночник. Интересно, что бы древние йоги сказали, глядя на современного человека, который уже со школьного возраста мучается болями в спине, работает подолгу в неудобных сидячих позах и не умеет расслабляться, имеет искривление, которое в итоге приведет к болезням других органов? Йоги сказали бы – займись собой и срочно!";
            this.popup.appendChild(this.popupDescr);
            
            //let param = `height:${this.height}px; width:${this.width}px; background-color:${this.bg}; font-size:${this.fontSize}px; text-align:${this.textAlign}`;
            //elem.style.cssText = param;
        }

        // createDiv() {
        //     let elem = document.createElement('div');
        //     document.body.appendChild(elem);
        //     let param = `height:${this.height}px; width:${this.width}px; background-color:${this.bg}; font-size:${this.fontSize}px; text-align:${this.textAlign}`;
        //     elem.style.cssText = param;
        // }
    }

    const item = new Options(100, 100);
    item.createDiv();
    item.popupClose.addEventListener('click', function() {
        item.rest.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    var detail = document.querySelectorAll('.description-btn');

    detail[0].addEventListener('click', function() {
        console.log('test');
    });
});
