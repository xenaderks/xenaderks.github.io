//var clickables = document.querySelectorAll('.block-text');
var doc = document;
var test = doc.getElementsByTagName('div');
var c1 = [];
// test.forEach(t => { 
	// var children = t.childNodes;
	// var switchbool = true;
	// var testEl = t;
	// var i = 0;
	// while (switchbool) {
		// if (testEl.nodeName == "DIV" && 
		// (testEl.classList.includes('block-text') || testEl.classList.includes('block-image'))) {
			// c1.push(testEl);
		// } else {
			// if (i < children.length) {
				
			// }
		// }
	// }
// });
		
var c1 = doc.getElementsByTagName('block-text', 'block-image');
var rightSide = doc.getElementsByTagName('right-side');
//c1.push(c2);
console.log(test);
console.log(rightSide);
console.log(c1);
c1.forEach(el => new Clickable(el));

function Clickable (el) {
  const texts = el;
  
  texts.forEach(t => {
    const span = document.createElement('span')
    span.innerHTML = `${t} `
    span.addEventListener('click', change_element_state)
    el.appendChild(span)
  })
}

// setup the variables
let wh = window.innerHeight / 100;
let ww = window.innerWidth / 100;
var element_list = [];
var doc = document;
var main = doc.getElementById("scrollcapture");
var window_height_portion;
var vOffset = 0;
var bubble_sizes = ['6vw', '2vw', '54vw'];
var center_sizes = ['85vw', '70vh', '28vh', '12.5vw', '5px'];
// allows for up to 26 differently ID'd elements
var alphabet = ['a','b','c','d','e','f','g','h','i',
				'j','k','l','m','n','o','p','q','r',
				's','t','u','v','W','x','y','z'];
var current = 0;
var touchStartTime, startX, startY;

// add event listeners to each (properly ID'd) element. Also add them to list.
for (let i = 0; i < 26; i++) {
	var e = doc.getElementById(alphabet[i]);
	if (e == null) { break }
	element_list.push(e)
	e.addEventListener('click', change_element_state);
}
// position each non-centrally placed element in 'bubbles' to the side.
let el = element_list.length + 1;
if (el > 4) { el = 4 }
window_height_portion = (window.innerHeight - 200) / (el + 1);

for (let i = 0; i < element_list.length; i++) {
	if (i != 0) {
		e = element_list[i];
		e.style.top = (200 + (window_height_portion * i)).toString() + 'px';
	}
}
var e = element_list[0];
e.style.width 		=	center_sizes[0];
e.style.height 		=	center_sizes[1];
e.style.top 		=	center_sizes[2];
e.style.left 		=	center_sizes[3];
e.style.borderRadius = 	center_sizes[4];

bubblePosAdjust();
// if (element_list.length > 4) {
	// var num = 8 * (0.80**(element_list.length - 3));
	// bubble_sizes[0] = (num).toString() + 'vw';
	// bubble_sizes[1] = (num / 2 + 2* (0.80**(element_list.length - 4))).toString() + 'vw';
	// bubblePosAdjust();
// }

// function _handleClick(evt) {
	// // center
	// var e = evt.target.parentNode.parentNode;
	// console.log(e);
	// e.style.width 		=	center_sizes[0];
	// e.style.height 		=	center_sizes[1];
	// e.style.top 		=	center_sizes[2];
	// e.style.left 		=	center_sizes[3];
	// e.style.borderRadius = 	center_sizes[4];
	// //e.style.userSelect 	= 	'all';
	
	// // bubbles
	// current = element_list.findIndex(function (x) { return(x == e) });
	// bubblePosAdjust();
// }
	

// set the clicked element to the middle, all others to the side-bubbles.
function change_element_state(evt) {
	rightSide.forEach(el => function () { 
		if (rightSide.findIndex(function (x) { return(x == el) }) != current) {
			el.style.width = '0px';
			console.log('0');
		} else {
			el.style.width = '100%';
			console.log('100');
		}
	});
	// center
	var e = evt.target;
	// find the nearest 'bubble' parent
	while (e.nodeName != 'DIV') { e = e.parentNode }
	e.style.width 		=	center_sizes[0];
	e.style.height 		=	center_sizes[1];
	e.style.top 		=	center_sizes[2];
	e.style.left 		=	center_sizes[3];
	e.style.borderRadius = 	center_sizes[4];
	e.style.userSelect 	= 	'all';
	
	// bubbles
	current = element_list.findIndex(function (x) { return(x == e) });
	bubblePosAdjust();
}

function bubblePosAdjust() {
	if (vOffset > 0) { vOffset = 0 }
	var max = (window_height_portion * (element_list.length - 5));
	if (vOffset < -max) { vOffset = -max }
	for (let i = 0; i < element_list.length; i++) {
		if (i != current) {
			e = element_list[i];
			e.style.width 		= bubble_sizes[0];
			e.style.height 		= bubble_sizes[0];
			e.style.top 		= (200 + (window_height_portion * i) + vOffset).toString() + 'px';
			e.style.left 		= bubble_sizes[1];
			e.style.borderRadius = bubble_sizes[2];
			e.style.userSelect 	= 'none';
		}
	}
}

function mouseWheel(e) {
	if (e.pageX > ww*50) { return }
	vOffset += e.wheelDeltaY;
	bubblePosAdjust();
	return(false); // prevents safari from throwing a fit.
}

function touchStarted() {
	startX = mouseX; startY = mouseY;
}

function touchEnded() {
	if (e.pageX < center_sizes[3]) { return }
	vOffset = startY - mouseY;
	console.log(vOffset);
	bubblePosAdjust();
	return(false); // prevents safari from throwing a fit.
}

function windowResized() {
	window_height_portion = (window.innerHeight - 200) / (el + 1);
	bubblePosAdjust();
}

document.addEventListener("mousewheel", mouseWheel, false);