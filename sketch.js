// 		G - L - O - B - A - L -------------------------
// V - A - R - I - A - B - L - E - S ------------------
 
// S C E N E - V A R S
// states:
//	0: name
//	1: my work
//  2: about me
//  3: contact info
//  4: demo reel
let siteState = 0;
let maxSiteState = 4;
let doStates = true; 	// outdated, but possibly useful in future
let links 		= {}; 		// used for menu scene 		-> check setup
let socials 	= {};		// used for contact info 	-> check setup
let metaBlocks 	= {};	// defined in setup
let mouseContext = false;
let startX, startY;		// defined in setup
let touchStartTime;		// defined in setup
let topText = "";		// defined in setup
let bottomText = "";	// defined in setup

// C O L O R S
let backCol;			// defined in setup
let main_pink;			// defined in setup
let theaterImage;		// defined in setup
let standalonesImage;	// defined in setup
let gameImage;			// defined in setup
let programmingImage;	// defined in setup
let artImage;			// defined in setup
let meImage;			// defined in setup
let miscImage;			// defined in setup

// D I S T A N C E S
let w; let tw; let h; let th; let a;

// T I M E R S + T R A N S I T I O N S
let timers = {}; 		// defined in setup
let transitions = {}; 	// defined in setup
let scrollWaitTime = 2000;
let scrollTimer; 		// defined in setup
let startTimer = 0;
let scrollDir = "DOWN";
let canScroll = true;

// return true if is supported // else return false
let isTouch = false;
window.addEventListener("touchstart", (() => {isTouch = true}));

// F O N T S + T E X T
let titleFont; 			// defined in setup
let mainFont; 			// defined in setup
let openingTextOpacity = 255;
let directionText = document.getElementById('direction');

// B - U - I - L - T -----------------------------------
// 		I - N
// F - U - N - C - S -----------------------------------

// FUNC MOUSEWHEEL
function mouseWheel(e) {
	if (canScroll && doStates) {
		transitionTrigger(e.deltaY);
	}
	return(false); // prevents safari from throwing a fit.
}; 
// END MOUSEWHEEL FUNC

function touchStarted() {
	touchStartTime = millis();
	startX = mouseX; startY = mouseY;
}

function touchEnded() {
	let eY = startY - mouseY;
	let timeDiff = millis() - touchStartTime;
	if (hitBoxCheck()) { return(false) }
	if (canScroll && doStates && timeDiff < 200) {
		transitionTrigger(eY);
	}
	return(false); // prevents safari from throwing a fit.
}

// FUNC PRELOAD
function preload() {
	titleFont = loadFont('fonts/BungeeOutline-Regular.ttf');
	mainFont = loadFont('fonts/Montserrat-Regular.ttf');
	theaterImage = loadImage('images/theater.jpg');
	gameImage = loadImage('images/games_2.png');
	programmingImage = loadImage('images/programming.png');
	musicImage = loadImage('images/fanfare.jpg');
	meImage = loadImage('images/me.jpg');
	visualImage = loadImage('images/golden_dragon.png');
}
// END PRELOAD FUNC

