const page = [...document.getElementsByClassName("main")];

function changeStep() {
	try {
		page.forEach((item, index) => {
			item.getElementsByClassName("button")[0].addEventListener("click", () => {
				const valid = [...item.querySelectorAll("input")];
				const check = valid.every((item) => item.checkValidity());
				if (check && index < 2) {
					item.classList.remove("block");
					item.classList.add("hidden");
					page[index + 1].classList.remove("hidden");
					page[index + 1].classList.add("block");
					item.classList.add("animate-slidein");
				}
			});
		});
	} catch (error) {
		console.log(error);
	}
}

function backStep() {
	try {
			page[2].getElementsByClassName("back")[0].addEventListener("click", () => {
				page[2].classList.remove("block");
				page[2].classList.add("hidden");
				page[2 - 1].classList.remove("hidden");
				page[2 - 1].classList.add("block");
				page[2 - 1].classList.add("animate-slidein");
			});
	} catch (error) {
		console.log(error);
	}
}

changeStep();
backStep();

const submit = document.querySelector("form");
const pw = document.querySelector("#password");
const check_pw = document.querySelector("#check_password");
const msg = document.querySelector(".message");
console.log(submit);

submit.addEventListener("submit", (e) => {
	e.preventDefault();
	if (pw.value === check_pw.value) {
		const valid = [...submit.querySelectorAll("input")];
		const check = valid.every((item) => item.checkValidity());
		if (check) {
			submit.submit();
		}
	} else {
		msg.innerHTML = "Password do not match";
	}
});
