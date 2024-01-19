// 		G - L - O - B - A - L -------------------------
// V - A - R - I - A - B - L - E - S ------------------
 
// S C E N E - V A R S
// states:
//	0: name
//	1: menu
//	2: about me
//	3: game music
//	4: theater
//	5: standalones
//	6: game design + programming
//	7: other art (non-music)
let siteState = 0;
let maxSiteState = 3;
let doStates = true; // when presenting content I want to temporarily stop the state machine.
let links = {}; // used for menu scene -> check setup
let mouseContext = false;
let startX, startY;
let touchStartTime;

// C O L O R S
let backCol;
let main_pink;
let theaterImage;
let standalonesImage;
let gameImage;
let programmingImage;
let artImage;
let meImage;

// D I S T A N C E S
let w; let tw; let h; let th; let a;

// T I M E R S + T R A N S I T I O N S
let timers = {};
let transitions = {};
let scrollWaitTime = 2000;
let scrollTimer;
let startTimer = 0;
let scrollDir = "DOWN";
let canScroll = true;

// return true if is supported // else return false
let isTouch = 'touchstart' in document.documentElement;

// F O N T S + T E X T
let titleFont;
let mainFont;
let openingTextOpacity = 255;
let directionText = document.getElementById('direction');

// B - U - I - L - T -----------------------------------
// 		I - N
// F - U - N - C - S -----------------------------------