// FUNC SETUP
function setup() {
	createCanvas(windowWidth, windowHeight);
	transitions.next_scene = new transition("DOWN", 
											"LINEAR", 
											30, 
											(siteState + 1) % maxSiteState);
	transitions.prev_scene = new transition("UP",
											"LINEAR",
											30,
											(siteState - 1) % maxSiteState);
	w = windowWidth;
	tw = w / 1000;
	h = windowHeight;
	th = h / 1000;
	a = w / h;
	imageMode(CORNER);
	backCol = color(0,0,0,255);
	main_pink = color(255, 155, 155, 255);
	noStroke();
	links.audio = new content_rect(250*tw, 1000*th, 
									createVector(0,0), 
									"audio",
									true,
									musicImage,
									col1 = color(0, 0, 0, 0),
									col2 = color(255, 255, 255, 255),
									col3 = color(255, 255, 255, 100),
									col4 = color(0, 0, 0, 255),
									underlineOrHighlight = "HIGHLIGHT",
									pageLink = "audio.html");
	links.code = new content_rect(250*tw, 1000*th, 
									createVector(250*tw,0), 
									"code",
									true,
									programmingImage,
									col1 = color(0, 0, 0, 0),
									col2 = color(255, 255, 255, 255),
									col3 = color(255, 255, 255, 100),
									col4 = color(0, 0, 0, 255),
									underlineOrHighlight = "HIGHLIGHT",
									pageLink = "code.html");
	links.theater = new content_rect(250*tw, 1000*th, 
									createVector(500*tw,0), 
									"theater",
									true,
									theaterImage,
									col1 = color(0, 0, 0, 0),
									col2 = color(255, 255, 255, 255),
									col3 = color(255, 255, 255, 100),
									col4 = color(0, 0, 0, 255),
									underlineOrHighlight = "HIGHLIGHT",
									pageLink = "theater.html");
	links.visual = new content_rect(250*tw, 1000*th, 
									createVector(750*tw,0), 
									"visual",
									true,
									visualImage,
									col1 = color(0, 0, 0, 0),
									col2 = color(255, 255, 255, 255),
									col3 = color(255, 255, 255, 100),
									col4 = color(0, 0, 0, 255),
									underlineOrHighlight = "HIGHLIGHT",
									pageLink = "visual.html");
	if (a > 1) {
		socials.linkedIn = new content_rect(tw*400, th*100,
											createVector(tw*550,th*450),
											'/xena-derks-49a183208/  ',
											true,
											'',
											col1 = color(0, 0, 0, 0),
											col2 = color(255, 255, 255, 255),
											col3 = color(255, 255, 255, 100),
											col4 = color(0, 0, 0, 255),
											underlineOrHighlight = "UNDERLINE",
											pageLink = "https://www.linkedin.com/in/xena-derks-49a183208/");
		socials.youtube = new content_rect(tw*400, th*100,
											createVector(tw*550,th*600),
											"xena's music corner  ",
											true,
											'',
											col1 = color(0, 0, 0, 0),
											col2 = color(255, 255, 255, 255),
											col3 = color(255, 255, 255, 100),
											col4 = color(0, 0, 0, 255),
											underlineOrHighlight = "UNDERLINE",
											pageLink = "https://www.youtube.com/@xenasBS");
		socials.absin = new content_rect(tw*400, th*100,
											createVector(tw*550,th*750),
											"AbsIn  ",
											true,
											'',
											col1 = color(0, 0, 0, 0),
											col2 = color(255, 255, 255, 255),
											col3 = color(255, 255, 255, 100),
											col4 = color(0, 0, 0, 255),
											underlineOrHighlight = "UNDERLINE",
											pageLink = "https://discord.gg/NGymBDjENp");
	} else {
		socials.linkedIn = new content_rect(tw*500, th*100,
											createVector(tw*250,th*480),
											'/xena-derks-49a183208/  ',
											true,
											'',
											col1 = color(0, 0, 0, 0),
											col2 = color(255, 255, 255, 255),
											col3 = color(255, 255, 255, 100),
											col4 = color(0, 0, 0, 255),
											underlineOrHighlight = "UNDERLINE",
											pageLink = "https://www.linkedin.com/in/xena-derks-49a183208/");
		socials.youtube = new content_rect(tw*500, th*100,
											createVector(tw*250,th*630),
											"xena's music corner  ",
											true,
											'',
											col1 = color(0, 0, 0, 0),
											col2 = color(255, 255, 255, 255),
											col3 = color(255, 255, 255, 100),
											col4 = color(0, 0, 0, 255),
											underlineOrHighlight = "UNDERLINE",
											pageLink = "https://www.youtube.com/@xenasBS");
		socials.absin = new content_rect(tw*500, th*100,
											createVector(tw*250,th*780),
											"AbsIn  ",
											true,
											'',
											col1 = color(0, 0, 0, 0),
											col2 = color(255, 255, 255, 255),
											col3 = color(255, 255, 255, 100),
											col4 = color(0, 0, 0, 255),
											underlineOrHighlight = "UNDERLINE",
											pageLink = "https://discord.gg/NGymBDjENp");
	}
	metaBlocks.titlePage = new metaContainer(	createVector(850*tw, 65*tw),
												createVector(75*tw, 350*th),
												"DEMO REEL",
												"MY WORK",
												"ABOUT ME",
												"CONTACT INFO");
}
// END SETUP FUNC

