var title = document.title;
var bottomTxt = document.getElementById("bt"),
    messbtn = document.getElementById("messbtn"),
    levelsbtns = document.getElementById("levelsbtns"),
    logo = document.getElementById("logo"),
    footer = document.getElementById("footer");


var containerWidth, containerHeight,
    width, height, x, y, w, h, testLevel,
    online, sound = -1, buttons, buttonWidth, buttonHeight, ratioY, ratioX;

var PLR = "plr", OPP = "opp", ALLIES = "allies", FOES = "foes", left = "left", up = "top", right = "right", bottom = "bottom";

var score = 0, killed = 0, frags = 0;
var turn = ALLIES, turns = 0, tempturns, tempfrags, idle, animating;
var anim = 5, size = 6, gameState = 0, death = 0, lvl = -1, plrX, plrY, enmX, enmY, plrs, enms;
var border = "border";
var radius = "Radius";
var bblr = border + "BottomLeft" + radius;
var bbrr = border + "BottomRight" + radius;
var btlr = border + "TopLeft" + radius;
var btrr = border + "TopRight" + radius;
var bradius = border + radius;
var bt = border + "Top";
var bb = border + "Bottom";
var br = border + "Right";
var bl = border + "Left";
window.addEventListener("load", init, false);
window.addEventListener("resize", onResize, false);

var searchbar;

var ldata = [
    "421005.155.01.105.140502.150202",
    "321.45.3500501040502020050502",
    "432.65002.42120505.2405.45055",
    "542.82.2505512.24002.2505",
    "442.91.350202.15.02.1405.55.75",
    "542.450022.1505.350405012.0505.55",
    "642.250504.35.450050501.15050202.150502",
    "642.6502.15050050105040502.1505.750002",
    "5425.82.355.4405012.52.35",
    "542.d050505202050055.110450050200505.5505",
    "632.65.45.4455212.15002",
    "752.95002.0405.051.150505.45.02.92",
    "d425.35.550055.15005005.01040552.050050202.05005",

    "642"
];
var levels = [];
var minturns = [];
var array = [];
var empty = [];
var completed;
var currentLevel;
var moves = 4;//level gen

function getLevel(v) {
    var _l = [], _lvldata = [], h, j;
    for (var _y = 3; _y < v.length; _y++) {
        if (v.charAt(_y) == ".") {
            for (var _x = 0; _x < parseInt(v.charAt(_y + 1), 16) + 3; _x++) {
                _lvldata.push(0);
            }
            _y++;
        } else _lvldata.push(parseInt(v.charAt(_y)));
    }
    h = parseInt(v.charAt(2), 16); if (h >= 8) h -= 8;
    h += 4;
    for (_y = 0; _y < h; _y++) {
        _l.push([]);
        j = parseInt(v.charAt(1), 16); j += 6;
        for (_x = 0; _x < j; _x++) {
            _l[_y].push(_lvldata[_y * j + _x] || 0);
        }
    }
    return _l;
}

function updateTurns() {
    var srch = location.search.substring(1);
    var ll = -1, tonextlevel = false;
    srch.replace(/([^=&]+)=([^&]*)/g, function (m, key, value) {
        var k = decodeURIComponent(key), v = decodeURIComponent(value); v = v.split("O")[0];//console.log("k:",k, "v",v);
        var tt, vv;
        searchbar[k] = v;
        if (v.length) switch (k.charAt(0)) {
            case "l":
                vv = parseInt(v);
                if (k.length > 1) {
                    tt = parseInt(k.substring(1));
                    if (vv > 0) {
                        if (tt > ll) ll = tt;
                        completed[tt] = v;
                        tempturns[tt] = parseInt(v.substr(2, 2), 16);
                        tempfrags[tt] = parseInt(v.substr(4), 16);
                        if (completed[tt + 1] == -1 && parseInt(completed[tt])) completed[tt + 1] = 0;
                    }
                } else {
                    if (Number(v) > vv) {
                        testLevel = (Math.round((Number(v) - vv) * 10) == 6);
                        tonextlevel = true;
                        writeHistoryLine("l", vv);
                    }
                    if (vv) ll = vv;
                }
                break;
            case "s":
                if (k.length > 1) {
                    tt = parseInt(k.substring(1));
                    levels[tt] = getLevel(v);
                    minturns[tt] = getMinMoves(v, minturns[tt - 1]);
                    completed[tt] = -1;
                }
                break;
            case "a":
                anim = parseInt(v);
                break;
            case "m":
                sound = parseInt(v);
                break;
        }
    });
    lvl = ll;
    if (lvl >= levels.length) lvl = levels.length - 1;
    return tonextlevel;
}

function updateFrags(id) {
    turns = 0; frags = 0;
    for (i = 0; i <= id; i++) {
        if (tempfrags[i] > 0) frags += tempfrags[i];
        if (tempturns[i] > 0) turns = tempturns[i];
    }
    /*if(online)*/ turns *= 2;
    //console.log("updateFrags", lvl, id, frags, turns);
}
function updateLevel() {
    for (i = 0; i < completed.length; i++) {
        if (parseInt(completed[i]) > 0 && lvl < i) lvl = i;
    }
    //console.log("updateLevel", lvl);
}

function getAnim(_a) {
    return (1 + anim) * (_a || .5) * 16;
}
function getMinMoves(_data, _add) {
    var h = parseInt(_data.charAt(0), 16);
    if (parseInt(_data.charAt(2), 16) >= 8) h += 16;
    return h + _add;
}

function init() {//SoundFX.victory();return
    online = window.location.protocol.substring(0, 4) == "http";
    if (sound == -1) sound = (/chrome/i.test(navigator.userAgent)) ? 2 : 0;
    searchbar = {};
    var tmp = 0, uturn = false;
    for (var i = 0; i < ldata.length; i++) {
        levels[i] = getLevel(ldata[i]);
        tmp += getMinMoves(ldata[i], 2);
        minturns.push(tmp);
    }
    for (i = 0; i < minturns.length; i++) {
        array.push(-1);
        empty.push(0);
    }
    emptyArrays();
    if (online) {
        uturn = updateTurns();
        updateFrags(lvl);
        updateLevel();
    }
    if (uturn) {
        messSelect(1);
    } else
        mainMenu();

    TypeFX.drawText(closebtn, " {", 6);
    TweenFX.to(container, anim, { alpha: 1 }, function () {
        TweenFX.to(bgr0, anim / 2, { alpha: 0.05 });
    });
    onResize();
    bottomTxt.addEventListener("click", genUIclick);
    document.addEventListener("keydown", respondKey);
    levelsbtns.addEventListener("dblclick", enterFullScreen);
}

