// // START custom audio control styling START
// import lottieWeb from 'https://esm.sh/lottie-web';

// const playIconContainer = document.getElementById('play-icon');
// let state = 'play';

// const animation = lottieWeb.loadAnimation({
//   container: playIconContainer,
//   path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/pause/pause.json',
//   renderer: 'svg',
//   loop: false,
//   autoplay: false,
//   name: "Demo Animation",
// });

// animation.goToAndStop(14, true);

// playIconContainer.addEventListener('click', () => {
//     if(state === 'play') {
//         animation.playSegments([14, 27], true);
//         state = 'pause';
//     } else {
//         animation.playSegments([0, 14], true);
//         state = 'play';
//     }
// });
// // END custom audio control styling END





let groupButtons = document.getElementsByClassName("greyed-out");
var groupArray = [];
for(let i = 0; i < groupButtons.length; i++){
	groupArray.push(groupButtons[i]);
}
let idList = ["musicselected", "codeselected", "interactiveselected", "liveselected"];
let selectableNodes = {
	"musicselected"			: `
		<div class="main-block half-width no-min-height" id="start">
			<p class="sub-block full-width">Cat & Mice</p>
			<audio controls class="full-width">
				<source src="works/Cat_and_Mice.mp3" type="audio/mpeg"></source>
			</audio>
			<p>
				A standalone piece created for solo cello. <a href="C&M.html" class="centered highlighted">More about Cat & Mice...</a>
			</p>
		</div>

		<div class="main-block half-width no-min-height">
			<p class="sub-block full-width">Cogs</p>
			<audio controls class="full-width">
				<source src="works/cogs_preview_05.mp3" type="audio/mpeg"></source>
			</audio>
			<p>
				A standalone piece created for brass orchestra. <a href="COG.html" class="centered highlighted">More about Cogs...</a>
			</p>
		</div>

		<div class="main-block half-width no-min-height">
			<p class="sub-block full-width">01011000, Four moods:</p>
			<audio controls class="full-width">
				<source src="works/01011000_safe.mp3" type="audio/mpeg"></source>
			</audio>
			<audio controls class="full-width">
				<source src="works/01011000_unsafe.mp3" type="audio/mpeg"></source>
			</audio>
			<audio controls class="full-width">
				<source src="works/01011000_unsafe.mp3" type="audio/mpeg"></source>
			</audio>
			<p>
				01011000 is a play about gender.</br>
				<a href="X.html" class="centered highlighted">More about 01011000...</a>
			</p>
		</div>

		<div class="main-block half-width no-min-height">
			<p class="sub-block full-width">Surreality Check, Four variations on a theme:</p>
			<audio controls class="full-width">
				<source src="works/Lobby_Main_Day1_Full.wav" type="audio/wav"></source>
			</audio>
			<audio controls class="full-width">
				<source src="works/Lobby_Cerb_Day1_Full.ogg" type="audio/ogg"></source>
			</audio>
			<audio controls class="full-width">
				<source src="works/Lobby_Death2_Day1_Full.wav" type="audio/wav"></source>
			</audio>
			<audio controls class="full-width">
				<source src="works/Lobby_Vampire_Day1_Full.ogg" type="audio/ogg"></source>
			</audio>
			<p>Surreality Check is the first project by my company, <a href="https://absurdityinteractive.net" class="highlighted">Absurdity; Interactive.</a> 
				</br>
				<a href="SRC.html" class="centered highlighted">More about Surreality Check...</a>
			</p>
		</div>
		
		<div class="main-block half-width no-min-height">
			<p class="sub-block full-width">Unnamed Ghost Game</p>
			<audio controls class="full-width">
				<source src="works/ghost_rhythm_game_t01.wav" type="audio/wav"></source>
			</audio>
			<audio controls class="full-width">
				<source src="works/ghost_rhythm_game_t03.wav" type="audio/wav"></source>
			</audio>
			<p>
				Music for an unfinished game. <a href="UGG.html" class="centered highlighted">More about Unnamed Ghost Game...</a>
			</p>
		</div>
		
		<div class="main-block half-width no-min-height">
			<p class="sub-block full-width">Internship</p>
			<audio controls class="full-width">
				<source src="works/EgyptianCyberPunk_V3.mp3" type="audio/mpeg"></source>
			</audio>
			<audio controls class="full-width">
				<source src="works/ChebRinLoop_V2_Not_Corrected.wav" type="audio/wav"></source>
			</audio>
			<p>
				Music from my internship. <a href="MYS.html" class="centered highlighted">More about my internship music...</a>
			</p>
		</div>
		
		<div class="main-block half-width no-min-height">
			<p class="sub-block full-width">Beasts Awakening</p>
			<audio controls class="full-width">
				<source src="works/BeastsAwakening.mp3" type="audio/mpeg"></source>
			</audio>
			<p>
				Big, boomy sibelius track from my HKU days. <a href="BAW.html" class="centered highlighted">More about Beasts Awakening...</a>
			</p>
		</div>
		
		<div class="main-block half-width no-min-height">
			<p class="sub-block full-width">The Jabberwock</p>
			<audio controls class="full-width">
				<source src="works/TheJabberwock-Jaar3.mp3" type="audio/mpeg"></source>
			</audio>
			<p>
				A music-theatrical production I made based on the eponymous poëm. <a href="TJW.html" class="centered highlighted">More about the Jabberwock...</a>
			</p>
		</div>
		
		<div class="main-block half-width no-min-height">
			<p class="sub-block full-width">The Unbearable Well</p>
			<audio controls class="full-width">
				<source src="works/UnbearableWell_MainMenu.mp3" type="audio/mpeg"></source>
			</audio>
			<p>
				Some music from a years-old gamejam. <a href="TUW.html" class="centered highlighted">More about the Unbearable Well...</a>
			</p>
		</div>
		
		<div class="main-block half-width no-min-height">
			<p class="sub-block full-width">My youtube channel</p>
			<a class="false-p highlighted" style="line-height:1;" href="https://www.youtube.com/@CTwithT">
				My youtube channel, where I post in bursts and sometimes it's good!
			</a>
		</div>

		<div class="banner thin centered even-spaced wrap-overflow">
			<a class="greyed-out" style="line-height:1;" href="#categoryButtons">
				</br></br></br>
				~ back to top ~
			</a>
		</div>
	`,

	"codeselected"			: `
		<div class="main-block half-width no-min-height" id="start">
			<p class="sub-block full-width no-vert-padding">Surreality Check</p>
			<p class="sub-block full-width greyed-out no-vert-padding">videogame</p>
			<p>Surreality Check is the first project by my company, <a href="https://absurdityinteractive.net" class="highlighted">Absurdity; Interactive.</a> 
				I was responsible for about half the code, handling the implementation of specific features whilst leaving the big picture architecture to another 
				programmer on the team. 
				<a href="SRC.html" class="centered highlighted">More about Surreality Check...</a>
			</p>
		</div>

		<div class="main-block half-width no-min-height">
			<p class="sub-block full-width no-vert-padding">Alone</p>
			<p class="sub-block full-width greyed-out no-vert-padding">videogame</p>
			<p>A solo project where I was, among other things, responsible for all of the code. 
				<a href="ALN.html" class="centered highlighted">More about Alone...</a>
			</p>
		</div>

		<div class="main-block half-width no-min-height">
			<p class="sub-block full-width no-vert-padding">Change AutoParser</p>
			<p class="sub-block full-width no-vert-padding greyed-out">corporate automation</p>
			<p>The AutoParser was an initiative I undertook while working as an Outbound B2B sales representative for Marktplaats through Change-CX. </br></br>
				I noticed it took upwards of 21 clicks and 12 mouse movements to gather user data, which was needed for each call we made. This added up 
				to major employee fatigue and lower productivity. </br></br>
				Using python I whipped up a small always-on-top window that brought clicks down to 5 per call, with 4 mouse movements. This brought
				my own calls-per-day average up from 23 to 44. Due to obvious security concerns, I unfortunately no longer have access to the code or 
				documentation, but upon request I could hand over references still employed at <a href="https://change-cx.com/" class="centered highlighted">Change-CX</a> 
				to confirm the effectiveness of this program.
			</p>
		</div>

		<div class="banner thin centered even-spaced wrap-overflow">
			<a class="greyed-out" style="line-height:1;" href="#categoryButtons">
				</br></br></br>
				~ back to top ~
			</a>
		</div>
	`,

	"interactiveselected"	: `
		<div class="main-block half-width no-min-height" id="start">
			<p class="sub-block full-width no-vert-padding">Surreality Check</p>
			<p class="sub-block full-width greyed-out no-vert-padding">videogame</p>
			<p>Surreality Check is the first project by my company, <a href="https://absurdityinteractive.net" class="highlighted">Absurdity; Interactive.</a> 
				I cover this under "music" too. The interactivity takes a bit longer to explain, so I'd invite you to  
				<a href="SRC.html" class="centered highlighted">check out its sidepage.</a>
			</p>
		</div>

		<div class="main-block half-width no-min-height">
			<p class="sub-block full-width no-vert-padding">Alone</p>
			<p class="sub-block full-width greyed-out no-vert-padding">videogame</p>
			<p>A solo project with some simple interactive music. This is as basic as vertical density reduction to make a player feel increasingly... Well, ya know. </br>
				<a href="ALN.html" class="centered highlighted">More about Alone...</a>
			</p>
		</div>

		<div class="banner thin centered even-spaced wrap-overflow">
			<a class="greyed-out" style="line-height:1;" href="#categoryButtons">
				</br></br></br>
				~ back to top ~
			</a>
		</div>
	`,

	"liveselected"			: `
		<div class="main-block half-width no-min-height" id="start">
			<p class="sub-block full-width no-vert-padding">Limbus</p>
			<p class="sub-block full-width greyed-out no-vert-padding">theater</p>
			<p>A ten-minute short play, for which I helped to compose, record, and produce the music. I also helped set up all equipment and manned the audio booth day-of.
				<a href="LIM.html" class="centered highlighted">More about Limbus...</a>
			</p>
		</div>

		<div class="main-block half-width no-min-height">
			<p class="sub-block full-width no-vert-padding">All the Isles of Europe</p>
			<p class="sub-block full-width greyed-out no-vert-padding">theater</p>
			<p>An hour-long play about national identity, inclusion and exclusion, and the unique place borders play in European countries.</br>
				<a href="AIE.html" class="centered highlighted">More about All the Isles of Europe...</a>
			</p>
		</div>

		<div class="banner thin centered even-spaced wrap-overflow">
			<a class="greyed-out" style="line-height:1;" href="#categoryButtons">
				</br></br></br>
				~ back to top ~
			</a>
		</div>
	`
};