// FUNC DRAW
function draw() {
	background(backCol);
	textAlign(CENTER, CENTER);
	if (mouseContext) { 
		text(str(int(winMouseX)), winMouseX, winMouseY);
		text(str(int(winMouseY)), winMouseX, winMouseY + 40);
	}
	if (!doStates) {
		return;
	}
	// VV Manage Scenes VV
	switch (siteState) {
		case 0:
			// text_preset(4);
			// let introLine = 'c o m p o s i t i o n\nt  e  c  h  n  o  l  o  g  y\ne x p e r i m e n t a t i o n';
			// text(introLine, tw*500, th*100);
			text_preset(0); text('XENA', tw*500, th*400);
			topText = "";
			bottomText = "m y   w o r k";
			if (a <= 1.2) { metaBlocks.titlePage.pos.y = th*400 + textAscent('XENA') }
			else if (a <= 1.45) { metaBlocks.titlePage.pos.y = tw*280 + textAscent('XENA') }
			else { metaBlocks.titlePage.pos.y = th*200 + textAscent('XENA') }
			metaBlocks.titlePage.testHover();
			metaBlocks.titlePage.place();
			break;
		case 1:
			textAlign(CENTER, CENTER);
			for (let key in links) {
				links[key].testHover();
				links[key].place();
			}
			topText = "t h e   t i t l e   p a g e"
			bottomText = "m o r e   a b o u t   m e";
			break;
		case 2:
			topText = "m y   w o r k";
			bottomText = "m y   c o n t a c t - i n f o";
			let aboutMeText = "Hi there! Welcome to my portfolio. I'm a 23-year-old music and technology student at the University for the arts in Utrecht, where I'll be graduating in juli. I have a passion for multidisciplinary projects, especially video games and theater, and use my skills in programming to supplement my skills in composition and musical performance.\n\n" +
			"I specialize in slow, atmospheric music. I range between extreme calm and extreme tension, with a bias to tension; ideally I keep my audience on the edge of their seats at all times. I'm as well versed in working together with acoustic musicians as I am with sampling, synths and virtual orchestration. Upon request I'll gladly adjust to a faster pace. I deeply enjoy writing complex beats which would require five hands to be performed by a live musician- in those moments my computer comes in very handy!\n\n"+
			"To me there's nothing more exciting than sitting with my team and discussing the next steps we're going to be taking in our project. If that conversation can be held in person, all the better.\n\n"+
			"If you're reading this, hopefully that team will be yours!";
			if (w > 700){ // LANDSCAPE
				text_preset(0); textSize(tw*70); strokeWeight(5);
				text('about me', tw*270, th*150);
				text_preset(1); textAlign(LEFT, TOP); textSize(tw*13 - (0.5 ** tw));
				text(aboutMeText, tw*20, th*250, tw*550);
				image(meImage, tw*600, th*100, tw*300, th*820);
			} else { // PORTRAIT
				text_preset(0); textSize(tw*170); strokeWeight(5);
				text('about me', tw*500, th*140);
				text_preset(1); textAlign(LEFT, TOP); textSize(th*18);
				text(aboutMeText, tw*40, 450*tw, tw*920);
			}
			textAlign(CENTER, CENTER);
			break;
		case 3:
			topText = "m o r e   a b o u t   m e";
			bottomText = "m y   d e m o - r e e l";
			text_preset(2, true);
			textSize(tw*40 + 3*(width/1920));
			if (a > 1) { 
				textAlign(LEFT, CENTER);
				text('EMAIL :', 	tw*50, th*200);
				text('PHONE :', 	tw*50, th*350);
				text('LINKEDIN :', 	tw*50, th*500);
				text('YOUTUBE :', 	tw*50, th*650);
				textAlign(LEFT, TOP);
				text('COMPANY DISCORD :', 	tw*50, th*750);
				
				textAlign(RIGHT, CENTER);
				text('xenaderks@gmail.com', tw*950, th*200);
				text('+31 6 38762478', 		tw*950, th*350);
				for (let key in socials) {
					socials[key].testHover(); 
					socials[key].place([RIGHT, CENTER]);
				}
			} else { 
				textAlign(CENTER, CENTER);
				text('EMAIL :', 	tw*500, th*200);
				text('PHONE :', 	tw*500, th*350);
				text('LINKEDIN :', 	tw*500, th*500);
				text('YOUTUBE :', 	tw*500, th*650);
				text('COMPANY DISCORD :', 	tw*500, th*800);
				text('xenaderks@gmail.com', tw*500, th*250);
				text('+31 6 38762478', 		tw*500, th*400);
				for (let key in socials) {
					socials[key].testHover(); 
					socials[key].place([CENTER, CENTER]);
				}
			}
			break;
		case 4:
			topText = "m y   c o n t a c t - i n f o";
			textAlign(CENTER, CENTER); text_preset(0); textSize(75*tw);
			text('!under construction!', tw*500, th*500);
			break;
	}
	
	// VV Top + Bottom text
	// textAlign(CENTER, CENTER);
	// text_preset(3);
	// let instruction;
	// let upInstruction = "";
	// let downInstruction = "";
	// if (!isTouch) { instruction = "s c r o l l   "; } else { instruction = "s w i p e   "; }
	// if (siteState != maxSiteState) {
		// if (isTouch) { upInstruction = instruction + "u p   f o r   " + bottomText; }
		// else { upInstruction = instruction + "d o w n   f o r   " + bottomText; }
	// }
	// if (siteState != 0) { 
		// if (isTouch) { downInstruction = instruction + "d o w n   f o r   " + topText; }
		// else { downInstruction = instruction + "u p   f o r   " + topText; }
	// }
	// text(upInstruction, tw*500, th*967);
	// text(downInstruction, tw*500, th*15);
	
	// VV Manage Transitions VV
	if (canScroll) { return }
	switch (scrollDir) {
		case "DOWN":
			canScroll = transitions.next_scene.run();
			break;
		case "UP":
			canScroll = transitions.prev_scene.run();
			break;
	}
}
// END DRAW FUNC