function respondKey(e) {
    var t = { id: "" };
    var m = (messbtn.parentNode.style.visibility == "visible" && mess.style.opacity != "0");
    if (bottomTxt.style.pointerEvents == "auto" || ((m || !gameState) && e.keyCode != 13 && e.keyCode != 70)) return;// in generator or mess
    //if(bottomTxt.style.pointerEvents == "auto" && e.keyCode!=13) return;
    switch (e.keyCode) {
        case 27: // esc
            closeGame();
            break;
        case 37: // <
        case 65: // a
            t = buttons[plrY][plrX - 1].div;
            break;
        case 38: // ^
        case 87: // w
            t = buttons[plrY - 1][plrX].div;
            break;
        case 39: // >
        case 68: // d
            t = buttons[plrY][plrX + 1].div;
            break;
        case 40: // v
        case 83: // s
            t = buttons[plrY + 1][plrX].div;
            break;
        case 32: // space
            if (gameState < 3) return;
            if ((buttons[plrY][plrX].div.style.pointerEvents != "none" && lvl && !m) || (!lvl && turns == 9)) moveClick({ target: t });
            break;
        case 70:
            enterFullScreen();
            break;
        case 13: // Enter
            if (closediv.style.visibility == "hidden") messSelect(1);
            if (m) proceedClick();
            break;
        case 17: // Ctrl
            soundChange();
            break;
    }
    if (t.id.length > 0 && t.style.pointerEvents != "none") moveClick({ target: t });
}
function enterFullScreen(e) {
    var d = document.documentElement;
    if (!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)) {
        (d.requestFullscreen || d.mozRequestFullScreen || d.webkitRequestFullScreen || d.msRequestFullscreen).call(d);
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
    }
}
function onResize(evt) {
    //window.requestAnimationFrame(function(){
    Resize(evt);
    //});
}
function trans(_el, _s, _p, _s1) {
    _el.style.transform = "scale" + ((_s1) ? ("(" + _s + "," + _s1 + ")") : ((_p != null) ? _p : "") + "(" + _s + ")");
}
function Resize(evt) {
    containerWidth = container.offsetWidth;
    containerHeight = container.offsetHeight;

    ratioX = window.innerWidth / 960;
    ratioY = window.innerHeight / 540;

    buttonWidth = window.innerWidth / width / ((ratioX < 1) ? ratioX : 1);
    buttonHeight = window.innerHeight / height * .9 / ((ratioX < ratioY) ? ((ratioX < 1) ? ratioX : ((ratioY < 1) ? ratioY : 1)) : ((ratioY < 1) ? ratioY : 1));
    //console.log(ratioX, ratioY)
    var tmp = -(960 - (960 * ratioX)) * .5;
    if (ratioX < ratioY) {//||
        if (ratioX < 1) {
            if (ratioY < 1) {//console.log("c1")
                trans(frame, ratioX);
                TweenFX.to(frame, 0, { x: tmp, y: 0, width: window.innerWidth, height: ((540 / ratioX / ratioX < window.innerHeight / ratioX) ? 540 / ratioX / ratioX : window.innerHeight / ratioX) });

            } else {//console.log("c2", ratioX, ratioY)
                trans(frame, ratioX);
                TweenFX.to(frame, 0, { x: tmp, y: 0, width: window.innerWidth, height: ((540 * ratioY / ratioX < window.innerHeight * ratioY / ratioX) ? 540 * ratioY / ratioX : window.innerHeight * ratioY / ratioX) });

            }
        } else {//console.log("c3")
            trans(frame, 1);
            TweenFX.to(frame, 0, { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight });
        }
    } else {// ==
        if (ratioY < 1) {//console.log("d1", ratioX, ratioY)
            if (ratioX < 1) {
                trans(frame, (ratioX < ratioY) ? ratioY : ratioX, "", ratioY);
                TweenFX.to(frame, 0, { x: tmp, y: 0, height: window.innerHeight * ratioY });
            } else {//console.log("d2")
                trans(frame, 1, "", ratioY);
                TweenFX.to(frame, 0, { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight * ratioY });
            }
        } else {//console.log("d3")
            trans(frame, 1);
            TweenFX.to(frame, 0, { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight });
        }
    }
    tmp = (ratioX < ratioY / 4 || ratioY < ratioX / 3);
    /*fade.innerHTML = (tmp)
        ? '<span style="position:absolute;font-size:28px;text-align:center;color:white;top:45%;width:100%;">Landscape required</span>'
        : '';
    fade.style.visibility = (tmp||isMess())?"visible":"hidden";
    fade.style.opacity = (tmp||isMess())?"0.75":"0";*/
    ratioY = (ratioY > ratioX) ? (2 + ((ratioY > 1.5) ? 1.5 : ratioY) / ratioX) / 3 : 1; if (ratioY < 1) ratioY = 1;
    if (logo) trans(logo, (ratioX < 1.25) ? ((ratioX < 1) ? 0.8 + (1 - ratioX) / 3 : ratioX * 0.8) : 1);
    trans(bottomTxt, ((ratioX > 1) ? ratioX : 1), "X");
    if (!buttons) return;
    for (var _y = 0; _y < height; _y++) {
        for (var _x = 0; _x < width; _x++) {
            TweenFX.to(buttons[_y][_x].holder, (evt) ? 1 : 0, { width: buttonWidth, height: buttonHeight, x: buttonWidth * _x - 10, y: buttonHeight / 5 + (buttonHeight) * _y });
            TweenFX.to(buttons[_y][_x].diggit, 0, { width: buttonWidth * 0.75, height: buttonHeight * 0.75 });
            TweenFX.to(buttons[_y][_x].canvas, 0, { width: buttonWidth * 0.75, height: buttonHeight * 0.75 });
            TweenFX.to(buttons[_y][_x].bgr, 0, { width: buttonWidth * 0.76, height: buttonHeight * 0.76 });
            fixBorders(buttons[_y][_x].div, parseInt(containerWidth / (width * 2)), [btlr, btrr, bblr, bbrr]);
        }
    }
}
function fixBorders(_d, _w, _a) {
    for (var i = 0; i < _a.length; i++) {
        if (parseInt(_d.style[_a[i]]) != _w && parseInt(_d.style[_a[i]])) _d.style[_a[i]] = _w + "px";
    }
}
function setPointer(_p, _e) {
    _p.style.pointerEvents = (_e) ? "auto" : "none";
}
function updateMenu() {
    killAll(practicebtn);
    killAll(versusbtn);
    killAll(multibtn);
    killAll(soundbtn);
    killAll(copy);
    killAll(author);
    killAll(levelsbtns);
    animating = true;
    closediv.style.visibility = "hidden";
    TypeFX.drawText(practicebtn, (lvl < 1) ? "Tutorial    " : ((score) ? "Replay (" + (lvl + 1) + ")" : "Continue") + "    ", 4);

    TypeFX.drawText(versusbtn, "Resume Game    ", 4);
    versusbtn.parentNode.style.opacity = ((!currentLevel || death || lvl <= 0) ? "0.25" : "1");
    setPointer(versusbtn.parentNode, (currentLevel && !death && lvl > 0));

    TypeFX.drawText(multibtn, "Clear||Progress||   ", 4);
    multibtn.parentNode.style.opacity = ((lvl <= 0) ? "0.25" : "1");
    setPointer(multibtn.parentNode, lvl > 0);

    TypeFX.drawText(soundbtn, ((!sound) ? "  $|{ " : ((sound == 1) ? "  $|} " : "  $})")), 4);
    var tmp = String.fromCharCode(92);
    for (i = 0; i < 14; i++) {//levels.length
        var newbtn = document.createElement("button");
        newbtn.id = "btn_" + i;
        newbtn.style.position = "absolute";
        newbtn.className = ((i == 12) ? "r" : "y") + " bb i";
        newbtn.addEventListener("click", (i <= 12) ? newbtnclick : genClick);
        setPointer(newbtn, i == 13 || !(completed[i] == -1 && online));
        if (i >= 12) {
            TypeFX.drawText(newbtn, ((i == 12) ? "  Stage||13   " : "  Custom|   "), 4);
            newbtn.style.bottom = "7%";
            newbtn.style.height = "60px";
            newbtn.style.left = (-90 + 232 * (i - 11)) + "px";
            newbtn.style.opacity = (parseInt(completed[i]) > 0 || (i == 13 && online)) ? 1 : 0.25;
        } else {
            TweenFX.to(newbtn, 0, { x: (((i < 10) ? 128 : 143) * ((i < 8) ? ((i < 4) ? ((i == 2) ? 1 : 0) : i - 3) : ((i < 12) ? i - 8 : ((i > 14) ? i - 16.1 : i - 12.9)) + ((i > 9) ? ((i <= 11) ? 0.25 : 1.9) : 0.4))), width: ((i < 9 && i > 0) ? 120 : ((!i && parseInt(completed[0]) > 0) ? 102 : 134)), height: 48, alpha: ((parseInt(completed[i]) > 0) ? 0.75 : (completed[i] > -1 ? 0.4 : ((!online) ? 0.2 : 0.1))) });
            newbtn.style.bottom = (34 - (((i > 7) ? ((i > 11) ? ((i < 15) ? 3 : 4) : 2) : ((i < 3) ? ((!i) ? -1 : 0) : 1)) * 8)) + "%";
            //console.log(i, tempturns[i], minturns[i]);
            if (tempturns[i] <= minturns[i] && tempturns[i]) newbtn.className += " g";
            if (parseInt(completed[i]) == 1) newbtn.className += " r";
            TypeFX.drawText(newbtn, [((i) ? "|stage" : "||tutorial"), "| | | *  ", " | |*|* ", " ||***|"][(completed[i] < 1) ? 0 : parseInt(completed[i])] + "|" + (((i || completed[0]) && ((online && i) || i)) ? (i + 1) : "") + " ", 3, 0, ((!tempturns[i]) ? "white" : (tempturns[i] <= minturns[i]) ? "yellow" : "white"));
        }
        levelsbtns.appendChild(newbtn);
    }
}
function newbtnclick(evt) {
    var id = parseInt(evt.currentTarget.id.substring(4));
    lvl = id;
    frags = 0; turns = 0; killed = 0;
    if (!id) { gameState = 1; } else {
        gameState = id + 5;
        updateFrags(lvl - 1);
    }
    writeHistoryLine("l", lvl);
    startGame(lvl);
}
function genClick() {
    hideMess();
    startGame(-1);
    SoundFX.ui();
}


function mainMenu() {
    SoundFX.main();
    killAll(logo);
    var titleArr = [
        [[4, 21, , -4, 3, , 3], [4.5, 4, 3, 5, 1, , 3, 1, , , , 1], [3, 4, -2, 5, 3, 1, 1.5, , , 1], [7, 4, 3, -4, 1, , 2.5, , , , , 1]],
        [[9, 4, -3, 3, 3, 3], [9, 4, -3, 9, , , 3, 3], [4, 4, -3, 6, , 1, 1, , 1, , 1], [4, 4, 2, 6, 1, , , 1, 1, , 1]],
        [[4, 10, , 3, 3, , 3], [4, 4, 3, 3, 1, , 3, 2, , , , 1]],
        [[4, 10, -0.5, 3, 3], [4, 11, 9.5, 3, , 3, , 3], [3, 4.5, 2.5, 3, , 3, 2, 2, , 1, , 1], [4, 4.5, 4.5, 3, 3, 3, , , , 1, , 1], [3, 4.5, 7.5, 3, 3, , 2, 2, , 1, , 1], [4, 5.5, 4.5, 6.5, 1, 1, 2, 2, 1]],
        [[9, 4, , 3, 3, 3], [4, 4, 5, 9, , , , 3], [6.6, 4, , 9, , , 2, 3, , 1], [4, 4, , 6, , 1, 1, , 1, , 1], [4, 4, 5, 6, 1, , , 1, 1, , 1]],
        [[4, 16, , -2, , 3, 1, 3], [3, 4, 3, 3, 1, , 3, , , , , 1], [3, 4, 3, 10, 1, , 2.5, , , , , 1]],
        [[4, 10, , 3, 3, , 3], [4, 4, , -2, 3, 3, 3, 3]],
        [[9, 4, , 3, 3, 3], [9, 4, , 9, , , 3, 3], [4, 4, , 6, , 1, 1, , 1, , 1], [4, 4, 5, 6, 1, , , 1, 1, , 1]],
        [[4, 10.5, , 2.5, , 3], [6, 4, 3, 3, 2, 3, , 1, , , , 1], [4, 8, 5, 6, 1, , , 3, 1]]

    ];
    drawTitle(titleArr, -180, 20, 10, "b");

    titleArr = [
        [[4, 9, -0.5, 5, 2.5, , 3], [2.5, 4, -2, 10, 4, 1, , , , 1], [4, 23, 7, -7, 3, , , 3], [5.5, 4, 2.5, 5, 1, 1, 1, 1, , 1, , 1], [4, 8.75, 1, -2.75, 4, , 1, 1, , , 1], [4, 4, 4, -4, 2, 1, 1, 1, , 1, , 1]],
        [[4, 19, , -6, , 3, 1, 3], [7, 4, 3, , 1, 3, , 1, , , , 1], [7, 4, 3, 9, 1, , 2.5, , , , , 1], [4, 7, 6, 3, 1, , , 1, 1, , 1]],
        [[10, 4, , , 3, , 3], [10, 4, , 4.5, , 3, , 3], [10, 4, , 9, 3, , 3], [4, 2.5, , 3, , 1, 1, , 1, , 1], [4, 2.5, 6, 7.5, 1, , , 1, 1, , 1]],
        [[10, 4, , 9, , 3, , 3], [10, 4, , , 3, 3], [4, 7, , 3, , 1, 1, , 1, , 1], [7, 4, 3, 4.5, 1, , 3, 1, , , , 1], [4, 2.5, 6, 3, 1, 1, 1, 1, 1, , 1]],
        [[4, 14, , -1, , 3], [7, 4, 3, , 2, 3, , 1, , , , 1], [4, 11, 6, 3, 1, , , 3, 1]],
        [[4, 20, , -5.5, , 3, 1, 3], [4, 4, 3, , 1, , 3, 1, , , , 1], [5, 4, 3, 10.5, 1, , 2.5, , , , , 1]]
    ];
    drawTitle(titleArr, -95, 185, 10, "g");
    updateMenu();
    setPointer(bottomTxt, false);
}

