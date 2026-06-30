const groupButtons = document.getElementsByClassName("greyed-out");
let idList = ["musicselected", "codeselected", "interactiveselected", "liveselected"];
let selectableNodes = {
	"musicselected"			: `
		<div class="main-block half-width no-min-height">
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
	`,

	"codeselected"			: `
		<div class="banner thin centered even-spaced wrap-overflow">
			<p class="greyed-out">~ code ~</p>
		</div>
	`,

	"interactiveselected"	: `
		<div class="banner thin centered even-spaced wrap-overflow">
			<p class="greyed-out">~ interactive audio ~</p>
		</div>
	`,

	"liveselected"			: `
		<div class="banner thin centered even-spaced wrap-overflow">
			<p class="greyed-out">~ live audio ~</p>
		</div>
	`
};

console.log(groupButtons);


// set up some stuff with the categories
for(let i=0; i < 4; i++) {
	
	// connect each parent so that its children are highlighted when it's hovered.
	let parentElem = groupButtons[i].parentElement;
	parentElem.addEventListener(
		"mouseenter", 
		(event) => {
			groupButtons[i].style.color = "white";
		}
	);
	parentElem.addEventListener(
		"mouseleave", 
		(event) => {
			groupButtons[i].style.color = "grey";
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
}