// FUNC WINDOW RESIZED
function windowResized() {
	setup();
}
// END WINDOW RESIZED

// FUNC TESTRECTHOVER
function testRectHover(point1, point2) {
	if (mouseX < point2.x && mouseX > point1.x &&
		mouseY < point2.y && mouseY > point1.y) {
		return(true);
	}
	return(false);
}
// END TESTRECTHOVER

// C - U - S - T - O - M --------------------------------------------------------
//	F - U - N - C - S -----------------------------------------------------------

// FUNC TRANSITION TRIGGER
function transitionTrigger(triggerValue, threshold = 40, stateSetter = 999) {
	if(triggerValue > threshold) { // down
		transitions.next_scene.progress = 0;
		if (siteState == maxSiteState) { transitions.next_scene.tGoal = 0 }
		else if (stateSetter == 999) { transitions.next_scene.tGoal = siteState + 1 }
		else { transitions.next_scene.tGoal = stateSetter }
		scrollDir = "DOWN"; canScroll = false;
	}
	if(triggerValue < -threshold) { // up
		transitions.prev_scene.progress = 0;
		if (siteState == 0) { transitions.prev_scene.tGoal = maxSiteState }
		else if (stateSetter == 999) { transitions.prev_scene.tGoal = siteState - 1 }
		else { transitions.prev_scene.tGoal = stateSetter }
		scrollDir = "UP"; canScroll = false;
	}
}
// END TRANSITION TRIGGER FUNC