function drawTitle(titleArr, baseLeft, baseTop, scale, className) {
    var piece;
    var segment;
    var pieceWidth;
    for (i = 0; i < titleArr.length; i++) {
        pieceWidth = 0;
        for (j = 0; j < titleArr[i].length; j++) {
            segment = titleArr[i][j];
            if (pieceWidth < (segment[0] || 0) + (segment[2] || 0)) pieceWidth = (segment[0] || 0) + (segment[2] || 0);
            piece = document.createElement("div");
            logo.appendChild(piece).className = className;
            piece.style.width = ((segment[0] * scale) || 0) + "px";
            piece.style.height = ((segment[1] * scale) || 0) + "px";
            piece.style.left = (baseLeft + ((segment[2] * scale) || 0)) + "px";
            piece.style.top = (baseTop + ((segment[3] * scale) || 0)) + "px";
            setPointer(piece);
            piece.style[bradius] = ((segment[4] * scale) || 0) + "px " + ((segment[5] * scale) || 0) + "px " + ((segment[6] * scale) || 0) + "px " + ((segment[7] * scale) || 0) + "px";
            if (segment[8]) piece.style[bt] = "none";
            if (segment[9]) piece.style[br] = "none";
            if (segment[10]) piece.style[bb] = "none";
            if (segment[11]) piece.style[bl] = "none";
        }
        baseLeft += (pieceWidth * scale) + scale;
    }
}

var diggitSymbol = [" ", "[", "]", "_", ":", ";", "=", " ", " ", " "];
var dp1 = [, , , 0.6, " g"], dp2 = [, , , 0.74, " r"];
var diggitProps = [
    null,
    ["#1a1", "#2c2", "#080", 0.75, " g"],
    dp1,
    dp1,
    ["#c22", "#f55", "#a11", 0.75, " r"],
    dp2,
    dp2,
    dp2, , ,
];

function Diggit(_container, _x, _y, _width, _height, _z) {
    var _diggit, _holder, _canvas, _div, _bgr;

    this.x = _x;
    this.y = _y;
    this.width = _width;
    this.height = _height;
    this.z = _z;
    this.state = 0;

    this.holder = _holder = document.createElement("div");
    _container.appendChild(_holder);
    _holder.style.width = buttonWidth + "px";
    _holder.style.height = (buttonHeight) + "px";
    _holder.style.top = (buttonHeight / 5 + (buttonHeight) * _y) + "px";
    _holder.style.left = (buttonWidth * _x - 10) + "px";

    this.div = _div = document.createElement("div");
    _holder.appendChild(_div).className = "df";

    _div.style.opacity = (_z == " ") ? "0.05" : ((_z == "[") ? "1" : "0.6");
    var dp = diggitProps[currentLevel[_y][_x]];
    if (dp) {
        if (((turn == ALLIES) && (_z == "]") && turns % 2 != 0) ||
            ((turn == OPP) && (_z == ":")) ||
            ((turn == FOES) && (_z == ";"))
        ) {
            TweenFX.to(_div, anim, { alpha: dp[3] });
            trans(_div, 1);
        }
        _div.className += dp[4];

        if (_z != "[") {
            if (dp[0]) _div.style[border + "Color"] = dp[0];
            if (dp[1]) _div.style[bt + "Color"] = dp[1];
            if (dp[2]) _div.style[bb + "Color"] = dp[2];
        }
    }
    _div.style[bradius] = (containerWidth / (width * 2)) + "px";
    if (currentLevel[_y][_x] == 2 || currentLevel[_y][_x] == 6) {
        _div.style[bblr] = "0";
    }
    if (currentLevel[_y][_x] == 2 || currentLevel[_y][_x] == 5) {
        _div.style[bbrr] = "0";
    }
    if (currentLevel[_y][_x] == 3 || currentLevel[_y][_x] == 6) {
        _div.style[btlr] = "0";
    }
    if (currentLevel[_y][_x] == 3 || currentLevel[_y][_x] == 5) {
        _div.style[btrr] = "0";
    }

    this.diggit = _diggit = document.createElement("div");
    _holder.appendChild(_diggit).className = "d";

    this.bgr = _bgr = TypeFX.drawDiggit(_diggit, _z + 48, 10, ((_z != "[" && _z != "]") ? "#622" : ((_z != "]") ? "#543" : "#242")));
    _bgr.style.position = "absolute";
    trans(_bgr, 0.76);
    _bgr.style.marginTop = "2px";
    dontSelect(_bgr);

    this.canvas = _canvas = TypeFX.drawDiggit(_diggit, _z + 48, 10, ((_z == "[") ? "#fff" : ((_z == "]") ? "#fe9" : ((_z == ":") ? "#fcd" : ((_z == ";") ? "#fd6" : "#fff")))));
    trans(_canvas, 0.75);
    dontSelect(_canvas);
    _canvas.style.marginLeft = "-2px";
    _diggit.style.width = _canvas.style.width = _bgr.style.width = (buttonWidth * 0.75) + "px";
    _diggit.style.height = _canvas.style.height = (buttonHeight * 0.75) + "px";
    _bgr.style.height = (buttonHeight * 0.76) + "px";
}

function dontSelect(_obj) {
    _obj.style.userSelect = "none";
    _obj.style.webkitUserSelect = "none";
    _obj.style.mozUserSelect = "none";
}
function hideMess() {
    TweenFX.to(mess, anim, { alpha: 0 });
    TweenFX.to(fade, anim, { alpha: 0 });
    setPointer(mess);
}

function messSelect(id) {//console.log(parseInt(performance.now()),"messSelect:"+id, lvl)
    if (id >= 0) gameState = id;
    killAll(messtxt);
    killAll(copy);
    killAll(author);
    switch (id) {
        case 103:
            soundChange();
            break;
        case 102:
            clearProgress();
            break;
        case 101: //continue
            wait(showClose, getAnim());
            hideMess();
            startGame(id, true);
            SoundFX.ui();
            break;
        case 0:
            turn = null;
            killAll(area);
            killAll(bottomTxt);
            TweenFX.to(titlediv, anim, { alpha: 1 });
            hideMess();
            mainMenu();
            SoundFX.ui();
            break;
        case 1:
            wait(showClose, getAnim());
            updateUI(0, true);
            if (lvl <= 0) {
                lvl = killed = frags = turns = 0;
                startGame(0);
            } else {
                killed = 0;
                updateFrags(lvl - 1);
                //document.title = title + " - Level " + (lvl+1);
                startGame(lvl);
            }
            break;
        case 2:
            message("But||what||if||you're||trapped||in||an||endless\rmaze of nightmares|?|.|.\r.|.|.|where crawlers march against you, \rwhen you are lost in the battlefield\rand formation is absent.", " |Prepare|!|");
            updateUI(0, true);
            break;
        case 3:// end of tutorial pt.1, To Battle ! click
            updateUI();
            SoundFX.close();
            hideMess();
            wait(function () {
                wait(function () {
                    SoundFX.mess();
                    message("In a battle round you |Pause, |or |Move|\r|   Up^|Down`|Left<|or Right>\r\rAll other units are moving in only one\rdirection - enemies move horizontally\rfrom right to left.", " To||Battle||!||");
                    idleClick();
                }, getAnim(18));
                killAll(area);
                turn = OPP;
                killed = 0;
                createGrid(currentLevel, nextMove);
            }, getAnim(5));
            break;
        /*case 4:
            console.log("GGGGG");
            break;*/
        default:
            //console.log("next stage:"+lvl, completed[lvl]);
            SoundFX.close(); SoundFX.march(22);
            currentLevel = levels[lvl];
            hideMess();
            killAll(area);
            turn = OPP;
            createGrid(currentLevel, nextMove);
            break;
    }
}

function startGame(id, _c) {//console.log((id)?"continue game":"start game", id, lvl, _c);
    turn = (_c) ? PLR : OPP;
    killAll(area);
    killAll(messtxt);
    killAll(copy);
    killAll(author);
    killAll(footer);
    showClose();
    if (levelsbtns) killAll(levelsbtns);
    TweenFX.to(titlediv, anim, { alpha: 0 });
    TweenFX.to(bottomTxt, anim, { alpha: 1 });
    killed = 0;
    SoundFX.close(); SoundFX.march(22);
    if (_c) createGrid(currentLevel, nextMove);
    else if (id == -1) createGrid(currentLevel || dublicateLevel(currentLevel, levels[13]));
    else wait(function () {
        if (id > -1) createGrid(levels[id - ((id >= levels.length) ? 1 : 0)], (id) ? nextMove : beginGame);
    }, getAnim());
}

function beginGame() {
    hilightButton(plrX, plrY);
    wait(function () { message("\rYou are Lost Warrior. You'|ve fought\rcountless of battles and achieved\rgreatest victories||!\r", " |Proceed |"); }, getAnim(5));
}
function tweet(status) {
    winopen(containerWidth / 2, containerHeight / 2, "http://twitter.com/home?status=" + encodeURIComponent(status), "html", "resizable=yes,scrollbars=no,left=0,top=0,screenX=0,screenY=0");
}
function winopen() {
    var _a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _a.push(arguments[_i]);
    }
    var _w = _a.shift();
    var _h = _a.shift();
    _a[2] = ('width=' + _w + ',height=' + _h + ',' + _a[2]);
    try {
        var winobj = window.open.apply(this, _a);
        winobj.addEventListener("load", winobj.focus, false);
    } catch (err) { }
}

