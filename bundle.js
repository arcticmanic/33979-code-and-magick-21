(()=>{"use strict";window.GameConstants={Fireball:{size:22,speed:function(e){return e?2:5}||function(e){return e?2:5}},Wizard:{speed:3,width:70,getHeight:function(){return 93.59}||function(e){return 1.377*e},getX:function(e){return(e-70)/2}||function(e){return e/3},getY:function(e){return e/3}||function(e){return e-100}}},window.Game=function(){var e=300,t=700,n=["Кекс","Катя","Игорь"],i={},s="-reversed";i[0]={width:61,height:84,url:"img/wizard.gif"},i[0+s]={width:61,height:84,url:"img/wizard-reversed.gif"},i[1]={width:24,height:24,url:"img/fireball.gif"};var a={0:function(n,i,s){i.keysPressed.UP&&n.y>0&&(n.direction=-9&n.direction,n.direction=4|n.direction,n.y-=n.speed*s*2),i.keysPressed.UP||n.y<e-n.height&&(n.direction=-5&n.direction,n.direction=8|n.direction,n.y+=n.speed*s/3),i.keysPressed.LEFT&&(n.direction=-3&n.direction,n.direction=1|n.direction,n.x-=n.speed*s),i.keysPressed.RIGHT&&(n.direction=-2&n.direction,n.direction=2|n.direction,n.x+=n.speed*s),n.y<0&&(n.y=0),n.y>e-n.height&&(n.y=e-n.height),n.x<0&&(n.x=0),n.x>t-n.width&&(n.x=t-n.width)},1:function(e,n,i){1&e.direction&&(e.x-=e.speed*i),2&e.direction&&(e.x+=e.speed*i),(e.x<0||e.x>t)&&(e.state=1)}},r={CONTINUE:0,WIN:1,FAIL:2,PAUSE:3,INTRO:4},o={0:function(e){return e.garbage.filter((function(e){return 1===e.type})).filter((function(e){return e.x<10&&e.y>240}))[0]?r.WIN:r.CONTINUE}},d={0:function(n){return n.objects.push({direction:2,height:window.GameConstants.Wizard.getHeight(window.GameConstants.Wizard.width),speed:window.GameConstants.Wizard.speed,sprite:i[0],state:0,type:0,width:window.GameConstants.Wizard.width,x:window.GameConstants.Wizard.getX(t),y:window.GameConstants.Wizard.getY(e)}),n}},c=function(e){this.container=e,this.canvas=document.createElement("canvas"),this.canvas.width=e.clientWidth,this.canvas.height=e.clientHeight,this.container.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this._onKeyDown=this._onKeyDown.bind(this),this._onKeyUp=this._onKeyUp.bind(this),this._pauseListener=this._pauseListener.bind(this),this.setDeactivated(!1)};c.prototype={level:0,setDeactivated:function(e){this._deactivated!==e&&(this._deactivated=e,e?this._removeGameListeners():this._initializeGameListeners())},getInitialState:function(){return{currentStatus:r.CONTINUE,garbage:[],lastUpdated:null,keysPressed:{ESC:!1,LEFT:!1,RIGHT:!1,SPACE:!1,UP:!1},levelStartTime:null,objects:[],startTime:null}},initializeLevelAndStart:function(e){(e=void 0===e||e)||!this.state?(this._imagesArePreloaded=void 0,this.state=this.getInitialState(),this.state=d[this.level](this.state)):this.state.currentStatus=r.CONTINUE,this.state.levelStartTime=Date.now(),this.state.startTime||(this.state.startTime=this.state.levelStartTime),this._preloadImagesForLevel(function(){this.render(),this._initializeGameListeners(),this.update()}.bind(this))},pauseLevel:function(e){e&&(this.state.currentStatus=e),this.state.keysPressed.ESC=!1,this.state.lastUpdated=null,this._removeGameListeners(),window.addEventListener("keydown",this._pauseListener),this._drawPauseScreen()},_pauseListener:function(e){if(32===e.keyCode&&!this._deactivated){e.preventDefault();var t=this.state.currentStatus===r.WIN||this.state.currentStatus===r.FAIL;this.initializeLevelAndStart(t),window.removeEventListener("keydown",this._pauseListener)}},_drawPauseScreen:function(){var e;switch(this.state.currentStatus){case r.WIN:if(window.renderStatistics){var t=this._generateStatistics(new Date-this.state.startTime),n=this._shuffleArray(Object.keys(t));return void window.renderStatistics(this.ctx,n,n.map((function(e){return t[e]})))}e="Вы победили Газебо!\nУра!";break;case r.FAIL:e="Вы проиграли!";break;case r.PAUSE:e="Игра на паузе!\nНажмите Пробел, чтобы продолжить";break;case r.INTRO:e="Добро пожаловать!\nНажмите Пробел для начала игры"}this._drawMessage(e)},_generateStatistics:function(e){for(var t={Вы:e},i=0;i<n.length;i++){var s=e+(3e3*Math.random()-1500);s<1e3&&(s=1e3),t[n[i]]=s}return t},_shuffleArray:function(e){for(var t=e.length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),i=e[t];e[t]=e[n],e[n]=i}return e},_drawMessage:function(e){var t=this.ctx,n=function(e,n,i,s){t.beginPath(),t.moveTo(e,n),t.lineTo(e+10,n+s/2),t.lineTo(e,n+s),t.lineTo(e+i/2,n+s-10),t.lineTo(e+i,n+s),t.lineTo(e+i-10,n+s/2),t.lineTo(e+i,n),t.lineTo(e+i/2,n+10),t.lineTo(e,n),t.stroke(),t.closePath(),t.fill()};t.fillStyle="rgba(0, 0, 0, 0.7)",n(190,40,320,100),t.fillStyle="rgba(256, 256, 256, 1.0)",n(180,30,320,100),t.fillStyle="#000",t.font="16px PT Mono",e.split("\n").forEach((function(e,n){t.fillText(e,200,80+20*n)}))},_preloadImagesForLevel:function(e){if(void 0===this._imagesArePreloaded&&(this._imagesArePreloaded=[]),this._imagesArePreloaded[this.level])e();else for(var t=Object.keys(i),n=t.length,s=this,a=function(t){var i=new Image(t.width,t.height);i.onload=function(){t.image=i,0==--n&&(s._imagesArePreloaded[s.level]=!0,e())},i.src=t.url},r=0;r<t.length;r++)a(i[t[r]])},updateObjects:function(e){var t=this.state.objects.filter((function(e){return 0===e.type}))[0];this.state.keysPressed.SHIFT&&(this.state.objects.push({direction:t.direction,height:window.GameConstants.Fireball.size,speed:window.GameConstants.Fireball.speed(!!(1&t.direction)),sprite:i[1],type:1,width:window.GameConstants.Fireball.size,x:2&t.direction?t.x+t.width:t.x-window.GameConstants.Fireball.size,y:t.y+t.height/2}),this.state.keysPressed.SHIFT=!1),this.state.garbage=[];var n=this.state.objects.filter((function(t){return a[t.type](t,this.state,e),1!==t.state||(this.state.garbage.push(t),!1)}),this);this.state.objects=n},checkStatus:function(){if(this.state.currentStatus===r.CONTINUE){this.commonRules||(this.commonRules=[function(e){return 1===e.objects.filter((function(e){return 0===e.type}))[0].state?r.FAIL:r.CONTINUE},function(e){return e.keysPressed.ESC?r.PAUSE:r.CONTINUE},function(e){return Date.now()-e.startTime>18e4?r.FAIL:r.CONTINUE}]);for(var e=this.commonRules.concat(o[this.level]),t=r.CONTINUE;t===r.CONTINUE&&e.length;)t=e.shift()(this.state);this.state.currentStatus=t}},setGameStatus:function(e){this.state.currentStatus!==e&&(this.state.currentStatus=e)},render:function(){this.ctx.clearRect(0,0,t,e),this.state.objects.forEach((function(e){if(e.sprite){var t=1&e.direction,n=i[e.type+(t?s:"")]||i[e.type];this.ctx.drawImage(n.image,e.x,e.y,e.width,e.height)}}),this)},update:function(){this.state.lastUpdated||(this.state.lastUpdated=Date.now());var e=(Date.now()-this.state.lastUpdated)/10;switch(this.updateObjects(e),this.checkStatus(),this.state.currentStatus){case r.CONTINUE:this.state.lastUpdated=Date.now(),this.render(),requestAnimationFrame(function(){this.update()}.bind(this));break;case r.WIN:case r.FAIL:case r.PAUSE:case r.INTRO:this.pauseLevel()}},_onKeyDown:function(e){switch(e.keyCode){case 37:this.state.keysPressed.LEFT=!0;break;case 39:this.state.keysPressed.RIGHT=!0;break;case 38:this.state.keysPressed.UP=!0;break;case 27:this.state.keysPressed.ESC=!0}e.shiftKey&&(this.state.keysPressed.SHIFT=!0)},_onKeyUp:function(e){switch(e.keyCode){case 37:this.state.keysPressed.LEFT=!1;break;case 39:this.state.keysPressed.RIGHT=!1;break;case 38:this.state.keysPressed.UP=!1;break;case 27:this.state.keysPressed.ESC=!1}e.shiftKey&&(this.state.keysPressed.SHIFT=!1)},_initializeGameListeners:function(){window.addEventListener("keydown",this._onKeyDown),window.addEventListener("keyup",this._onKeyUp)},_removeGameListeners:function(){window.removeEventListener("keydown",this._onKeyDown),window.removeEventListener("keyup",this._onKeyUp)}},c.Verdict=r;var l=new c(document.querySelector(".demo"));return window.restartGame=function(e,t){i[0].url=e,i[0+s].url=t,l.initializeLevelAndStart(),l.setGameStatus(r.INTRO)},window.restartGame("img/wizard.gif","img/wizard-reversed.gif"),l}(),window.util={getRandomIntInRange:(e,t)=>(e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e),getRandomElement:e=>e[Math.floor(Math.random()*e.length)],getRandomItemNoRepeat(e){const t=Math.floor(Math.random()*e.length);return e.splice(e[t],1),e[t]},getRandomUsername(e,t){let n=window.util.getRandomItemNoRepeat(e),i=window.util.getRandomItemNoRepeat(t);return void 0===n||void 0===i?"Безымянный":n+" "+i},createErrorMessage(e){let t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: red;",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.fontSize="30px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)}},window.data={NAMES:["Иван","Хуан Себастьян","Мария","Кристоф","Виктор","Юлия","Люпита","Вашингтон"],SURNAMES:["да Марья","Верон","Мирабелла","Вальц","Онопко","Топольницкая","Нионго","Ирвинг"],COATS:["rgb(101, 137, 164)","rgb(241, 43, 107)","rgb(146, 100, 161)","rgb(56, 159, 117)","rgb(215, 210, 55)","rgb(0, 0, 0)"],EYES:["black","red","blue","yellow","green"],FIREBALLS:["#ee4830","#30a8ee","#5ce6c0","#e848d5","#e6e848"],MAX_SIMILAR_WIZARD_COUNT:4,KEY_ENTER:"Enter",KEY_ESCAPE:"Escape",MIN_NAME_LENGTH:2,MAX_NAME_LENGTH:25},window.debounce=function(e){let t=null;return function(...n){t&&window.clearTimeout(t),t=window.setTimeout((function(){e(...n)}),300)}},(()=>{const e=document.querySelector(".setup"),t=e.querySelector(".setup-wizard-form"),n=document.querySelector(".setup-open"),i=e.querySelector(".setup-close"),s=e.querySelector(".setup-user-name"),a=e.querySelector("[name=coat-color]"),r=e.querySelector("[name=eyes-color]"),o=e.querySelector("[name=fireball-color]"),d=function(){e.classList.remove("hidden"),document.addEventListener("keydown",l)},c=function(){e.classList.add("hidden"),document.removeEventListener("keydown",l)},l=function(e){e.key===window.data.KEY_ESCAPE&&document.activeElement!==s&&(e.preventDefault(),c())};n.addEventListener("click",(function(){d()})),n.addEventListener("keydown",(function(e){e.key===window.data.KEY_ENTER&&d()})),i.addEventListener("click",(function(){c()})),i.addEventListener("keydown",(function(e){e.key===window.data.KEY_ENTER&&c()})),s.addEventListener("invalid",(function(){s.validity.valueMissing?s.setCustomValidity("Обязательное поле"):s.setCustomValidity("")})),s.addEventListener("input",(function(){let e=s.value.length;e<window.data.MIN_NAME_LENGTH?(s.setCustomValidity("Ещё "+(window.data.MIN_NAME_LENGTH-e)+" симв."),s.reportValidity()):e>window.data.MAX_NAME_LENGTH?s.setCustomValidity("Удалите лишние "+(e-window.data.MAX_NAME_LENGTH)+" симв."):s.setCustomValidity("")}));const u=function(){e.classList.add("hidden")};t.addEventListener("submit",(function(e){e.preventDefault(),window.backend.save(new FormData(t),u,window.createErrorMessage)})),window.setup={userDialog:e,setupOpen:n,setupClose:i,setupCoatInput:a,setupEyesInput:r,setupFireballInput:o}})(),(()=>{const e=function(e,t){let n=new XMLHttpRequest;return n.responseType="json",n.timeout=1e4,n.addEventListener("load",(function(){200===n.status?e(n.response):t("Статус ответа: "+n.status+" "+n.statusText)})),n.addEventListener("error",(function(){t("Произошла ошибка соединения")})),n.addEventListener("timeout",(function(){t("Запрос не успел выполниться за "+n.timeout+"мс")})),n};window.backend={save:function(t,n,i){let s=e(n,i);s.open("POST","https://21.javascript.pages.academy/code-and-magick"),s.send(t)},load:function(t,n){let i=e(t,n);i.open("GET","https://21.javascript.pages.academy/code-and-magick/data"),i.send()}}})(),(()=>{let e={onEyesChange(){},onCoatChange(){},onFireballChange(){}};const t=document.querySelector(".setup-wizard"),n=t.querySelector(".wizard-coat"),i=t.querySelector(".wizard-eyes");document.querySelector(".setup-fireball-wrap").addEventListener("click",(function(t){const n=window.util.getRandomElement(window.data.FIREBALLS);t.currentTarget.style.background=n,window.setup.setupFireballInput.value=n,e.onCoatChange(n)})),n.addEventListener("click",(function(t){const n=window.util.getRandomElement(window.data.COATS);t.currentTarget.style.fill=n,window.setup.setupCoatInput.value=n,e.onCoatChange(n)})),i.addEventListener("click",(function(t){const n=window.util.getRandomElement(window.data.EYES);t.currentTarget.style.fill=n,window.setup.setupEyesInput.value=n,e.onEyesChange(n)})),window.wizard={setCoatChangeHandler(t){e.onCoatChange=t},setEyesChangeHandler(t){e.onEyesChange=t}}})(),function(){let e=[],t="rgb(101, 137, 164)",n="black";const i=function(e){let i=0;return e.colorCoat===t&&(i+=2),e.colorEyes===n&&(i+=1),i},s=function(){window.render(e.sort((function(e,t){let n=i(t)-i(e);return 0===n&&(n=function(e,t){return e>t?1:e<t?-1:0}(e.name,t.name)),n})))};window.wizard.setEyesChangeHandler(window.debounce((function(e){n=e,s()}))),window.wizard.setCoatChangeHandler(window.debounce((function(e){t=e,s()}))),window.backend.load((function(t){e=t,s()}),(function(e){let t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: red;",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.fontSize="30px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)})),window.wizards={coatColor:t,eyesColor:n,updateWizards:s}}(),(()=>{const e=window.setup.userDialog.querySelector(".setup-similar-list"),t=document.querySelector("#similar-wizard-template").content.querySelector(".setup-similar-item"),n=function(e){let n=t.cloneNode(!0);return n.querySelector(".setup-similar-label").textContent=e.name,n.querySelector(".wizard-coat").style.fill=e.colorCoat,n.querySelector(".wizard-eyes").style.fill=e.colorEyes,n};window.render=function(t){const i=document.createDocumentFragment(),s=t.length>window.data.MAX_SIMILAR_WIZARD_COUNT?window.data.MAX_SIMILAR_WIZARD_COUNT:t.length;e.innerHTML="";for(let e=0;e<s;e++)i.appendChild(n(t[e]));e.appendChild(i),window.setup.userDialog.querySelector(".setup-similar").classList.remove("hidden")}})(),(()=>{const e=document.querySelector(".setup"),t=e.querySelector(".upload");t.addEventListener("mousedown",(function(n){n.preventDefault();let i={x:n.clientX,y:n.clientY},s=!1,a=function(t){t.preventDefault(),s=!0;let n=i.x-t.clientX,a=i.y-t.clientY;i={x:t.clientX,y:t.clientY},e.style.top=e.offsetTop-a+"px",e.style.left=e.offsetLeft-n+"px"},r=function(e){if(e.preventDefault(),document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",r),s){let e=function(n){n.preventDefault(),t.removeEventListener("click",e)};t.addEventListener("click",e)}};document.addEventListener("mousemove",a),document.addEventListener("mouseup",r)})),window.setup.setupOpen.addEventListener("click",(function(){e.style.removeProperty("top"),e.style.removeProperty("left")}))})(),(()=>{const e=function(e,t,n,i){e.fillStyle=i,e.fillRect(t,n,420,270)},t=function(e,t,n,i,s,a="start"){e.font="16px PT Mono",e.textBaseline="hanging",e.fillStyle=s,e.textAlign=a,e.fillText(t,n,i)};window.renderStatistics=function(n,i,s){let a,r=20;e(n,150,20,"rgba(0, 0, 0, 0.7)"),e(n,140,10,"#fff"),t(n,"Ура вы победили!",350,20,"#000000","center"),t(n,"Список результатов:",350,40,"#000000","center"),n.fillStyle="#000000",n.textAlign="start";let o=function(e){let t=e[0];for(let n=1;n<e.length;n++)e[n]>t&&(t=e[n]);return t}(s);for(let e=0;e<i.length;e++)r=10*(10,Math.floor(Math.random()*Math.floor(10))),a="Вы"===i[e]?"rgba(255, 0, 0, 1)":`hsl(215, ${r}%, 50%)`,t(n,i[e],190+90*e,250,a),n.fillRect(190+90*e,240,40,-150*s[e]/o);for(let e=0;e<s.length;e++)t(n,Math.round(s[e]),190+90*e,70,"#000000")}})(),(()=>{const e=["gif","jpg","jpeg","png"],t=document.querySelector(".upload input[type=file]"),n=document.querySelector(".setup-user-pic");t.addEventListener("change",(function(){let i=t.files[0],s=i.name.toLowerCase();if(e.some((function(e){return s.endsWith(e)}))){let e=new FileReader;e.addEventListener("load",(function(){n.src=e.result})),e.readAsDataURL(i)}}))})()})();