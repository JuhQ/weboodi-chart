!function(e){var t={};function n(a){if(t[a])return t[a].exports;var i=t[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(a,i,function(t){return e[t]}.bind(null,i));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.notEmpty=(e=>e.length>0);t.notEmptyList=(e=>e.length>0)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(2),i=n(0),s=n(3),o=n(4),r=n(5),l=s.setLocalStorage("duplikaattiKurssit"),u=s.setLocalStorage("perusOpinnot"),p=s.setLocalStorage("aineOpinnot"),k=s.setLocalStorage("pääaine"),d=s.setLocalStorage("sivuaineet"),c=()=>s.getListFromLocalStorage("duplikaattiKurssit"),m=()=>s.getListFromLocalStorage("perusOpinnot"),v=()=>s.getListFromLocalStorage("aineOpinnot"),y=()=>s.getLocalStorage("pääaine","null"),b=()=>s.getListFromLocalStorage("sivuaineet"),h=e=>Math.max(...e),g=e=>e.toLowerCase(),f=(e,t)=>e.reduce((e,n)=>[...e,...(r.isString(t)?[t]:t).map(e=>n[e])],[]),j=(e,t)=>e.sort((e,n)=>n[t]-e[t]),T=({id:e,content:t})=>{const n=document.getElementById(e);null!==n?n.innerHTML=t:console.error("setHtmlContent(): Element with id %s is null",e)},O=["pink","red","orange","yellow","green","blue","indigo","purple"],K=({db:e,lyhenne:t})=>Object.keys(e).reduce((n,a)=>{const i=!n.length&&r.isArray(e[a])&&e[a].find(({keys:e})=>e.map(g).includes(t.toLowerCase()));return n||(r.isArray(e[a])?i?i.name:n:K({db:e[a],lyhenne:t}))},""),A=e=>K({db:a.kurssitietokanta,lyhenne:e}),w=()=>({tooltips:{callbacks:{label:(e,t)=>{const n=t.datasets[e.datasetIndex].label||"",a=Math.round(100*e.yLabel)/100;return`${n}: ${e.datasetIndex||(e=>Number(e)===e&&e%1!=0)(a/10)?a:a/10}`}}}}),$=({id:e,labels:t,datasets:n,type:a="bar",customTooltip:i=!1,customTicks:s=!1})=>{const o=55*Math.ceil(h(f(n,"data").map(h))/55),r=document.getElementById(e);if(null===r)throw new Error("draw(): Element with id "+e+"is null");new Chart(r,{type:a,data:{labels:t,datasets:n},options:Object.assign({},i&&w(),{scales:{yAxes:[Object.assign({},s&&{gridLines:{drawBorder:!1,color:O}},{ticks:Object.assign({beginAtZero:!0},s&&{max:o,stepSize:55})})]}})})},L={backgroundColor:"rgba(255, 99, 132, 0.2)",borderColor:"rgba(255,99,132,1)",borderWidth:1},S={backgroundColor:"rgba(118, 99, 255, 0.2)",borderColor:"rgba(118,99,132,1)",borderWidth:1},x={backgroundColor:"rgba(99, 255, 157, 0.2)",borderColor:"rgba(99,99,132,1)",borderWidth:1},E=({name:e,callback:t})=>{const n=document.querySelector(`input[name='${e}']`);if(null===n)throw new Error("luoInputKuuntelijaJokaAsettaaArraynCallbackiin(): Input is null");n.addEventListener("input",({target:e})=>{if(null===e)throw new Error("createCoursesArray(): Cannot create a course array if the target is null");t((e=>e.value.split(",").map(P).filter(i.notEmpty))(e))})},M=e=>f(a.kurssitietokanta.tkt[e],"keys").reduce((e,t)=>[...e,...t],[]),Y=()=>{E({name:"duplikaattiKurssit",callback:l}),E({name:"perusOpinnot",callback:u}),E({name:"aineOpinnot",callback:p}),(()=>{const e=document.querySelector("input[name='pääaine']");if(null===e)throw new Error("jepulisKuuntelePääaineenMuutoksia(): Input is null");e.addEventListener("input",({target:e})=>{if(null===e)throw new Error("jepulisKuuntelePääaineenMuutoksia(): Target is null");k(e.value.trim())})})(),E({name:"sivuaineet",callback:d}),(()=>{const e=document.querySelector("button#kliketi-klik");if(null===e)throw new Error("kuunteleppaNapinpainalluksiaJuu(): Input is null");e.addEventListener("click",Te)})(),(()=>{const e=document.querySelector("button#kliketi-klik-esitäyttö-2017");if(null===e)throw new Error("kuunteleEsitäyttönapinKliksutteluja2017(): Input with id `button#kliketi-klik-esitäyttö-2017` is null");e.addEventListener("click",()=>{u(M("perusopinnot")),p(M("aineopinnot")),Te()})})(),(()=>{const e=document.querySelector("button#kliketi-klik-esitäyttö-pre-2017");if(null===e)throw new Error("kuunteleEsitäyttönapinKliksutteluja2016(): Input with id `button#kliketi-klik-esitäyttö-pre-2017` is null");e.addEventListener("click",()=>{u(M("perusopinnotPre2017")),p(M("aineopinnotPre2017")),Te()})})()},N=e=>e.reduce((e,t)=>((e,t)=>e.find(e=>e.pvm===t))(e,t.pvm)?e.map((({pvm:e,op:t})=>n=>{const a=n.pvm===e?{cumulativeOp:t+n.cumulativeOp,op:t+n.op}:null;return Object.assign({},n,a)})(t)):[...e,t],[]).map(e=>Object.assign({},e,{op:e.op<=10?10*e.op:e.op,realOp:e.op})),P=e=>e.replace(/&nbsp;/g," ").trim(),C=([e,t,n,a,i="01.01.1970",s])=>({pvm:i,kurssi:t,lyhenne:e,luennoitsija:s,op:Number(J(n)),arvosana:Number(a),pvmDate:ne(ae(i))}),I=(e,t,n)=>[...e,Object.assign({},t,{cumulativeOp:t.op+(n&&e[n-1].cumulativeOp)})],_=e=>(()=>[...Array.from(document.querySelectorAll("[name=suoritus] + table + table:not(.eisei) table.eisei tbody tr"))])().map(e=>[...Array.from(e.querySelectorAll("td"))]).filter(e=>i.notEmptyList(e)).map(e=>f(e,"textContent").map(P)).filter(([t])=>!e.includes(t)).reverse().filter(e=>e.length>3).map(C).filter(({op:e})=>!isNaN(e)).sort((e,t)=>e.pvmDate.getTime()-t.pvmDate.getTime()).reduce(I,[]),F=(e,t)=>e.reduce((e,n,a)=>a<t?[...e,n]:e,[]),D=e=>e.filter(e=>!isNaN(e.arvosana)).map((e,t,n)=>Object.assign({},e,{keskiarvo:o.average(F(f(n,"arvosana"),t+1)).toFixed(2)})),q=(e,t)=>[...e,...t.luennoitsija.split(",").map(P).filter(i.notEmpty).map(e=>Object.assign({},t,{luennoitsija:e}))],U=e=>e.replace("Avoin yo:","").replace("Open uni:","").trim(),J=e=>e.replace(/\(|\)/g,"").trim(),H=e=>e.replace(",","").trim(),B=e=>e.length>2,G=({luennoitsija:e,kurssimaara:t,luennot:n})=>`<p>\n    ${e},\n    kursseja ${t},\n    keskiarvo: ${n.keskiarvo},\n    noppia: ${n.totalOp}\n  </p>`,z=({title:e,lista:t,luennoitsijatElement:n})=>{const a=`\n    <div class="luennoitsijat pull-left">\n      <p><strong>${e}</strong></p>\n      ${t.map(G).join("")}\n    </div>\n  `;void 0!==n&&(n.innerHTML=n.innerHTML+a)},V=e=>t=>t.kurssi===e,W=e=>Object.assign({},e,{kurssi:e.kurssi.replace("Avoin yo: ","").replace("Open uni: ","")}),R=e=>t=>!e(t),Q=({id:e,stuff:t,data:n})=>{const[a,i]=((e,t)=>[e.filter(R(t)),e.filter(t)])(n,e=>!t.find(t=>e===t.lyhenne)),s=[...a.map(e=>({lyhenne:e,done:!0})),...i.map(e=>({lyhenne:e,done:!1}))].map(({lyhenne:e,done:t})=>({kurssi:A(e)||e,done:t})).reduce((e=>(t,n)=>t.find(V(n.kurssi))||e.find(V(n.kurssi))?t:[...t,n])(a),[]).map(W),o=a.length===s.length?"All done, nice!":"";T({id:`${e}-progress`,content:`${a.length}/${s.length} ${o}`}),(({id:e,labels:t,datasets:n,backgroundColor:a})=>{const i=document.getElementById(`${e}-container`);if(null===i)throw new Error("drawPie(): Element with id "+e+"-container is null");i.style.display="block";const s=document.getElementById(e);if(null===s)throw new Error("drawPie(): Element with id "+e+" is null");new Chart(s,{type:"pie",data:{datasets:[{data:n,backgroundColor:a}],labels:t}})})({id:e,labels:f(s,"kurssi"),datasets:s.map(()=>1/s.length*100),backgroundColor:s.map(({done:e})=>e?"lightgreen":"lightgray")})},Z=({stuff:e,keskiarvot:t,kurssit:n})=>{if(!n.length)return[];const a=(({kurssit:e,stuff:t})=>D(t.filter(({lyhenne:t})=>e.includes(t))))({kurssit:n,stuff:e});return t.reduce((e,t)=>{const n=(({opinnot:e,lyhenne:t})=>e.find(e=>t===e.lyhenne))({opinnot:a,lyhenne:t.lyhenne});if(n)return[...e,Object.assign({},n,{fromOpinnot:!0})];const i=e.filter(({fromOpinnot:e})=>e).reverse()[0];return[...e,Object.assign({},i,{arvosana:0})||t]},[])},X=({keskiarvot:e,keskiarvotPerusopinnoista:t,keskiarvotAineopinnoista:n})=>[i.notEmpty(e)&&Object.assign({label:"Kurssien keskiarvo",data:f(e,"keskiarvo")},L),i.notEmpty(t)&&Object.assign({label:"Perusopintojen keskiarvo",data:f(t,"keskiarvo")},S),i.notEmpty(n)&&Object.assign({label:"Aineopintojen keskiarvo",data:f(n,"keskiarvo")},x)].filter(r.isTruthy),ee=e=>[{label:"Päivän opintopisteet",data:f(e,"op")},Object.assign({label:"Suoritukset",data:f(e,"cumulativeOp")},L,{type:"line"})].filter(r.isTruthy),te=e=>[new Date(e,7,1),new Date(e+1,6,31,23,59,59)],ne=([e,t,n])=>new Date(n,t-1,e),ae=e=>{const t=e.split(".");if(3===t.length)return t.map(Number);throw new Error("getPvmArray(): Parsing date failed")},ie=(e,t)=>e.pvmDate.getTime()-t.pvmDate.getTime(),se=({value:e,values:[t,n]})=>e>=t&&e<=n,oe=(e,{pvmDate:t,op:n})=>{const a=t.getFullYear(),i=(({vuosi:e,pvmIsCurrentSemester:t,pvmIsNextSemester:n})=>{let a=0;return a=t?e:n?e+1:e-1})({vuosi:a,pvmIsCurrentSemester:se({value:t,values:te(a)}),pvmIsNextSemester:se({value:t,values:te(a+1)})});return Object.assign({},e,{[i]:n+(e[i]||0)})},re=e=>{const t=e.getFullYear();return`${e.toLocaleString("fi",{month:"long"})} ${t}`},le=(e,{pvmDate:t,op:n})=>{const a=re(t);return Object.assign({},e,{[a]:n+(e[a]||0)})},ue=(e,{pvmDate:t,cumulativeOp:n})=>Object.assign({},e,{[re(t)]:n}),pe=({fn:e,stuff:t})=>t.sort(ie).reduce(e,{}),ke=({label:e,data:t,secondDataSet:n})=>[Object.assign({label:e,data:t},S),n&&Object.assign({},n,{type:"line"},x)].filter(r.isTruthy),de=({id:e,label:t,labels:n,data:a,secondDataSet:i})=>$({id:e,type:i?"bar":"line",labels:n,datasets:ke({label:t,data:a,secondDataSet:i})}),ce=(e,t)=>t.luennot.keskiarvo-e.luennot.keskiarvo||t.kurssimaara-e.kurssimaara,me=({key:e,data:t})=>`${e} ${t.laitos} keskiarvo on ${isNaN(t.keskiarvo)?"hyv":t.keskiarvo} ja painotettu keskiarvo on ${isNaN(t.painotettuKeskiarvo)?"hyv":t.painotettuKeskiarvo}`,ve=({kurssimaara:e,luennoitsijamaara:t,op:n,openUniMaara:a,openUniOp:i,hyvMaara:s,hyvOp:o,maxKuukausi:r,keskiarvo:l,painotettuKeskiarvo:u,"pääaine":p,sivuaineet:k})=>{T({id:"opintojen-maara",content:`Olet suorittanut huimat ${e} erilaista kurssia! Good for you!`});const[d,c]=r[0].split(" ");T({id:"max-kuukausi-nopat",content:`Olit tulessa ${d}ssa ${c}! Suoritit silloin ${r[1]} noppaa! Whoah!`}),T({id:"keskiarvo",content:`Opintojen keskiarvo: ${l}. Painotettu keskiarvo: ${u}.`}),T({id:"luennoitsijoiden-maara",content:`Olet käynyt ${t} eri luennoitsijan kursseilla, ${(e/t).toFixed(2)} kurssia per luennoitsija, ${(n/t).toFixed(2)} op per luennoitsija.`}),T({id:"keskiarvo-op-maara",content:`Keskiarvolta ${(n/e).toFixed(2)} noppaa per kurssi.`}),a&&(({kurssimaara:e,openUniMaara:t,openUniOp:n})=>{const a=(t/e*100).toFixed(2);T({id:"open-uni-maara",content:`Olet suorittanut ${t} avoimen kurssia, joka on ${a}% opinnoistasi. Yhteensä ${n} op.`})})({kurssimaara:e,openUniMaara:a,openUniOp:i}),s&&(({kurssimaara:e,hyvMaara:t,hyvOp:n})=>{const a=(t/e*100).toFixed(2);T({id:"hyv-maara",content:`Olet saanut ${t} hyv merkintää, joka on ${a}% opinnoistasi. Yhteensä ${n} op.`})})({kurssimaara:e,hyvMaara:s,hyvOp:o}),p&&T({id:"pääaine-data",content:me({key:"Pääaineesi",data:p})}),k&&T({id:"sivuaineet-data",content:k.map(e=>me({key:"Sivuaineesi",data:e})).join("<br>")}),(e=>{const t=(e/60).toFixed(2);T({id:"vuodet-arvio",content:`Opintopistemäärän mukaan arvioin sinun suorittaneen ${t} vuotta opintojasi. Laskukaava = <span title="Opintopistemäärä / vuoden tavoiteopintopistemäärä">${e} / 60</span>.`})})(n)},ye=({val:e,minValue:t,maxValue:n})=>e>t?28*(e-t)/(n-t)+7:1,be=e=>void 0!==e.luennoitsija,he=e=>e.includes("avoin yo")||e.includes("open uni"),ge=e=>{const t=e.filter(({arvosana:e})=>!isNaN(e));return(t.reduce((e,{op:t,arvosana:n})=>e+n*t,0)/f(t,"op").reduce(o.sum,0)).toFixed(2)},fe=({stuff:e,key:t})=>e.reduce((e,n)=>Object.assign({},e,{[n[t]]:e[n[t]]?e[n[t]]+1:1}),{}),je=({id:e,label:t,data:n})=>$({id:e,type:"bar",labels:Object.keys(n).map(e=>`${t} ${isNaN(e)?"hyv":e}`),datasets:[Object.assign({label:"Suorituksia",data:Object.values(n)},S)]}),Te=()=>{if(!(()=>!!document.querySelector("[name=suoritus] + table + table"))())return;const{duplikaattiKurssit:e,perusOpinnot:t,aineOpinnot:n,"pääaine":a,sivuaineet:s}=(()=>({duplikaattiKurssit:c(),perusOpinnot:m(),aineOpinnot:v(),"pääaine":y(),sivuaineet:b()}))();(({duplikaattiKurssit:e,aineOpinnot:t,perusOpinnot:n,"pääaine":a,sivuaineet:i})=>{const s=document.querySelector("[name=suoritus] + table + table"),o=document.querySelector("#nuggets"),r=(({duplikaattiKurssit:e,perusOpinnot:t,aineOpinnot:n,"pääaine":a,sivuaineet:i})=>`\n  <div id="nuggets" class="margin-bottom-large">\n    <div class="clear margin-bottom-small">\n      <div id="perusopinnot-container" class="jeejee-pull-left" style="display:none;">\n        Perusopinnot <span id="perusopinnot-progress"></span>\n        <canvas id="perusopinnot" width="500" height="200"></canvas>\n      </div>\n      <div id="aineopinnot-container" class="jeejee-pull-left" style="display:none;">\n        Aineopinnot <span id="aineopinnot-progress"></span>\n        <canvas id="aineopinnot" width="500" height="200"></canvas>\n      </div>\n    </div>\n    <div class="clear">\n      <div class="jeejee-pull-left half">\n        <canvas id="chart-nopat" width="500" height="200"></canvas>\n      </div>\n      <div class="jeejee-pull-left half">\n        <canvas id="chart-keskiarvo" width="500" height="200"></canvas>\n      </div>\n    </div>\n    <div class="clear">\n      <div class="jeejee-pull-left half">\n        <canvas id="chart-nopat-kuukaudet" width="500" height="200"></canvas>\n      </div>\n      <div class="jeejee-pull-left half">\n        <div id="opintojen-maara"></div>\n        <div id="keskiarvo-op-maara"></div>\n        <div id="luennoitsijoiden-maara"></div>\n        <div id="open-uni-maara"></div>\n        <div id="hyv-maara"></div>\n        <div id="vuodet-arvio"></div>\n        <div id="max-kuukausi-nopat"></div>\n        <div id="keskiarvo"></div>\n        <div id="pääaine-data"></div>\n        <div id="sivuaineet-data"></div>\n        <div id="tagipilvi"></div>\n      </div>\n    </div>\n    <div class="clear">\n      <div class="jeejee-pull-left half">\n        <canvas id="chart-nopat-vuosi" width="500" height="200"></canvas>\n        <canvas id="chart-laitos-graafit" width="500" height="200"></canvas>\n      </div>\n      <div class="jeejee-pull-left half">\n        <canvas id="chart-arvosanat-groupattuna" width="500" height="200"></canvas>\n        <canvas id="chart-nopat-groupattuna" width="500" height="200"></canvas>\n      </div>\n    </div>\n\n    <div id="luennoitsijat"></div>\n    <div id="tools" class="margin-bottom-large">\n      <p>\n        <label style="margin-bottom:30px;">\n          Merkkaa tähän inputtiin pilkulla erottaen mahdolliset duplikaattikurssit, kas näin: A582103,A581325<br/>\n          <input type="text" name="duplikaattiKurssit" value="${e}" />\n        </label>\n      </p>\n\n      <p>\n        <label style="margin-bottom:30px;">\n          Merkkaa tähän inputtiin pilkulla erottaen perusopintokurssisi pääaineesta, kas näin vaikkapa: A582103,A581325<br/>\n          <input type="text" name="perusOpinnot" value="${t}" />\n        </label>\n      </p>\n\n      <p>\n        <label style="margin-bottom:30px;">\n          Merkkaa tähän inputtiin pilkulla erottaen aineopintokurssi pääaineesta, kas näin vaikkapa: A582103,A581325<br/>\n          <input type="text" name="aineOpinnot" value="${n}" />\n        </label>\n      </p>\n\n      <p>\n        <label style="margin-bottom:30px;">\n          Merkkaa tähän inputtiin pääaineesi tunnus, vaikka näin: TKT<br/>\n          <input type="text" name="pääaine" value="${a}" />\n        </label>\n      </p>\n\n      <p>\n        <label style="margin-bottom:30px;">\n          Merkkaa tähän inputtiin pilkulla erottaen sivuaineesi tunnukset, vaikka näin: TKT,MAT<br/>\n          <input type="text" name="sivuaineet" value="${i.join(",")}" />\n        </label>\n      </p>\n\n      <p>\n        <button id="kliketi-klik">\n          Päivitä chartit, esimerkiksi duplikaattikurssien lisäämisen jälkeen\n        </button>\n      </p>\n\n      <p>\n        <button id="kliketi-klik-esitäyttö-2017">\n          Esitäytä perus- ja aineopinnot tkt kandi opinnoilla (2017 &ge; ) huom: sisältää myös avoimen ja vanhan malliset lyhenteet\n        </button>\n      </p>\n\n      <p>\n        <button id="kliketi-klik-esitäyttö-pre-2017">\n          Esitäytä perus- ja aineopinnot tkt kandi opinnoilla (&le; 2016) huom: sisältää myös avoimen ja vanhan malliset lyhenteet\n        </button>\n      </p>\n    </div>\n\n    <p>\n      Haluatko lisätoiminnallisuutta tähän plugariin? Löysitkö virheen?<br>\n      Mikäli olet tkt opiskelija, <a href="https://github.com/JuhQ/weboodi-chart">tee pull request</a>.<br>\n      Mikäli opiskelet jotain muuta, laita mailia juha.tauriainen@helsinki.fi\n    </p>\n\n    <p>\n      Plugin löytyy googlen webstoresta <a href="https://chrome.google.com/webstore/detail/weboodi-charts/mmjejalobgipeicnedjpcnjkeamamlnd">https://chrome.google.com/webstore/detail/weboodi-charts/mmjejalobgipeicnedjpcnjkeamamlnd</a><br>\n      Lyhytosoite <a href="https://goo.gl/TrpRJr">https://goo.gl/TrpRJr</a>\n    </p>\n  </div>\n  `)({duplikaattiKurssit:e,aineOpinnot:t,perusOpinnot:n,"pääaine":a,sivuaineet:i});!!s&&(o?o.outerHTML=r:s.outerHTML=s.outerHTML+"\n  <style>\n    #luennoitsijat {\n      clear: both;\n      display: inline-block;\n      margin-bottom: 100px;\n    }\n\n    .luennoitsijat {\n      margin-right: 10px;\n    }\n\n    .clear {\n      clear: both;\n      display: table;\n      width: 100%;\n    }\n\n    @media only screen and (min-width: 900px) {\n      .jeejee-pull-left {\n        float: left;\n      }\n\n      .half {\n        width: 50%;\n      }\n    }\n\n    .margin-bottom-large {\n      margin-bottom: 100px;\n    }\n\n    .margin-bottom-small {\n      margin-bottom: 20px;\n    }\n\n    #nuggets input {\n      width: 100%;\n    }\n  </style>\n  "+r)})({duplikaattiKurssit:e,perusOpinnot:t,aineOpinnot:n,"pääaine":a,sivuaineet:s});const r=_(e).filter(be);if(!r.length)return;const l=D(r),{keskiarvotPerusopinnoista:u,keskiarvotAineopinnoista:p}=(({stuff:e,keskiarvot:t,perusOpinnot:n,aineOpinnot:a})=>{return{keskiarvotPerusopinnoista:Z({stuff:e,keskiarvot:t,kurssit:n}),keskiarvotAineopinnoista:Z({stuff:e,keskiarvot:t,kurssit:a})}})({stuff:r,keskiarvot:l,perusOpinnot:t,aineOpinnot:n}),k=(e=>e.reduce(q,[]).map((e,t,n)=>{const a=n.filter(({luennoitsija:t})=>t===e.luennoitsija),i=f(a.filter(e=>!isNaN(e.arvosana)),"arvosana"),s=o.average(i);return Object.assign({},e,{kurssimaara:a.length,luennot:{arvosanat:i,keskiarvo:s?s.toFixed(2):"hyv",op:f(a,"op"),totalOp:f(a,"op").reduce(o.sum,0)}})}).reduce((e,t)=>e.find(({luennoitsija:e})=>e===t.luennoitsija)?e:[...e,t],[]))(r),d=(e=>f(e,"kurssi").map(U).map(J).reduce((e,t)=>[...e,...t.split(" ")],[]).filter(B).map(H).reduce((e,t)=>Object.assign({},e,{[t]:e[t]?e[t]+1:1}),{}))(r),g=pe({fn:le,stuff:r}),O=pe({fn:ue,stuff:r}),K=h(Object.values(g)),A=Object.entries(g).find(([e,t])=>t===K),{keskiarvo:w}=[...l].pop(),E=ge(r),M=(e=>fe({stuff:e,key:"arvosana"}))(r),P=(e=>fe({stuff:e,key:"op"}))(r),C=(e=>e.reduce((e,t)=>{const{lyhenne:n,op:a,arvosana:i}=t,s=(e=>e.replace(/^(ay|a)/i,"").replace(/(-|_)[\d\D]+/i,"").replace(/[\d]+/,""))(n),r=(s.length?s:"emt").toUpperCase(),l=e[r],u=l?[...l.arvosanat,i].filter(R(isNaN)):[i].filter(R(isNaN)),p={courseCount:1,op:a,kurssit:[t],arvosanat:u,keskiarvo:o.average(u).toFixed(2),painotettuKeskiarvo:ge(l?l.kurssit:[t]),laitos:r};return Object.assign({},e,{[r]:l?Object.assign({},l,p,{courseCount:l.courseCount+1,op:l.op+a,kurssit:[...l.kurssit,t]}):p})},{}))(r),I=Object.values(C).filter(({laitos:e})=>((e,t)=>e.indexOf(t)>-1)(((e,t)=>e.map(e=>e[t](e)))(s,"toUpperCase"),e.toUpperCase())),F=a?C[a.toUpperCase()]:null;(e=>{const t=j(Object.values(e),"op");$({id:"chart-laitos-graafit",type:"bar",labels:f(t,"laitos"),datasets:[Object.assign({label:"Kursseja",data:f(t,"courseCount")},L),Object.assign({label:"Nopat",data:f(t,"op")},S),Object.assign({label:"Keskiarvo",data:f(t,"keskiarvo")},x),Object.assign({label:"Painotettu keskiarvo",data:f(t,"painotettuKeskiarvo")},x)]})})(C),je({id:"chart-arvosanat-groupattuna",label:"Arvosana",data:M}),je({id:"chart-nopat-groupattuna",label:"op",data:P}),(e=>{const t=Math.min(...Object.values(e)),n=Math.max(...Object.values(e)),a=Object.keys(e).map(a=>({key:a,fontSize:ye({val:e[a],minValue:t,maxValue:n}),count:e[a]})).map(({fontSize:e,key:t,count:n})=>`<span style="font-size: ${e}px;" title="${t} on mainittu ${n} kertaa suorituksissasi">${t}</span>`).join(" ");T({id:"tagipilvi",content:a})})(d),(({stuff:e,keskiarvot:t,keskiarvotPerusopinnoista:n,keskiarvotAineopinnoista:a})=>{const s=N(e);i.notEmpty(s)&&$({id:"chart-nopat",customTooltip:!0,customTicks:!0,labels:f(s,"pvm"),datasets:ee(s)}),i.notEmpty(t)&&$({id:"chart-keskiarvo",labels:f(t,"pvm"),type:"line",datasets:X({keskiarvot:t,keskiarvotPerusopinnoista:n,keskiarvotAineopinnoista:a})})})({stuff:r,keskiarvot:l,keskiarvotPerusopinnoista:u,keskiarvotAineopinnoista:p}),(({stuff:e,aineOpinnot:t,perusOpinnot:n})=>{i.notEmpty(t)&&Q({id:"aineopinnot",stuff:e,data:t}),i.notEmpty(n)&&Q({id:"perusopinnot",stuff:e,data:n})})({stuff:r,aineOpinnot:n,perusOpinnot:t}),(e=>{const t=document.querySelector("#luennoitsijat");if(null===t)throw new Error("piirräLuennoitsijaListat(): Element is null");t.innerHTML="",z({title:"Luennoitsijoiden top lista by kurssimaara",lista:j(e,"kurssimaara"),luennoitsijatElement:t}),z({title:"Luennoitsijoiden top lista by keskiarvo",lista:[...e.filter(({luennot:e})=>"hyv"!==e.keskiarvo).sort(ce),...e.filter(({luennot:e})=>"hyv"===e.keskiarvo)],luennoitsijatElement:t}),z({title:"Luennoitsijoiden top lista by nopat",lista:e.sort((e,t)=>t.luennot.totalOp-e.luennot.totalOp),luennoitsijatElement:t})})(k),(e=>{const t=pe({fn:oe,stuff:e}),n=Object.keys(t),a=Object.values(t),i=parseInt(n[0],10),s=1===n.length,o=s?[`${i-1}-${i}`,`${i}-${i+1}`,`${i+1}-${i+2}`]:n.map(e=>`${e}-${parseInt(e,10)+1}`),r=s?[0,a[0],0]:a;de({id:"chart-nopat-vuosi",label:"Noppia per lukuvuosi",labels:o,data:r})})(r),(({kuukausiGroups:e,kumulatiivisetKuukaudetGroups:t})=>{de({id:"chart-nopat-kuukaudet",label:"Noppia per kuukausi",labels:Object.keys(e),data:Object.values(e),secondDataSet:{label:"Kumulatiiviset nopat",data:Object.values(t)}})})({kuukausiGroups:g,kumulatiivisetKuukaudetGroups:O}),ve({kurssimaara:r.length,luennoitsijamaara:k.length,op:f(r,"op").reduce(o.sum,0),openUniMaara:f(r,"kurssi").map(e=>e.toLowerCase()).filter(he).length,openUniOp:r.filter(({kurssi:e})=>he(e.toLowerCase())).map(({op:e})=>e).reduce(o.sum,0),hyvMaara:f(r,"arvosana").filter(isNaN).length,hyvOp:f(r.filter(({arvosana:e})=>isNaN(e)),"op").reduce(o.sum),maxKuukausi:A,keskiarvo:w,painotettuKeskiarvo:E,"pääaine":F,sivuaineet:I}),Y()};Te()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.kurssitietokanta={tkt:{perusopinnot:[{name:"Johdatus tietojenkäsittelytieteeseen",keys:["TKT10001","AYTKT10001","582102","A582102"]},{name:"Ohjelmoinnin perusteet",keys:["TKT10002","AYTKT10002","581325","A581325"]},{name:"Ohjelmoinnin jatkokurssi",keys:["TKT10003","AYTKT10003","582103","A582103"]},{name:"Tietokantojen perusteet",keys:["TKT10004","AYTKT10004","581328","A581328"]},{name:"Tietokoneen toiminta",keys:["TKT10005","AYTKT10005","581305","A581305"]}],aineopinnot:[{name:"Tietorakenteet ja algoritmit",keys:["TKT20001","AYTKT20001","58131","A58131"]},{name:"Ohjelmistotekniikan menetelmät",keys:["TKT20002","AYTKT20002","582104","A582104"]},{name:"Käyttöjärjestelmät",keys:["TKT20003","AYTKT20003","582219","A582219"]},{name:"Tietoliikenteen perusteet",keys:["TKT20004","AYTKT20004","582202","A582202"]},{name:"Laskennan mallit",keys:["TKT20005","AYTKT20005","582206","A582206"]},{name:"Ohjelmistotuotanto",keys:["TKT20006","AYTKT20006","581259","A581259"]},{name:"Ohjelmistotuotantoprojekti",keys:["TKT20007","AYTKT20007","581260","A581260"]},{name:"Kandidaatin tutkielma",keys:["TKT20013","AYTKT20013","582204","A582204"]},{name:"Kypsyysnäyte LuK",keys:["TKT20014","AYTKT20014","50036","A50036"]}],mitaNaaOn:[{name:"Johdatus tekoälyyn",keys:["TKT20008","AYTKT20008","582216","A582216"]},{name:"Tietoturvan perusteet",keys:["TKT20009","AYTKT20009","582215","A582215"]}],perusopinnotPre2017:[{name:"Johdatus tietojenkäsittelytieteeseen",keys:["TKT10001","AYTKT10001","582102","A582102"]},{name:"Ohjelmoinnin perusteet",keys:["TKT10002","AYTKT10002","581325","A581325"]},{name:"Ohjelmoinnin jatkokurssi",keys:["TKT10003","AYTKT10003","582103","A582103"]},{name:"Tietokantojen perusteet",keys:["TKT10004","AYTKT10004","581328","A581328"]},{name:"Ohjelmistotekniikan menetelmät",keys:["TKT20002","AYTKT20002","582104","A582104"]}],aineopinnotPre2017:[{name:"Tietorakenteet ja algoritmit",keys:["TKT20001","AYTKT20001","58131","A58131"]},{name:"Käyttöjärjestelmät",keys:["TKT20003","AYTKT20003","582219","A582219"]},{name:"Tietokoneen toiminta",keys:["TKT10005","AYTKT10005","581305","A581305"]},{name:"Tietoliikenteen perusteet",keys:["TKT20004","AYTKT20004","582202","A582202"]},{name:"Laskennan mallit",keys:["TKT20005","AYTKT20005","582206","A582206"]},{name:"Ohjelmistotuotanto",keys:["TKT20006","AYTKT20006","581259","A581259"]},{name:"Ohjelmistotuotantoprojekti",keys:["TKT20007","AYTKT20007","581260","A581260"]},{name:"Kandidaatin tutkielma",keys:["TKT20013","AYTKT20013","582204","A582204"]},{name:"Kypsyysnäyte LuK",keys:["TKT20014","AYTKT20014","50036","A50036"]}],labrat:[{name:"Aineopintojen harjoitustyö: Tietorakenteet ja algoritmit",keys:["TKT20010","58161","AYTKT20010","A58161"]},{name:"Aineopintojen harjoitustyö: Tietokantasovellus",keys:["TKT20011","582203","AYTKT20011","A582203"]},{name:"Aineopintojen harjoitustyö: Tietoliikenne",keys:["TKT20012","AYTKT20012"]},{name:"Aineopintojen harjoitustyö: Ohjelmointi",keys:["582221","A582221"]}]}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(0),i=(e,t="[]")=>JSON.parse(localStorage.getItem(e)||t);t.getLocalStorage=i;t.getListFromLocalStorage=((e,t="[]")=>i(e,t).filter(a.notEmpty));t.setLocalStorage=(e=>t=>localStorage.setItem(e,JSON.stringify(t)))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=(e,t)=>e+t;t.sum=a;t.average=(e=>e.reduce(a,0)/e.length)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.isTruthy=(e=>e);t.isString=(e=>"string"==typeof e);t.isArray=(e=>Array.isArray(e))}]);