// FUNC HITBOX CHECK
function hitBoxCheck() {
	switch (siteState) {
		case 0:
			for (let key in metaBlocks) {
				let r = metaBlocks[key].rects;
				for (let keyception in r) {
					if (r[keyception].testHover()) {
						transitionTrigger(1, 0, metaBlocks[key].ssll[keyception]);
						return(true);
					}
				}
			}
			break;
		case 1:
			for (let key in links) {
				if (links[key].testHover() && links[key].url != "") {
					let newPage = links[key].url;
					window.open(newPage, "_blank");
					return(true);
				}
			}
			break;
		case 3:
			for (let key in socials) {
				if (socials[key].testHover()) {
					let newPage = socials[key].url;
					window.open(newPage, "_blank");
					return(true);
				}
			}
			break;
	}
}
// END HITBOX CHECK

// FUNC TEXT PRESET
function text_preset(setter, mod = false) {
	// mod is a modifier. Triggers some special properties.
	noStroke();
	switch (setter) {
		case 0: // XENA text
			fill(main_pink);
			textFont(titleFont);
			textSize(tw*300);
			break;
		case 1: // UI text
			let new_col = color(255,255,255,255);
			fill(new_col);
			textFont(mainFont);
			textSize(tw*30);
			break;
		case 2: // content-rect text.
			textFont(mainFont);
			if (a > 0.7 || mod) { textSize(tw*30) } else { textSize(tw*50) };
			if (mod) { stroke(255,255,255,255); strokeWeight(1*tw) }
			break;
		case 3: // top + bottom text;
			textFont(mainFont);
			textSize(20*th);
			noStroke();
			fill(255,255,255,255);
			break;
		case 4: //intro line
			textFont(mainFont);
			textSize(th*30);
			fill(color(255,155,155,255));
			break;
	}
}
// END TEXT PRESET FUNC

// 	C - U - S - T - O - M --------------------------------------------------------
// C - L - A - S - S -E - S -----------------------------------------------------------