// take out greyed out fields that aren't in the idList. This is inefficient, but I was curious
// how the filter function worked in js so I did it anyway. Shouldn't cause noticable load
// delay anyway.
groupArray = groupArray.filter((el) => {
	let tempIdList = el.id.split(" ");
	for(let n = 0; n < 4; n++) {
		console.log(el, el.id);
		if (tempIdList.includes(idList[n])) {
			return(true);
		}
	} // implicit else
	return(false);
});


// set up some stuff with the categories
for(let i=0; i < 4; i++) {
	
	// connect each parent so that its children are highlighted when it's hovered.
	let parentElem = groupArray[i].parentElement;
	
	parentElem.addEventListener(
		"mouseenter", 
		(event) => {
			groupArray[i].style.color = "white";
		}
	);
	parentElem.addEventListener(
		"mouseleave", 
		(event) => {
			groupArray[i].style.color = "grey";
		}
	);
	
	// when parentElem is clicked, display the corresponding category.
	parentElem.addEventListener(
		"click",
		(event) => { categoryClicked(idList[i]); }
	);
}


function categoryClicked(prompt) {
	for(let i = 0; i < 4; i++) {
		if(prompt == idList[i]) {
			let field = document.getElementById("displayField");
			field.innerHTML = selectableNodes[idList[i]];
		}
	}

	window.location.href = "#start";
}