function proceedClick() {//console.log(parseInt(performance.now()),"proceedClick");
    //SoundFX.ui();
    hideMess();
    setPointer(mess);
    /*if(messbtn.id=="designstage") {//console.log("proceedClick:restart", gameState, lvl, killed, frags, death)
        messSelect(0);
        //genClick();
        //wait(clearGen,1);
    } else */
    if (messbtn.id.indexOf("tw") > -1) {//console.log("proceedClick:restart", gameState, lvl, killed, frags, death)
        tweet(((messbtn.id == "tweet") ? "Hey, I just designed a new stage for #FormationAbsent" : "Cleared all " + ((levels.length > 14) ? levels.length + " " : "") + "stages in #FormationAbsent with score:" + score + " turns:" + turns) + " ! A 13 kilobytes #puzzle for #js13k #js13kgames Play: " + window.location.protocol + "//" + window.location.hostname + window.location.pathname + ((messbtn.id == "tweet") ? "?s13=" + searchbar.s13 + "&l=13.5" : ""));
        writeHistoryLine("l" + (lvl), completed[lvl]);
        writeHistoryLine("l", (lvl + 1));
        messSelect(0);
    } else if (messbtn.id == "restart") {//console.log("proceedClick:restart", gameState, lvl, killed, frags, death)
        killed = death = 0;
        if (lvl) turns = tempturns[lvl - 1] * 2;
        messSelect(lvl + 5);
    } else if (messbtn.id == "nextstage") {//console.log("proceedClick:nextstage", gameState, lvl, killed, frags, death)
        killed = 0;
        if (online) writeHistory(lvl, completed[lvl]);
        messSelect(lvl + 5);
    } else if (messbtn.id == "tobattle" && gameState > 2) {//console.log("proceedClick:tobattle", gameState, lvl, killed, frags, death)
        SoundFX.close();
        TweenFX.to(mess, anim * 2, { alpha: 0 }, function () {
            message("\rAdvice`move down\rAllies may need help.\r", null, 3);
            TweenFX.to(mess, anim * 2, { alpha: 0.95 }, function () {
                idleClick();
                setPointer(buttons[plrY + 1][plrX].div, true);
                buttons[plrY + 1][plrX].holder.style.opacity = buttons[plrY + 1][plrX].canvas.style.opacity = "1";
                buttons[plrY + 1][plrX].div.style.backgroundColor = "#3b3";
            });
        });
    } else {//console.log("proceedClick:else:proceed", gameState, lvl, killed, frags, death)
        messSelect(gameState + ((gameState < 100 && gameState != 3) ? 1 : 0));
    }
}

function isMess(_chk) {
    return (Number(mess.style.opacity) && (_chk) ? (parseInt(mess.style.width) > 400) : (parseInt(mess.style.width) < 400));
}

function closeGame(e) {//console.log(parseInt(performance.now()),"closeGame", animating);
    if (animating && (isMess() || !Number(mess.style.opacity))) return;
    SoundFX.close();
    if (online) window.location.reload();
    else {
        //killAll(area);
        messSelect(0);
    }
}

function idleClick(e) {
    console.log(parseInt(performance.now()), 'idleClick' + ((e) ? 1 : 0), animating);
    if (e) {
        if (animating || turn != PLR) return;
        if ((e.target.parentNode.firstChild.style.cursor == "pointer") || isMess(true) || bottomTxt.style.pointerEvents == "auto") return;
    }
    idle = !idle;
    killAll(area);
    createGrid(currentLevel, function () {
        if (idle) {
            hilightButton(plrX, plrY, 1);
            buttons[plrY][plrX].holder.addEventListener("click", idleClick);
        }
    });

}

function showClose() {
    TweenFX.to(closebtn, 0, { x: -7, y: -7 });
    TweenFX.to(closediv, anim, { alpha: 1, width: 60, height: 60 });
    //closediv.style.visibility="visible";
}
function disableButton(_arr) {
    for (var i = 0; i < _arr.length; i++) {
        var _x = plrX + _arr[i][0];
        var _y = plrY + _arr[i][1];
        setPointer(buttons[_y][_x].div);
        if (currentLevel[_y][_x] != 4 && currentLevel[_y][_x] != 5) {
            if (_x != plrX || _y != plrY) {
                buttons[_y][_x].holder.style.opacity = buttons[_y][_x].canvas.style.opacity = 0.6;
                hilightButton(_x, _y, 2);
            } else {
                hilightButton(_x, _y);
            }
        } else buttons[_y][_x].div.style.opacity = "0.5";
    }
}
function disableButtons(id) {
    var db = [[0, -1], [1, 0], [0, 1], [-1, 0], [0, 0]];
    db.splice(id, 1);
    disableButton(db);
}
function hilightButton(_x, _y, _id) {
    if (!_id) _id = 0;
    _clr = ["2b2", "08aa08", "188818"];
    buttons[_y][_x].div.style.backgroundColor = "#" + _clr[_id];
}

function dublicateLevel(_cl, _ld) {
    if (!_cl) _cl = [];
    for (var i = 0; i < _ld.length; i++) {
        _cl.push(_ld[i].slice());
    }
    return _cl;
}
function genBtnClick(e) {
    var cxy = e.target.id.split("_")[1].split("x");
    var cx = parseInt(cxy[0]);
    var cy = parseInt(cxy[1]);
    cxy = currentLevel[cy][cx];
    if (cxy == 5) SoundFX.ui(); else if (!cxy && plrX < 0) SoundFX.move(); else SoundFX.close();
    //console.log("genBtnClick", e.target.className, cx, cy, cxy, plrX);
    currentLevel[cy][cx] = (cxy >= 5) ? 0 : cxy + 1 + ((cxy == 2 || (!cxy && plrX > -1) || (cxy == 4 && enmX == -1)) ? 1 : 0);
    killAll(area);
    createGrid(currentLevel);
}
//'http://twitter.com/home?status='+encodeURIComponent((greeting||'I just broke into #DungeonScreener leaderboard with')+' '+playerScore+' points ! '+link)), '_blank');

