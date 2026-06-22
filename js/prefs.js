(() => {
	const btn = document.getElementById("prefsBtn");
	const menu = document.getElementById("prefsMenu");
	if (!btn || !menu) return;

	function close() {
		menu.classList.add("hidden");
		btn.setAttribute("aria-expanded", "false");
	}

	function open() {
		menu.classList.remove("hidden");
		btn.setAttribute("aria-expanded", "true");
	}

	function toggle() {
		if (menu.classList.contains("hidden")) open();
		else close();
	}

	btn.addEventListener("click", (e) => {
		e.stopPropagation();
		toggle();
	});

	document.addEventListener("click", (e) => {
		if (menu.classList.contains("hidden")) return;
		if (menu.contains(e.target) || btn.contains(e.target)) return;
		close();
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") close();
	});

	menu.addEventListener("click", (e) => {
		if (e.target.closest("button")) close();
	});
})();
