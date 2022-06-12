const toasts = document.querySelectorAll(".toast");

toasts.forEach((toast, key) => {
	button = toast.getElementsByTagName("button")[0];

	button.addEventListener("click", (e) => {
		toast.classList.remove("flex");
		toast.classList.add("hidden");
	});
});