function genUIclick(e) {
    var w = e.pageX / ratioX;
    SoundFX.ui();
    if (w > 260 && w < 380) {
        for (_y = 0; _y < height; _y++) {
            if (width < 12) currentLevel[_y].push(0);
            else {
                for (_x = 0; _x < 5; _x++) {
                    currentLevel[_y].pop();
                }
            }
        }
    } else if (w > 410 && w < 540) {
        if (height < 8) currentLevel.push(currentLevel[height - 1]);
        else {
            for (_x = 0; _x < 3; _x++) {
                currentLevel.pop();
            }
        }
    } else if (w > 580 && w < 690) {
        moves++;
        if (moves > 16) moves = 2;
        setBottomGen();
    } else if (w > 735 && w < 765) {
        SoundFX.hit();
        clearGen();
    } else if (w > 800) {
        var l = (moves - 2).toString(16) + (width - 6).toString(16) + (height - 4).toString(16);
        var s = 0;
        for (_y = 0; _y < height; _y++) {
            for (_x = 0; _x < width; _x++) {
                if (!currentLevel[_y][_x]) {
                    s++;
                    if (s > 17) {
                        l += ".f";
                        s = 0;
                    }
                } else {
                    if (s) {
                        if (s > 3) {
                            l += "." + (s - 3).toString(16);
                        } else {
                            l += ((s == 3) ? "000" : ((s == 2) ? "00" : "0"));
                        }
                        s = 0;
                    }
                    l += currentLevel[_y][_x];
                }
            }
        }
        writeHistoryLine("s" + (levels.length - 1), l);
        writeHistoryLine("l", levels.length - 0.4);
        window.location.reload();
    } else return;
    killAll(area);
    createGrid(currentLevel);
}
function clearGen() {
    for (_y = 0; _y < height; _y++) {
        for (_x = 0; _x < width; _x++) {
            currentLevel[_y][_x] = 0;
        }
    }
}
function setBottomGen() {
    killAll(bottomTxt);
    TypeFX.drawText(bottomTxt, "    (|generator|)     Width||" + ((width < 10) ? "0" : "") + width + "     Height||0" + height + "     Best||" + ((moves < 10) ? "0" : "") + moves + "     CL    Play Level", 3);
}
function createGrid(_lvldata, _callback) {//console.log(parseInt(performance.now()),"createGrid", turns)
    currentLevel = [];
    currentLevel = dublicateLevel(currentLevel, _lvldata);
    var diggit;
    buttons = [];

    width = currentLevel[0].length;
    height = currentLevel.length;

    plrX = plrY = enmX = enmY = -1;
    plrs = enms = 0;
    for (var _y = 0; _y < height; _y++) {
        buttons.push([]);
        for (var _x = 0; _x < width; _x++) {
            diggit = new Diggit(area, _x, _y, 100, 100, diggitSymbol[currentLevel[_y][_x]]);
            if (currentLevel[_y][_x] == 1) {
                plrX = _x; plrY = _y;
            } else {
                if (currentLevel[_y][_x] == 4) {
                    enmX = _x; enmY = _y; enms++;
                } else if (currentLevel[_y][_x] == 2) {
                    plrs++;
                } else if (currentLevel[_y][_x] == 5 || currentLevel[_y][_x] == 6) {
                    enms++;
                }
                if (((gameState > 3 || turns > 9) || lvl)) diggit.holder.addEventListener("click", idleClick);
            }
            buttons[_y].push(diggit);
        }
    }
    if (_callback == null) {
        showGame();
        animating = false;
        for (_y = 0; _y < height; _y++) {
            for (_x = 0; _x < width; _x++) {
                buttons[_y][_x].div.addEventListener("click", genBtnClick);
                buttons[_y][_x].div.style.cursor = "pointer";
                buttons[_y][_x].div.id = "btn_" + _x + "x" + _y;
            }
        }
        setBottomGen();
        onResize();
        setPointer(bottomTxt, true);
        return;
    }
    if (lvl < 1 && (turn == PLR || turns == 2)) {
        switch (turns) {
            case 1: disableButtons(5); break;
            case 2:
            case 5:
            case 7:
            case 9:
            case 11:
                var id = parseInt(turns / 2) - 1;
                if (!idle || turns > 8) TweenFX.to(mess, anim, { alpha: 0 }, function () {
                    if (TweenFX.getStyle(mess, "height") < 400) {
                        var msg = ["Exchange positions\rwith Allies to dodge\rupcoming Foes |=",
                            "Once enemies are\ravoided, they'|re\rbecoming||the||pray.",
                            "When allies reach\rthe battle horizon\rthey're respawned.",
                            "Skip any move by\rclicking the main\rsquared button.",
                            "You can also toggle\rcontrols||by||clicking\ron an empty area."][id];
                        wait(function () {
                            message("\r" + msg + "\r", null, 3);
                            TweenFX.to(mess, anim, { alpha: 0.9 });
                            disableButtons([2, 0, 0, 4, 0][id]);
                        }, (!id) ? getAnim(6) : 0);
                    }
                });
                break;
        }
    }
    if (plrX == -1) {
        if (gameState && !death) {
            if (plrs || enms) {
                death = turns;
                wait(function () { message("\r\rYou were lost on the battlefield...\r\r", " Restart "); }, getAnim());
                SoundFX.dead();
            } else {
                createGrid(currentLevel);
            }
        }
        return;
    }
    if (!plrs) {
        death = turns;
        SoundFX.dead();
        wait(function () { message("\rYou need at least one Ally to claim\rany newly conquered territories|!\r\r", " Restart "); }, getAnim(5));
        return;
    }
    if (!enms) {
        wait(function () {
            if (gameState < 5) gameState++;
            tempturns[lvl] = parseInt(turns / 2);
            tempfrags[lvl] = killed;
            frags += killed;
            var str;//Turns "+parseInt(turns/2)+"  Best "+(minturns[13]-minturns[12])+"  Frags "+killed+"\r";
            var btn = " Next Stage||";
            if (lvl == 12 || testLevel) {
                if (testLevel) {
                    testLevel = false;
                    str = "Well Done !\r\rCustom stage cleared||! If you are\rsatisfied with it's difficulty,||then don't|\rwait to make a challenge||!"
                    message(str, " Tweet ");
                }
            }
            if (levels.length <= lvl + ((searchbar.s13) ? 1 : 2)) btn = " Share on Twitter ";
            if (!str) {
                str = ((lvl) ? ((lvl >= levels.length - 1) ? "Game complete !\r" : "Victory !\r") + "\rStage " + (lvl + 1) + " cleared !  " + ((plrs == 3) ? ((tempturns[lvl] <= minturns[lvl]) ? "Incredible !" : "Impressive !") : ((plrs == 2) ? "Excellent !" : "Good Job.")) + "\r" + ((turns / 2 > ((lvl) ? minturns[lvl - 1] : 0)) ? "Turns " + parseInt(turns / 2 - ((lvl) ? minturns[lvl - 1] : 0)) + " (|minimum " + ((lvl) ? (minturns[lvl] - minturns[lvl - 1]) : minturns[0]) + "|)" : "") + "\rFrags " + (killed) + " (|" + plrs + " unit" + ((plrs > 1) ? "s" : "") + " alive, " + "casualt" + ((plrs == 1) ? "ies " : "y ") + (3 - plrs) + "|)   " : "Tutorial complete|!\r\rTo get bonus, clear every stage\rperfectly with minimum moves possible.\rGood Luck!") + "\r\r" + ((plrs > 1) ? " +|" + (((tempturns[lvl] <= minturns[lvl]) ? 50 : 0) + ((plrs >= 3) ? 50 : ((plrs == 2) ? 25 : 0))) + " pts.||bonus !" : "no bonus.");
                message(str, btn);
            }
            if (!completed[lvl]) completed[lvl] = 0;
            if (parseInt(completed[lvl]) < plrs || parseInt(completed[lvl].substr(2, 2), 16) > parseInt((turns / 2))) {
                var tt = parseInt((turns / 2)).toString(16);
                var kk = ((killed > 16) ? 16 : killed).toString(16);
                if (tt.length == 1) tt = "0" + tt;
                completed[lvl] = plrs + "." + tt + kk;
                if (!online) {
                    updateFrags(lvl);
                    lvl++;
                    if (completed[lvl] == -1) completed[lvl] = 0;
                }
            }

            killed = 0;
            updateUI(1);
        }, getAnim(5));
        return;
    }
    onResize();

    /*//console.log(plrX,plrY);
    for(var _y = 0; _y < height; _y ++){
        var str = "";
        for(var _x = 0; _x < width; _x ++){
            str+=" "+currentLevel[_y][_x];
        }
        //console.log(str);
    }*/

    if (turn == PLR && !idle) {
        for (_y = 0; _y < height; _y++) {
            for (_x = 0; _x < width; _x++) {
                try {
                    if (_y && currentLevel[_y][_x] == 2 && (!currentLevel[_y - 1][_x]) && ((_x < width && currentLevel[_y - 1][_x + 1] != 1) || _x >= width) && ((_y && _x && currentLevel[_y - 1][_x - 1] != 1) || !_x) && ((_y > 1 && currentLevel[_y - 2][_x] != 1) || _y < 2)) {
                        buttons[_y - 1][_x].div.className += " g";
                        buttons[_y - 1][_x].div.style.opacity = "0.2";
                        if (!currentLevel[_y - 1][_x] && _y) {
                            TypeFX.drawDiggit(buttons[_y - 1][_x].canvas, "^", 10);
                            buttons[_y - 1][_x].diggit.style.opacity = "0.2";
                        }
                    }
                    if ((currentLevel[_y][_x] == 4 || currentLevel[_y][_x] == 5) && _x) {
                        if (!currentLevel[_y][_x - 1]) {
                            if (((currentLevel[_y][_x - 2] != 1 && _x > 1) || _x < 2) && ((currentLevel[_y - 1][_x - 1] != 1 && _x && _y) || _x < 1 || _y < 1) && (currentLevel[_y + 1][_x] != 2 && _y) || _y < 1) {
                                buttons[_y][_x - 1].div.style.opacity = "0.2";
                                TypeFX.drawDiggit(buttons[_y][_x - 1].canvas, "<", 10);
                                buttons[_y][_x - 1].diggit.style.opacity = "0.2";
                            }
                        }
                        if (currentLevel[_y][_x - 1] != 2 && _x && buttons[_y][_x - 1].div.className.indexOf("green") == -1) buttons[_y][_x - 1].div.className += " r";
                    }
                } catch (err) { }
            }
        }

        buttons[plrY][plrX].div.style[bradius] = "0";
        buttons[plrY][plrX].div.addEventListener("click", moveClick);
        buttons[plrY][plrX].div.style.cursor = "pointer";

        //try{
        if (plrY > 0) drawControls(buttons[plrY - 1][plrX], ((!currentLevel[plrY - 1][plrX]) ? ["t", "^"] : ((currentLevel[plrY - 1][plrX] == 2) ? ["i", "="] : ["w", "_"])), bblr, bbrr);
        //} catch(err) {}
        //try{
        if (plrY < height - 1) drawControls(buttons[plrY + 1][plrX], ((!currentLevel[plrY + 1][plrX]) ? ["b", "`"] : ((currentLevel[plrY + 1][plrX] == 2) ? ["m", "="] : ["z", "_"])), btlr, btrr);
        //} catch(err) {}
        //try{
        if (plrX > 0) drawControls(buttons[plrY][plrX - 1], ((!currentLevel[plrY][plrX - 1]) ? ["l", "<"] : ((currentLevel[plrY][plrX - 1] == 2) ? ["j", "="] : ["a", "_"])), bbrr, btrr);
        //} catch(err) {}
        //try{
        if (plrX < width - 1) {
            if (currentLevel[plrY][plrX + 1] < 4) drawControls(buttons[plrY][plrX + 1], ((!currentLevel[plrY][plrX + 1]) ? ["r", ">"] : ((currentLevel[plrY][plrX + 1] == 2) ? ["k", "="] : ["s", "_"])), bblr, btlr);
        }
        //} catch(err) {}
    }
    showGame(_callback);
}
function showGame(_callback) {
    TweenFX.to(area, anim * 2, { alpha: 1 }, _callback);
    trans(area, 1);
}

function drawControls(plr, d, b1, b2) {
    plr.div.id = d[0];
    plr.div.style.cursor = "pointer";
    plr.div.className += " g";
    TweenFX.to(plr.div, 0, { alpha: 1 });
    plr.div.style[b1] = "0";
    plr.div.style[b2] = "0";
    TypeFX.drawDiggit(plr.canvas, d[1], 10);
    TypeFX.drawDiggit(plr.bgr, d[1], 10, ((plr.div.className.indexOf("red") > -1) ? "#611" : "#242"));
    setPointer(plr.div.parentNode, true);
    plr.div.addEventListener("click", moveClick);
}





function moveClick(evt) {//console.log("moveClick",evt.target.id)
    animating = true;
    killAll(area);
    turn = ALLIES;
    createGrid(currentLevel, updateUI);
    currentLevel[plrY][plrX] = 0;
    var id = evt.target.id, _x = plrX, _y = plrY, _z = left, _w = right;
    if ("jla".indexOf(id) > -1) {
        _x += -1;
    } else if ("krs".indexOf(id) > -1) {
        _x += 1; _z = right; _w = left;
    } else if ("itw".indexOf(id) > -1) {
        _y += -1; _z = up; _w = bottom;
    } else {
        _y += 1; _z = bottom; _w = up;
    }
    switch (id) {
        case "j": case "k": case "i": case "m":
            SoundFX.change();
            currentLevel[plrY][plrX] = currentLevel[_y][_x];
            moveTile(buttons[_y][_x], _w);
        case "l": case "r": case "t": case "b":
            SoundFX.move();
        case "a": case "s": case "w": case "z":
            if (currentLevel[_y][_x] > 3 && currentLevel[_y][_x] < 8) {
                SoundFX.march(36);
                killed++;
                moveTile(buttons[_y][_x], "center", 3, 3);
            }
            currentLevel[_y][_x] = 1;
            moveTile(buttons[plrY][plrX], _z);
            break;
        default:
            SoundFX.close();
            currentLevel[plrY][plrX] = 1;
            break;
    }
    TweenFX.to(buttons[plrY][plrX].holder, anim, { alpha: 1 });
    wait(function () {
        killAll(area);
        createGrid(currentLevel, nextMove);
    }, getAnim(2.25));
    if (animating) wait(function () {
        animating = false;
    }, getAnim(15));
}

function moveTile(_tile, _pos) {//console.log(parseInt(performance.now()),"moveTile:", _pos)
    var _short = anim * ((_tile.div.style.opacity == "0.74") ? 0.75 : 2);
    dirs = {
        top: [{ y: -buttonHeight }, { y: -buttonHeight * 2 }],
        left: [{ x: -buttonWidth }, { x: -buttonWidth * 2 }],
        right: [{ x: buttonWidth }, { x: buttonWidth }],
        bottom: [{ y: buttonHeight }, { y: buttonHeight * 2 }],//*((ratioX<1)?ratioX:1)
        center: [{ alpha: 0 }, { alpha: 0 }]
    }
    window.requestAnimationFrame(function () {
        TweenFX.to(_tile.div, _short, dirs[_pos][0]);
        TweenFX.to(_tile.diggit, _short, dirs[_pos][1]);
    });
}