// FUNC MOUSEWHEEL
function mouseWheel(e) {
	let threshold = 40;
	if (canScroll && doStates) {
		if(e.deltaY > threshold) { // down
			if (siteState == maxSiteState) { return(false); } // prevents safari from throwing a fit.
			transitions.next_scene.progress = 0;
			transitions.next_scene.tGoal = siteState + 1;
			scrollDir = "DOWN"; canScroll = false;
		}
		if(e.deltaY < -threshold) { // up
			if (siteState == 0) { return(false); } // prevents safari from throwing a fit.
			transitions.prev_scene.progress = 0;
			transitions.prev_scene.tGoal = siteState - 1;
			scrollDir = "UP"; canScroll = false;
		}
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
	let threshold = 40;
	if (canScroll && doStates && timeDiff < 200) {
		if(eY > threshold) { // down
			if (siteState == maxSiteState) { return(false); } // prevents safari from throwing a fit.
			transitions.next_scene.progress = 0;
			transitions.next_scene.tGoal = siteState + 1;
			scrollDir = "DOWN"; canScroll = false;
		}
		if(eY < -threshold) { // up
			if (siteState == 0) { return(false); } // prevents safari from throwing a fit.
			transitions.prev_scene.progress = 0;
			transitions.prev_scene.tGoal = siteState - 1;
			scrollDir = "UP"; canScroll = false;
		}
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
	standalonesImage = loadImage('images/fanfare.jpg');
	meImage = loadImage('images/me.jpg');
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
	textAlign(CENTER, CENTER);
	imageMode(CORNER);
	backCol = color(0,0,0,255);
	main_pink = color(255, 155, 155, 255);
	noStroke();
	links.game_music = new content_rect(666*tw, 293*th, 
										createVector(0,40*th), 
										"game\nmusic",
										true,
										gameImage);
	links.theater = new content_rect(333*tw, 646*th, 
										createVector(666*tw,40*th), 
										"musical\ntheatre",
										true,
										theaterImage);
	links.standalones = new content_rect(666*tw, 293*th, 
										createVector(333*tw,666*th), 
										"standalone\ncompositions",
										true,
										standalonesImage);
	links.game_design = new content_rect(333*tw, 626*th, 
										createVector(0,333*th), 
										"game\ncredits",
										true,
										programmingImage);
	links.other_art = new content_rect(333*tw, 333*th, 
										createVector(333*tw,333*th),
										"other\nart",
										true)
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
			text_preset(0); text('XENA', tw*500, th*400);
			text_preset(1); text('scroll to continue', tw*500, th*750);
			break;
		case 1:
			textSize(20*th);
			noStroke();
			fill(255,255,255,255);
			text("t i t l e   s c r e e n", tw*500, th*15);
			for (let key in links) {
				links[key].hover_test();
				links[key].place();
			}
			textSize(20*th);
			noStroke();
			fill(255,255,255,255);
			text("a b o u t   m e", tw*500, th*975);
			break;
		case 2:
			let aboutMeText = "Hi there! Welcome to my portfolio. I'm a 23-year-old music and technology student at the University for the arts in Utrecht, where I'll be graduating in may. I have a passion for multidisciplinary projects, especially video games and theatre, and use my skills in programming to supplement my skills in composition on musical performance.\n\n" +
			"My specialty is in temperate, methodical music. I like odd time signatures and keys; ideally my audience is on the edge of their seats at all times! Arrangement isn't a major concern, as I'm as well versed in working together with acoustic musicians as I am with sampling, synths and virtual orchestration. Where a faster pace is required I don't struggle to adjust, though I tend to work a little slower in relation to my lack of experience.\n\n"+
			"Where possible I prefer to work in a team, face to face- though most of my projects end up being more practically served by online cooperation. To me there's nothing more exciting than sitting with my team and discussing the next steps we're going to be taking in our project.";
			if (w > 700){ // LANDSCAPE
				text_preset(0); textSize(tw*70); strokeWeight(5);
				text('about me', tw*270, th*150);
				text_preset(1); textAlign(LEFT, TOP); textSize(tw*13 - (0.5 ** tw));
				text(aboutMeText, tw*20, th*250, tw*550);
				image(meImage, tw*600, th*100, tw*300, th*820);
			} else { // PORTRAIT
				text_preset(0); textSize(tw*180); strokeWeight(5);
				text('about me', tw*500, th*150);
				text_preset(1); textAlign(LEFT, TOP); textSize(th*20);
				text(aboutMeText, tw*40, 450*tw, tw*920);
			}
			break;
	}
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
	resizeCanvas(windowWidth, windowHeight);
	w = windowWidth;
	tw = w / 1000;
	h = windowHeight;
	th = h / 1000;
	a = w / h;
	Object.keys(transitions).forEach(key => {
		transitions[key].start_dim = [[0, 0],[windowWidth, windowHeight]]; 
		transitions[key].refresh(); });
	links.game_music = new content_rect(666*tw, 293*th, 
										createVector(0,40*th), 
										"game\nmusic",
										true,
										gameImage);
	links.theater = new content_rect(333*tw, 646*th, 
										createVector(666*tw,40*th), 
										"musical\ntheatre",
										true,
										theaterImage);
	links.standalones = new content_rect(666*tw, 293*th, 
										createVector(333*tw,666*th), 
										"standalone\ncompositions",
										true,
										standalonesImage);
	links.game_design = new content_rect(333*tw, 626*th, 
										createVector(0,333*th), 
										"game\ncredits",
										true,
										programmingImage);
	links.other_art = new content_rect(333*tw, 333*th, 
										createVector(333*tw,333*th),
										"other\nart",
										true)
}


// C - U - S - T - O - M --------------------------------------------------------
//	F - U - N - C - S -----------------------------------------------------------

// FUNC TEXT PRESET
function text_preset(setter) {
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
			if (a > 1) { textSize(tw*30) } else { textSize(tw*50) };
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
						let c = color(255,255,255,grad[2]);
						stroke(c);
						let offsetY = stepDist * this.progress;
						line(grad[0].x, grad[0].y - offsetY,
							grad[1].x, grad[1].y - offsetY);
					}
				} else if (this.dir == "UP") {
					for (let i = 0; i < this.start_dim[1][1] * 3; i++) {
						let grad = this.gradient[i];
						let c = color(255,255,255,grad[2]);
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
				rect_img = "") {
		this.w = rect_width;
		this.h = rect_height;
		this.pos = rect_pos;
		this.txt = rect_text;
		this.o = do_outline;
		this.color1 = color(0, 0, 0, 0);
		this.color2 = color(255, 255, 255, 255);
		this.color3 = color(255, 255, 255, 100);
		this.color4 = color(0, 0, 0, 255);
		this.hovered = false;
		this.lerp_state = 0;
		this.img = rect_img;
		this.transer = new transition("IN-OUT",
									"LINEAR",
									80,
									4,
									[	[this.pos.x, this.pos.y], 
										[this.pos.x + this.pos.x, this.pos.y + this.pos.y]
									])
	}
	place() {
		let rect_col = lerpColor(this.color1, this.color3, this.lerp_state);
		let txt_col = lerpColor(this.color4, this.color2, 1.0 - this.lerp_state);
		textStyle(BOLD);
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
		strokeWeight(5);
		if (!this.o) { noStroke } else { stroke(this.color2) };
		rect(this.pos.x, this.pos.y, this.w, this.h);
		// draw the text.
		text_preset(2);
		fill(txt_col);
		stroke(txt_col);
		strokeWeight(tw*1.75);
		text(this.txt, this.pos.x + this.w / 2, this.pos.y + this.h / 2);
	}
	hover_test() {
		if (winMouseX < this.pos.x + this.w && winMouseX > this.pos.x &&
			winMouseY < this.pos.y + this.h && winMouseY > this.pos.y) {
			this.hovered = true;
			if (this.lerp_state < 1.0) {
				this.lerp_state += 0.08;
			}
		} else {
			this.hovered = false;
			if (this.lerp_state > 0.0) {
				this.lerp_state -= 0.08;
			}
		}
		return (this.hovered);
	}
}