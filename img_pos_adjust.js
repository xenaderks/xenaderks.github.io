let img = window.document.getElementById("main-img");
let main = window.document.getElementById("main-content");
let startOffset = img.style.marginLeft;

console.log("Found main background image element:\n", img)
console.log("Found main content element:\n", main)

function place_image() {
	if (window.innerWidth <= 835) {
		main.style.width = String(100) + "vw";
		return;
	} else {
		main.style.width = String(70) + "vw";
	}
	let el = img;
	let pix_vw = window.innerWidth / 100;
	
	// always move image to 15% windowwidth offsetLeft.
	let el_offset = pix_vw*15 - (el.offsetWidth / 2);
	el.style.left = String(el_offset) + "px";
}

place_image(img);

addEventListener("resize", (event) => place_image());