function nextMove() {//console.log(parseInt(performance.now()),"nextMove:", turn, turns)
    idle = false; animating = true;
    var mod = [];
    for (var _y = 0; _y < height; _y++) {
        mod.push([]);
        for (var _x = 0; _x < width; _x++) {
            mod[_y].push(0);
        }
    }
    for (_y = 0; _y < height; _y++) {
        for (_x = 0; _x < width; _x++) {
            if (currentLevel[_y][_x] == 2 && turn == ALLIES) {
                currentLevel[_y][_x] = 0;
                moveTile(buttons[_y][_x], up);
                if (_y > 0) {
                    if (currentLevel[_y - 1][_x] == 1) {
                        currentLevel[_y][_x] = 1;
                        SoundFX.change();
                        moveTile(buttons[_y - 1][_x], bottom);
                    }
                    if (currentLevel[_y - 1][_x] > 3 && currentLevel[_y - 1][_x] < 8) {
                        SoundFX.march(36); SoundFX.move();
                        killed++;
                        moveTile(buttons[_y - 1][_x], "center");
                    }
                    currentLevel[_y - 1][_x] = 2;
                } else {
                    if (currentLevel[height - 1][_x] == 1) {
                        currentLevel[0][_x] = 1;
                    } else if (currentLevel[height - 1][_x] == 2 || currentLevel[height - 1][_x] == 3) {
                        if (currentLevel[height - 2][_x] == 1) {
                            currentLevel[0][_x] = 1;
                            mod[height - 2][_x] = 2;
                        } else if (currentLevel[height - 2][_x] == 2) {
                            if (currentLevel[height - 3][_x] <= 1) {
                                currentLevel[0][_x] = 1;
                                mod[height - 3][_x] = 2;
                            }
                        }
                    }
                    mod[height - 1][_x] = 3;
                }
            }/* else if(currentLevel[_y][_x]==3 && turn == ALLIES){
                SoundFX.ui();
            }*/

            if ((currentLevel[_y][_x] == 4 && turn == OPP) || (currentLevel[_y][_x] == 5 && turn == FOES)) {
                var _i = currentLevel[_y][_x];
                var _j = (_i == 5) ? 4 : 5;
                currentLevel[_y][_x] = 0;
                moveTile(buttons[_y][_x], left);
                if (_x > 0) {
                    if (currentLevel[_y][_x - 1] == _j) {
                        currentLevel[_y][_x] = _j;
                        SoundFX.change();
                        moveTile(buttons[_y][_x - 1], right);
                    }
                    if (currentLevel[_y][_x - 1] > 0 && currentLevel[_y][_x - 1] < 4) {
                        SoundFX.hit(); SoundFX.move();
                        moveTile(buttons[_y][_x - 1], "center");
                    }
                    currentLevel[_y][_x - 1] = _i;
                } else if (_i == 5) {
                    mod[_y][width - 1] = 6;
                } else {
                    death = turns;
                    SoundFX.dead();
                    wait(function () { message("\rYou must prevent the enemy captain\rfrom reaching the battle horizon.\r\r", " Restart "); }, getAnim(5));
                    return;
                }
            } else if (currentLevel[_y][_x] == 6 && turn == FOES) {
                SoundFX.ui();
            }
        }
    }
    for (_y = 0; _y < height; _y++) {
        for (_x = 0; _x < width; _x++) {
            if (mod[_y][_x] == 3 && turn == ALLIES) {
                currentLevel[_y][_x] = 2;
            } else if (mod[_y][_x] == 6 && turn == FOES) {
                currentLevel[_y][_x] = 5;
            }
        }
    }
    if (turn == ALLIES) SoundFX.march(8);
    if (isopp() || turn == FOES) SoundFX.move();
    wait(function () {
        killAll(area);
        if (isopp() || turn == FOES) SoundFX.march(-8);
        if (turn == FOES || turn == ALLIES) turns++;
        turn = (turn == ALLIES) ? ((enmX > -1) ? OPP : FOES) : ((turn == OPP) ? FOES : PLR);
        if (turn == FOES || isopp()) {
            updateUI();
            createGrid(currentLevel, nextMove);
        } else createGrid(currentLevel, updateUI);
    }, getAnim(2.25));
    if (animating) wait(function () {
        animating = false;
    }, getAnim(10));
}
function isopp() {
    return (turn == OPP && enmX > -1);
}

function message(_text, _label, _size, _leading) {
    killAll(messbtn); killAll(messtxt);
    mess.removeEventListener("click", messClick);
    TweenFX.to(messtxt, anim, { alpha: 1, x: 8 });
    trans(messtxt, 1);
    TypeFX.drawText(messtxt, _text, _size || 5, _leading || 12);
    setPointer(mess, true);
    mess.className = "c mess " + ((_label) ? "l" : "t");
    messbtn.parentNode.style.visibility = (_label) ? "visible" : "hidden";
    mess.style.width = ((_label) ? 920 : (TweenFX.getStyle(messtxt, "width") + 60)) + "px";
    mess.style.top = ((_label) ? "0" : "26px");
    mess.style.cursor = (_label) ? "default" : "pointer";
    mess.style.height = (TweenFX.getStyle(messtxt, "height") + ((_label) ? 60 : -40)) + "px";
    if (_label) {
        messbtn.id = _label.split("|").join("").split("!").join("").replace(/\s/g, "").toLowerCase();
        if (messbtn.id == "nextstage" || messbtn.id == "shareontwitter") SoundFX.victory(0);
        else if (messbtn.id == "prepare") SoundFX.ui();
        else SoundFX.mess();
        TypeFX.drawText(messbtn, _label, 5);
        TweenFX.to(fade, anim, { alpha: 0.75 });
    } else
        mess.addEventListener("click", messClick);

    TweenFX.to(mess, anim * 2, { alpha: ((_label) ? 0.95 : 0.75) });
}

function messClick() {
    var _w = parseInt(mess.style.width);
    TweenFX.to(mess, anim * 2, { height: (_w < 100) ? (TweenFX.getStyle(messtxt, "height")) : 60, width: (_w < 100) ? TweenFX.getStyle(messtxt, "width") + 40 : 80 });
    TweenFX.to(messtxt, anim * 2, { alpha: (_w < 100) ? 1 : 0, x: (_w < 100) ? 8 : -120 });
    trans(messtxt, (_w < 100) ? 1 : .1);
}

function updateUI(_n, _begin) {
    if (!_n) _n = 0;
    //console.log("updateUI", _n, lvl);
    var pos = [PLR, ALLIES, OPP, FOES];
    var tur = ["Plr >", "Ally >", ((enmX > -1) ? "Opp >" : "-|-|-|>"), ((enms > 0) ? ((enms > 1) ? "Foes >" : "||Foe |> ") : " -|-|-||>||")];
    tur.push(tur[0]); tur.push(tur[1]); tur.push(tur[2]); tur.push(tur[3]);
    killAll(bottomTxt);
    score = 0;
    var mins = 0;
    for (i = 0; i < completed.length; i++) {
        if (i < lvl + _n) score += ((completed[i] < 2) ? 0 : ((completed[i] < 3) ? 25 : 50));
    }
    for (i = 0; i < tempturns.length; i++) {
        //console.log(i, completed[i], completed[i]>0);
        if (completed[i] > 0) {
            mins += minturns[i] * 2;
            if (i < lvl + _n) score += ((tempturns[i] <= mins) ? 50 : 0);
        }
    }
    //if(lvl>12) score = _n*100;
    score += (frags + killed) * 10;
    TypeFX.drawText(bottomTxt, (((plrs == 1) ? "[ |-  - " : ((plrs == 2) ? "[|[ |-|" : "[[[")) + "  stage " + (((lvl + 1 < 10) ? "0" : "") + ((lvl > 0) ? (lvl + 1 - _n) : 1)) + "   frags " + (((frags + killed) < 10) ? "0" : "") + (frags + killed) + "  ||turns " + ((turns + _n < 20) ? "00" : ((turns + _n < 200) ? "0" : "")) + parseInt((turns + _n) / 2) + "   score |" + ((score > 999) ? score : ((score > 99) ? "0" + score : ((score > 9) ? "00" + score : "000" + score))) + "  |=>|" + ((_begin) ? "> >||  get ready !!!  ||< <|<" : (tur[pos.indexOf(turn)]) + (tur[pos.indexOf(turn) + 1]) + (tur[pos.indexOf(turn) + 2]) + (tur[pos.indexOf(turn) + 3]))).toUpperCase() + "=", 2);
}

function writeHistory(_level, _value) {//console.log("writeHistory", lvl, _level, _value);
    if (online) {
        if (sound != 2) writeHistoryLine("m", sound);
        if (anim != 5) writeHistoryLine("a", anim);
        writeHistoryLine("l" + _level, _value);
        writeHistoryLine("l", (lvl == -1) ? 0 : _level + 1.5);
        window.location.reload();
    }
}
function writeHistoryLine(l, v) {
    if (online) window.history.replaceState("", "", updateURLParameter(window.location.href, l, v));
}
function emptyArrays() {
    tempturns = empty.slice();
    tempfrags = empty.slice();
    completed = array.slice(); completed[0] = 0;
    currentLevel = null; lvl = -1;
    turns = killed = frags = 0;
}
function clearProgress() {//console.log(performance.now(),'clearProgress');
    emptyArrays();
    death = lvl = 0;
    if (online) {
        window.history.pushState("", "", location.pathname);
        window.location.reload()
    }
    mainMenu();
}

