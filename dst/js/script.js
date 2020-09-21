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

    // Object Options
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
            this.rest.classList.add('rest');
            this.rest.classList.add('fade');
            document.body.appendChild(this.rest);
            this.popup.classList.add('popup');
            this.rest.appendChild(this.popup);
            this.popupClose.classList.add('popup-close');
            this.popupClose.textContent = "X";
            this.popup.appendChild(this.popupClose);
            this.popupTitle.classList.add('popup-title');
            this.popup.appendChild(this.popupTitle);
            this.popupDescr.classList.add('popup-descr');
            this.popup.appendChild(this.popupDescr);
        }
    }

    let detail = document.querySelectorAll('.description-btn'),
        descrText = document.querySelectorAll('.description-text'),
        infoHeader = document.querySelectorAll('.info-header-tab');
    
    for (let i = 0; i < detail.length; i++) {
        detail[i].addEventListener('click', function() {
            const item = new Options(100, 100);
            item.createDiv();
            item.popupClose.addEventListener('click', function() {
                item.rest.style.display = 'none';
                more.classList.remove('more-splash');
                document.body.style.overflow = '';
            });
            item.popupDescr.textContent = descrText[i].textContent;
            item.popupTitle.textContent = infoHeader[i].textContent;
            item.rest.style.display = 'block';
            detail[i].classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    }

    //form
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'php/server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(form);
        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });

    //Contacts
    let mes = {
        loading: 'Отправка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let forma = document.getElementById('form'),
        inp = forma.getElementsByTagName('input'),
        statMessage = document.createElement('div');

    statMessage.classList.add('status');
    statMessage.style.color = '#ffffff';

    forma.addEventListener('submit', function(event) {
        event.preventDefault();
        forma.appendChild(statMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'php/server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formDat = new FormData(forma);

        let objec = {};
        
        
        for (let j = 0; j < inp.length; j++) {
            objec[inp[j].type] = inp[j].value;
        }

        let json = JSON.stringify(objec);

        request.send(json);

        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statMessage.innerHTML = mes.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statMessage.innerHTML = mes.success;
            } else {
                statMessage.innerHTML = mes.failure;
            }
        });

        for (let j = 0; j < inp.length; j++) {
            inp[j].value = '';
        }
    });

});
