document.getElementById("phone").onclick = function () {
   // Copy the text inside the text field
  navigator.clipboard.writeText("+31638762478");

  // Alert the copied text
  let answer = confirm("Phonenumber copied to clipboard! Would you like to call?")
  if (answer) {
	call(+31638762478)
  }
};

document.getElementById("mail").onclick = function () {
   // Copy the text inside the text field
  navigator.clipboard.writeText("xenaderks@gmail.com");

  // Alert the copied text
  alert("Email copied to clipboard!")
};