function updateURLParameter(url, param, paramVal) {
    var TheAnchor = null;
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
        var tmpAnchor = additionalURL.split("#");
        var TheParams = tmpAnchor[0];
        TheAnchor = tmpAnchor[1];
        if (TheAnchor) additionalURL = TheParams;
        tempArray = additionalURL.split("&");
        for (i = 0; i < tempArray.length; i++) {
            if (tempArray[i].split("=")[0] != param) {
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    } else {
        var tmpAnchor = baseURL.split("#");
        var TheParams = tmpAnchor[0]; TheAnchor = tmpAnchor[1];
        if (TheParams) baseURL = TheParams;
    }
    if (TheAnchor) paramVal += "#" + TheAnchor;
    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}


function soundChange() {
    sound += 1;
    if (sound > 2) sound = 0;
    writeHistoryLine("m", sound);
    updateMenu();
    SoundFX.ui();
}

function wait(_callback, _delay) {//console.log("wait:"+_delay)
    var begin = parseInt(performance.now()), now;
    delayFunction();
    function delayFunction() {
        if (!gameState) return;
        now = parseInt(performance.now());//console.log(now , begin, now - begin);
        if (now - begin < _delay) {
            window.requestAnimationFrame(delayFunction);
        }
        else _callback();
    }
}





function createListFunction(callback) {
    return function () {
        for (i = 0; i < arguments.length; i++) {
            if (arguments[i]) {
                callback(arguments[i], i);
            }
        }
    }
}
var kill = createListFunction(function (result, i) {
    if (result.parentNode) {
        result.parentNode.removeChild(result);
    }
})
var killAll = function (child) {
    while (child.firstChild) {
        kill(child.firstChild);
    }
}




var SoundFX = (function () {
    var soundContext = new (window.AudioContext || window.webkitAudioContext)();
    var oscTypes = ["square", "sawtooth", "triangle", "sine"];// sine is the oscillator's default, but we use square as default
    var volume = 1;

    function playSound(_freq, _incr, _delay, _times, _vol, _type) {

        var oscillator = soundContext.createOscillator(); // instantiate oscillator
        oscillator.frequency.value = _freq;
        oscillator.type = oscTypes[_type || 0];

        var modulationGain = soundContext.createGain();
        modulationGain.gain.value = 0;

        oscillator.connect(modulationGain);
        modulationGain.connect(soundContext.destination);
        oscillator.start();

        var i = 0;
        var interval = setInterval(playTune, _delay);

        function playTune() {
            oscillator.frequency.value = _freq + _incr * i;
            modulationGain.gain.value = (1 - (i / _times)) * _vol * volume;
            i++;
            if (i > _times) {
                clearInterval(interval);
                setTimeout(stopTune, (_delay + _times) * 2); // prevents the clicky-glitch sound when stopping the oscillator
            }
        }
        function stopTune() {
            oscillator.stop();
        }
    }
    return {
        playSound: playSound,
        getVolume: function () {
            return _volume;
        },
        setVolume: function (_volume) {
            volume = _volume;
        },
        main: function () {// begin game
            playSound(-120, 25, 25, 30, 0.01 * sound, 1);
            playSound(240, -45, 35, 20, 0.02 * sound, 2);
            setTimeout(function () { playSound(45, 50, 25, 25, 0.02 * sound, 2); }, 150);
            setTimeout(function () { playSound(25, 40, 35, 18, 0.01 * sound, 2); }, 260);
        },
        ui: function () {
            playSound(420, 6, 15, 10, 0.01 * sound, 3);
        },
        close: function () {
            playSound(100, -2, 5, 15, 0.01 * sound, 1);
            playSound(100, -15, 15, 15, 0.05 * sound, 2);
        },
        move: function () {
            playSound(100, -5, 20, 15, 0.01 * sound, 1);
            playSound(100, -5, 25, 25, 0.1 * sound, 3);
        },
        mess: function () {
            bb(10); bb(140); bb(280);
            function bb(_t) {
                setTimeout(function () {
                    playSound(150 - _t * .75, -15, 15, 10, (0.03 - _t / 10000) * sound, 2);
                    playSound(320, 5, 15, 5, (0.04 - _t / 8000) * sound, 3);
                }, _t);
            }
        },
        victory: function () {
            bb(5, 150, 20, 12); bb(140, 150, 20, 12); bb(280, 150, 20, 12);
            bb(400, 198, 20, 15); bb(675, 176, 25, 12); bb(780, 198, 50, 20);
            function bb(_t, _f, _c, _d) {
                setTimeout(function () {
                    playSound(_f, 0, _c, _d, 0.02 * sound, 2);
                    playSound(_f, 0, _c, _d, 0.02 * sound, 3);
                    playSound(_f * 2, 0, _c, _d / 2, 0.003 * sound);
                    playSound(_f * 2, 0, _c, _d / 2, 0.005 * sound, 1);
                }, _t);
            }
        },
        march: function (_n) {
            playSound(125, _n, 15, 25, 0.01 * sound, 1);
            function bb(_t) {
                setTimeout(function () {
                    playSound(100, _n, 15, 15, (0.06 - _t / 8000) * sound, 3);
                }, _t);
            }
            bb(50); bb(140); bb(230); bb(320); bb(400);
        },
        dead: function () {
            dd();
            setTimeout(dd, 120); setTimeout(dd, 220);
            setTimeout(function () { playSound(92, -2, 15, 25, 0.2 * sound, 2); }, 340);
            function dd() { playSound(100, -2, 10, 25, 0.2 * sound, 2); }
        },
        hit: function () {
            setTimeout(function () { playSound(100, -2, 10, 25, 0.1 * sound, 2); }, 180);
            setTimeout(function () { playSound(120, -5, 15, 25, 0.1 * sound, 2); }, 60);
            playSound(110, -10, 20, 15, 0.01 * sound);
        },
        change: function () {
            playSound(160, 20, 25, 25, 0.01 * sound, 3);
            playSound(200, 40, 25, 15, 0.01 * sound, 2);
            playSound(160, 40, 20, 20, 0.01 * sound, 1);
        }
    }
})();

var TypeFX = (function () {
    var symbols = [
        // 32 empty characters will be added here with Array.unshift

        [[, , , 5], [, 6]],																// ! (33)
        [],															// " (34)

        [],	// #
        [[, 2, 2], [2, 1], [3], [4, , , 7], [3, 6], [2, 5], [, 4, 2], [, 3]],					// $
        [],											// %
        [],										// & // treasure

        [[, , , 2]],																	// ' (39)
        [[, 2, , 3], [1, 1], [1, 5], [2], [2, 6]],										// ( (40)
        [[2, 2, , 3], [1, 1], [1, 5], [], [, 6]],											// ) {41}
        [[, 2], [, 4], [1, 3, 3], [2, 1, , 5], [4, 2], [4, 4]],								// * (42)
        [[, 3, 5], [2, 1, , 5]],															// + (43)
        [[1, 6, , 2], [, 8]],															// , (44)
        [[, 3, 5]],																	// -
        [[, 6]],																		// .
        [],										// / (47)


        [[1, , 3], [, 1, , 5], [1, 6, 3], [4, 1, , 5], [1, 4], [2, 3], [3, 2]],					// 0 (48)
        [[1, 1], [2, , , 6], [1, 6, 3]],													// 1
        [[, 1], [1, , 3], [4, 1, , 2], [3, 3], [2, 4], [1, 5], [, 6, 5]],						// 2
        [[, 1], [1, , 3], [4, 1, , 2], [4, 4, , 2], [, 5], [1, 6, 3], [2, 3, 2]],					// 3
        [[, 3], [1, 2], [2, 1], [, 4, 5], [3, , , 7]],										// 4
        [[, , 5], [, 1], [, 2, 4], [4, 3, , 3], [, 5], [1, 6, 3]],								// 5
        [[1, , 3], [4, 1], [, 1, , 5], [1, 6, 3], [1, 3, 3], [4, 4, , 2]],						// 6
        [[, , 5], [4, 1, , 2], [3, 3, , 2], [2, 5, , 2]],										// 7
        [[1, , 3], [, 1, , 2], [4, 1, , 2], [, 4, , 2], [4, 4, , 2], [1, 3, 3], [1, 6, 3]],			// 8
        [[1, , 3], [, 1, , 2], [1, 3, 3], [4, 1, , 5], [1, 6, 3], [, 5]],						// 9 (57)

        [[, 1], [1, 2], [2, 3], [3, 5], [3, 4, 2], [5, , 3], [5, 1, 3], [5, -1], [9, 5], [5, 3, 5], [6, 4, 3], [6, 5, 3], [5, 6], [7, 6, 2], [4, 7, 2], [8, 7, 3]],
        // : // enemy icon (58)
        [],																			// ; // enemy icon dublicate (59)
        [[4, 3], [5, 2], [5, 4], [6, 1], [6, 5]],										// < // move left (60)
        [[1, -1, 3], [], [4, , 2], [6, 1, 2], [7, 2, 2], [10, 2, , 2], [8, 4, 3], [11, 5], [11, 7], [1, 3, , 2], [, 2], [2, 3], [3, 5], [4, 6, 2], [6, 7, 2], [8, 8, 3]],
        // = // exchange icon (61)
        [[6, 3], [5, 2], [5, 4], [4, 1], [4, 5]],										// > // move right (62)
        [[, 1], [1, , 3], [4, 1, , 2], [3, 3], [2, 4], [2, 6]],								// ?
        [[2, , 4], [, 2, , 4], [7, 2, , 4], [2, 7, 4], [3, 2, 2], [2, 3, , 2], [3, 5, 2], [1, 1], [6, 1], [1, 6], [6, 6]],//(C) copyright sign

        [[, 1, , 6], [4, 1, , 6], [1, , 3], [, 3, 4]],										// A (65)
        [[, , 4], [, , , 7], [, 3, 4], [, 6, 4], [4, 1, , 2], [4, 4, , 2]],						// B
        [[1, , 3], [, 1, , 5], [1, 6, 3], [4, 5], [4, 1]],									// C
        [[, , , 7], [, , 4], [, 6, 4], [4, 1, , 5]],											// D
        [[, , 5], [, 3, 4], [, 6, 5], [, , , 7]],											// E
        [[, , 5], [, 3, 4], [, , , 7]],													// F (70)
        [[1, , 3], [, 1, , 5], [1, 6, 3], [4, 5], [3, 4, 2], [4, 1]],							// G
        [[, , , 7], [4, , , 7], [1, 3, 3]],													// H
        [[, , 3], [, 6, 3], [1, 1, , 5]],													// I
        [[4, , , 6], [1, 6, 3], [, 5]],													// J
        [[, , , 7], [1, 3], [2, 2], [2, 4], [3, 1], [4], [3, 5], [4, 6]],					// K (75)
        [[, , , 7], [1, 6, 4]],															// L
        [[, , , 7], [1, 2], [3, 2], [2, 3], [4, , , 7]],										// M
        [[, , , 7], [1, 2], [2, 3], [3, 4], [4, , , 7]],										// N
        [[1, , 3], [, 1, , 5], [1, 6, 3], [4, 1, , 5]],										// O
        [[, , , 7], [, , 4], [, 3, 4], [4, 1, , 2]],											// P
        [[1, , 3], [, 1, , 5], [1, 6, 3], [4, 1, , 5], [4, 7]],								// Q (81)
        [[, , , 7], [, , 4], [, 3, 4], [4, 1, , 2], [4, 4, , 3]],								// R
        [[1, , 4], [, 1, , 2], [1, 3, 3], [4, 4, , 2], [, 6, 4]],								// S
        [[, , 5], [2, , , 7]],															// T
        [[, , , 6], [1, 6, 3], [4, , , 6]],													// U (85)
        [[, , , 3], [4, , , 3], [1, 3, , 2], [3, 3, , 2], [2, 5, , 2]],							// V
        [[, , , 7], [1, 5], [2, 4], [3, 5], [4, , , 7]],										// W
        [[, , , 2], [4, , , 2], [, 5, , 2], [4, 5, , 2], [1, 2], [3, 2], [2, 3], [1, 4], [3, 4]],	// X
        [[, , , 2], [4, , , 2], [1, 2], [3, 2], [2, 3, , 4]],									// Y
        [[, , 5], [, 6, 5], [, 5], [1, 4], [2, 3], [3, 2], [4, 1]],							// Z (90)

        [[4, , 3], [4, 1, 3], [5, -1], [8, 2, 3], [0, 2], [1, 3], [8, 4, 3], [9, 5], [2, 4], [3, 3, 8], [4, 4, 3], [4, 5, 3], [3, 6], [7, 6], [2, 7, 2], [7, 7, 2]],
        // [ // player icon
        [],												// \
        [],																			// ] // player icon dublicate
        [[3, 4], [4, 3], [5, 2], [6, 3], [7, 4]],										// ^ // move up
        [[5, 7, 2], [6, 6], [9, 3, 2], [8, 4, 2], [7, 5, 4], [8, 6, 2], [9, 7, 2], [1, 7, 2], [3, 6, 2], [5, 5], [6, 4], [7, 2, , 2], [8, , , 3], [10, 2], [, 4, 3], [1, 3, 2], [1, 2, 2], [5, -1], [7, -1, , 2], [3]],
        // _ //attack enemy icon
        [[3, 2], [4, 3], [5, 4], [6, 3], [7, 2]],										// ` // move down

        [[1, 2, 2], [1, 4, 2], [1, 6, 2], [, 5], [3, 3, , 4]],										// a (97)
        [[, , , 7], [, 2, 3], [, 6, 3], [3, 3, , 3]],											// b
        [[, 3, , 3], [1, 2, 2], [1, 6, 2], [3, 3], [3, 5]],									// c
        [[3, , , 7], [1, 2, 2], [1, 6, 2], [, 3, , 3]],										// d (100)
        [[1, 2, 2], [, 3, , 3], [1, 6, 2], [3, 3], [, 4, 4]],									// e
        [[1, 1, , 6], [, 3, 3], [2]],													// f
        [[1, 2, 2], [, 3, , 3], [1, 6, 2], [3, 2, , 6], [1, 8, 2]],								// g (103)
        [[, , , 7], [, 2, 3], [3, 3, , 4]],													// h
        [[1, 2, , 5], [1], [, 2]],														// i
        [[1, 2, , 5], [1], [, 2], [, 7]],												// j
        [[, , , 7], [1, 4], [2, 3], [2, 5], [3, 2], [3, 6]],								// k
        [[, , , 6], [1, 6]],															// l
        [[, 2, , 5], [2, 3, , 4], [4, 3, , 4], [, 2, 4]],										// m
        [[, 2, , 5], [3, 3, , 4], [, 2, 3]],												// n (110)
        [[1, 2, 2], [, 3, , 3], [1, 6, 2], [3, 3, , 3]],										// o
        [[, 2, 3], [, 2, , 7], [, 6, 3], [3, 3, , 3]],											// p
        [[1, 2, 2], [3, 2, , 7], [1, 6, 2], [, 3, , 3]],										// q
        [[, 2, , 5], [1, 3], [2, 2, 2]],													// r
        [[1, 2, 3], [1, 4, 2], [, 6, 3], [, 3], [3, 5]],									// s
        [[1, , , 6], [, 2, 3], [2, 6]],													// t (116)
        [[, 2, , 4], [1, 6, 2], [3, 2, , 4]],												// u
        [[, 2, , 5], [3, 2, , 3], [1, 6], [2, 5]],											// v
        [[, 2, , 4], [2, 2, , 4], [4, 2, , 4], [1, 6], [3, 6]],								// w
        [[, 2, , 2], [1, 4, 2], [3, 2, , 2], [, 5, , 2], [3, 5, , 2]],							// x
        [[, 2, , 4], [1, 6, 2], [3, 2, , 6], [1, 8, 2]],										// y
        [[, 2, 4], [3, 3], [1, 4, 2], [, 5], [, 6, 4]],										// z (122)

        [[, 2], [1, 3], [2, 4], [, 4], [2, 2]],// sound )	// {
        [],// space //[[1,,,9]],					// |
        [[2, 2, , 3], [1, 1], [1, 5]]// sound x			// }
    ], spaces = [], i, j, k, h, w;
    for (i = 0; i < 33; i++) symbols.unshift([]);
    symbols[59] = symbols[58].slice();
    symbols[93] = symbols[91].slice();
    for (i = 0; i < symbols.length; i++) {
        if (i == 124) spaces.push(0); else if (i == 33 || i == 39 || i == 46) spaces.push(1);
        else if ([32, 44, 105, 106, 108].indexOf(i) > - 1) spaces.push(2);
        else if ([40, 41, 73, 102, 116, 123, 125, 92].indexOf(i) > -1) spaces.push(3);
        else if (i > 96 && i != 109 && i != 119) spaces.push(4);
        else if ((i > 90 && i < 97 && i != 92) || (i > 57 && i < 63) || i == 38) spaces.push(12);
        else if (i == 64) spaces.push(8); else spaces.push(5);
    }

    function drawDiggit(_element, _diggit, _size, _color) {
        if (!parseInt(_diggit)) _diggit = _diggit.charCodeAt(0);
        if (!_color) _color = "white";
        if (!_size) _size = 1;
        var canvas = _element.nodeName.toLowerCase();
        if (canvas == "canvas") {
            canvas = _element;
        } else {
            canvas = document.createElement("canvas");
        }
        canvas.width = _size * spaces[_diggit];
        canvas.height = _size * 10;
        drawGlyph(canvas, _diggit, _size, _color);
        if (canvas != _element) _element.appendChild(canvas);
        return canvas;
    }

    function drawGlyph(canvas, _diggit, _size, _color) {
        var context = canvas.getContext("2d");
        context.fillStyle = _color;
        if (symbols[_diggit]) {
            for (i = 0; i < symbols[_diggit].length; i++) {
                if (symbols[_diggit][i].length == 4) {
                    h = symbols[_diggit][i][3]; w = 1;
                } else if (symbols[_diggit][i].length == 3) {
                    w = symbols[_diggit][i][2]; h = 1;
                } else { w = 1; h = 1; }
                context.beginPath();
                context.rect(symbols[_diggit][i][0] * _size || 0, ((symbols[_diggit][i][1] || 0) + 1) * _size, w * _size, h * _size);
                context.fill();
            }
        }
    }

    function drawText(_element, _text, _size, _leading, _color) {
        var _letter;
        var lines = _text.split("\r");
        var widths = [];
        for (k = 0; k < lines.length; k++) {
            widths.push(0);
            for (j = 0; j < lines[k].length; j++) {
                _letter = drawDiggit(_element, lines[k].charCodeAt(j), _size, _color);
                _letter.style.position = "absolute";
                _letter.style.left = widths[k] + "px";
                _letter.style.top = (k) ? (k * _size * 10 + (k * _leading || 0)) + "px" : 0;
                dontSelect(_letter);
                widths[k] += _letter.width + _size;
            }
        }
        _element.style.width = Math.max.apply(this, widths) + "px";
        _element.style.height = (lines.length * _size * 10 + (lines.length * _leading || 0)) + "px";
    }

    return {
        symbols: symbols,
        drawDiggit: drawDiggit,
        drawGlyph: drawGlyph,
        drawText: drawText
    }
})();

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        document.querySelector("body").classList.add("loaded");
    }, 500)
});