// CLASS TRANSITION
class transition {
	// constructor ----------------
	constructor(direction = "DOWN",
				type = "LINEAR",
				time = 80,
				transition_goal,
				start_dimension = 	[[0, 0],
									[windowWidth,windowHeight]], 
				end_dimension = 	[[0,0],
									[windowWidth,windowHeight]]) {
		this.dir = direction;
		this.tGoal = transition_goal;
		this.type = type;
		this.start_dim = start_dimension;
		this.end_dim = end_dimension;
		this.progress = 0;
		this.end = time;
		this.alpha_slice_size = 255 / this.start_dim[1][1];
		this.gradient = [];
		if (this.type == "LINEAR") { // Linear transition gradient.
			// Loop over 3x the height of the transition graphic proper
			// includes linear-gradient in and out.
			for (let i = 0; i < this.start_dim[1][1] * 3; i++) {
				// Create the left and right points of the line- one slice of the gradient.
				let point_1 = createVector(this.start_dim[0][0], this.start_dim[1][1] + i);
				let point_2 = createVector(this.start_dim[1][0], this.start_dim[1][1] + i);
				// Opacity ramps up until reaching max, stays there for 1/3rd of the graphic,
				// then ramps back down.
				let preload_alpha = this.alpha_slice_size * i;
				if (i > this.start_dim[1][1] * 2) { 
					preload_alpha = 765 - preload_alpha;
				} else if (preload_alpha > 255) { 
					preload_alpha = 255;
				}
				this.gradient.push	([point_1,
									point_2,
									preload_alpha]);
			}
		}
	} // end constructor
	refresh() {
		this.gradient.splice(0);
		for (let i = 0; i < this.start_dim[1][1] * 3; i++) {
			// Create the left and right points of the line- one slice of the gradient.
			let point_1 = createVector(this.start_dim[0][0], this.start_dim[1][1] + i);
			let point_2 = createVector(this.start_dim[1][0], this.start_dim[1][1] + i);
			// Opacity ramps up until reaching max, stays there for 1/3rd of the graphic,
			// then ramps back down.
			let preload_alpha = this.alpha_slice_size * i;
			if (i > this.start_dim[1][1] * 2) { 
				preload_alpha = 765 - preload_alpha;
			} else if (preload_alpha > 255) { 
				preload_alpha = 255;
			}
			this.gradient.push	([point_1,
								point_2,
								preload_alpha]);
		}
	}
	// run -----------------
	run() {
		switch (this.type) {
			case "LINEAR":
				let maxDist = this.start_dim[1][1] * 4;
				let stepDist = maxDist / this.end;
				strokeWeight(3);
				if (this.dir == "DOWN") {
					for (let i = 0; i < this.start_dim[1][1] * 3; i++) {
						let grad = this.gradient[i];
						let c = color(0,0,0,grad[2]);
						stroke(c);
						let offsetY = stepDist * this.progress;
						line(grad[0].x, grad[0].y - offsetY,
							grad[1].x, grad[1].y - offsetY);
					}
				} else if (this.dir == "UP") {
					for (let i = 0; i < this.start_dim[1][1] * 3; i++) {
						let grad = this.gradient[i];
						let c = color(0,0,0,grad[2]);
						stroke(c);
						let offsetY = maxDist - (stepDist * this.progress);
						line(grad[0].x, grad[0].y - offsetY,
							grad[1].x, grad[1].y - offsetY);
					}
				}
				noStroke();
				this.progress += 1;
				if (this.progress >= this.end / 5 * 2) { siteState = this.tGoal }
				if (this.progress >= this.end) { return(true) }
				return(false);
				break;
			case "_":
				console.log("TRANSITION: type unknown.");
				break;
		}
	} // end run
}
// END TRANSITION CLASS

// CLASS CONTENT-RECT
class content_rect {
	// constructor-----------
	constructor(rect_width,
				rect_height,
				rect_pos,
				rect_text,
				do_outline = true,
				rect_img = "",
				col1 = color(0, 0, 0, 0),
				col2 = color(255, 255, 255, 255),
				col3 = color(255, 255, 255, 100),
				col4 = color(0, 0, 0, 255),
				underlineOrHighlight = "HIGHLIGHT",
				pageLink = "") {
		this.url = pageLink;
		this.w = rect_width; 	this.h = rect_height;
		this.dims = createVector(this.w, this.h);
		this.pos = rect_pos;
		this.txt = rect_text;
		this.o = do_outline;
		this.color1 = col1; 	this.color2 = col2;
		this.color3 = col3; 	this.color4 = col4;
		this.hovered = false;
		this.mod = false;
		this.lerp_state = 0;
		this.img = rect_img;
		this.uoh = underlineOrHighlight;
		this.transer = new transition("IN-OUT",
									"LINEAR",
									80,
									4,
									[	[this.pos.x, this.pos.y], 
										[this.pos.x + this.w, this.pos.y + this.h]
									])
	}
	place(alignment = [CENTER, CENTER]) {
		textAlign(alignment[0], alignment[1]);
		let rect_col = lerpColor(this.color1, this.color3, this.lerp_state);
		let txt_col = lerpColor(this.color4, this.color2, 1.0 - this.lerp_state);
		// draw the rectangle itself.
		if (this.img != "") { 
			// image(this.img, this.pos.x, this.pos.y);
			image(	this.img, 
					this.pos.x, this.pos.y, 
					this.w, this.h, 
					0, 0, 
					this.img.width, this.img.height, 
					COVER, 
					CENTER, CENTER);
		}
		fill(rect_col);
		strokeWeight(5*tw);
		if (!this.o) { noStroke() } else { stroke(this.color2) };
		rect(this.pos.x, this.pos.y, this.w, this.h);
		// draw the text.
		text_preset(2, this.mod);
		fill(txt_col);
		stroke(txt_col);
		strokeWeight(tw*1.75);
		switch (alignment[0]){
			case CENTER:
				text(this.txt, this.pos.x + this.w / 2, this.pos.y + this.h / 2);
				break;
			case RIGHT:
				text(this.txt, this.pos.x + this.w, this.pos.y + this.h / 2);
				break;
			default:
				console.log(alignment);
		}
	}
	testHover() {
		if (testRectHover(this.pos, createVector(this.dims.x+this.pos.x, this.dims.y+this.pos.y))) {
			this.hovered = true;
			if (this.uoh == "UNDERLINE") {
				this.o = true;
				return(true);
			}
			if (this.lerp_state < 1.0) {
				this.lerp_state += 0.08;
			}
			return(true);
		}
		this.hovered = false;
		if (this.uoh == "UNDERLINE") {
			this.o = false;
			return(false);
		}
		if (this.lerp_state > 0.0) {
			this.lerp_state -= 0.08;
		}
		return(false);
	}
}

// CLASS META CONTAINER
class metaContainer {
	constructor(metaDimensions,
				metaPos,
				rect1text = "", rect2text = "",
				rect3text = "", rect4text = "",
				col1 = color(0, 0, 0, 0),
				col2 = color(255, 255, 255, 255),
				col3 = color(255, 255, 255, 100),
				col4 = color(0, 0, 0, 255),
				underlineOrHighlight = 'UNDERLINE',
				siteStatesLinksList = [4, 1, 2, 3]) {
		this.ssll = siteStatesLinksList;
		this.dims = metaDimensions;
		this.pos = metaPos;
		this.txt1 = rect1text; this.txt2 = rect2text;
		this.txt3 = rect3text; this.txt4 = rect4text;
		this.texts = [this.txt1, this.txt2, this.txt3, this.txt4];
		this.color1 = col1; this.color2 = col2;
		this.color3 = col3; this.color4 = col4;
		this.uoh = underlineOrHighlight;
		// it doesn't matter that this isn't accurate. We're just using
		// it for a proportion calculation, so as long as the relative
		// size is right the absolute size doesn't matter.
		this.totalTextWidth = 	textWidth(this.txt1) + 
								textWidth(this.txt2) + 
								textWidth(this.txt3) + 
								textWidth(this.txt4); 
		this.proportions = [textWidth(this.txt1) / this.totalTextWidth,
							textWidth(this.txt2) / this.totalTextWidth,
							textWidth(this.txt3) / this.totalTextWidth,
							textWidth(this.txt4) / this.totalTextWidth];
		this.rects = [];
		for (let i = 0; i < 4; i++) {
			let o = 0; // o = x position offset.
			for (let n = 0; n < i; n++) { o += this.proportions[i - n - 1] * this.dims.x }
			let oVect = createVector(o, 0);
			oVect.add(this.pos);
			this.rects.push(new content_rect(	this.proportions[i] * this.dims.x,
												this.dims.y,
												oVect,
												this.texts[i],
												false,
												"",
												this.color1, this.color2,
												this.color3, this.color4,
												this.uoh));
		}
	}
	place() {
		for (let index in this.rects) {
			let o = 0; // o = position relative to what rect it is.
			for (let n = 0; n < index; n++) { o += this.proportions[index - n - 1] * this.dims.x }
			let oVect = createVector(o, 0);
			oVect.add(this.pos);
			this.rects[index].mod = true;
			this.rects[index].pos = oVect;
			this.rects[index].place();
			if (index < 4) {
				strokeWeight(5*tw);
				line(oVect.x + this.proportions[index + 1] / 2, oVect.y,
					oVect.x + this.proportions[index + 1] / 2, oVect.y + this.dims.y / 3);
			}
		}
	}
	testHover() {
		for (let index in this.rects) {
			this.rects[index].testHover();
		}
	}
}
// END META CONTAINER