document.addEventListener("DOMContentLoaded", function () {
    let loader = document.querySelector(".loader-wrapper");

    setTimeout(function () {
        loader.classList.add("loaded");
    }, 3000); // adjust the timeout to your liking
});

var TweenFX = function () { function t(t, i, s, p, a) { function u() { if (!n) { for (m += 1, c = 0; c < g.length; c++)g[c].start == g[c].end ? h = g[c].end : (f = g[c].start > g[c].end ? g[c].end + (g[c].start - g[c].end) / i * (i - m) : g[c].start - (g[c].start - g[c].end) / i * m, h = m >= i ? g[c].end : f), g[c].property != r[1] && (h += "px"), r.indexOf(g[c].property) > -1 && (t.style[g[c].property] = h); if (m >= i) return "0" == t.style.opacity && (t.style.visibility = "hidden"), d(t), void (p && p.apply(this, a)) } (c = l.indexOf(t)) > -1 && (o[c] = requestAnimationFrame(u)) } function y(t) { return t ? l.indexOf(t) : l.length } function d(t, e) { return t && (e = y(t)), e > -1 && (cancelAnimationFrame(o.splice(e, 1)), l.splice(e, 1)), e } var c, f, h, m = 0, g = []; for (f in s) r.indexOf(f) > -1 && ((h = "x" == f ? r[2] : "y" == f ? r[3] : f == r[0] ? r[1] : f) == r[1] && s[f] > 0 && ("hidden" == t.style.visibility && (t.style.opacity = "0"), t.style.visibility = "visible"), g.push({ property: h, start: e(t, h), end: s[f] })); d(t), g.length && (o.push(requestAnimationFrame(u)), l.push(t)) } function e(t, e) { return 1 * (window.getComputedStyle(t, null).getPropertyValue(e).match(i) || [0]).map(function (t) { return 1 * t }) } var n, i = /[+-]?\d+(\.\d+)?/g, r = ["alpha", "opacity", "left", up, "right", "bottom", "width", "height", "x", "y"], l = [], o = []; return { to: function (e, n, i, r) { t(e, n, i, r, Array.apply(null, arguments).slice(4)) }, pause: function (t) { return arguments.length ? (t || !1 === t) && (n = t) : n = !n, n }, stop: function (t) { -1 == stopTween(t) && removeAllTweens() }, tweenedElements: l, getStyle: e } }();


