(() => {
	const mobileBtn = document.getElementById("mobileMenuBtn");
	const mobileMenu = document.getElementById("mobileMenu");

	function closeMobileMenu() {
		if (!mobileBtn || !mobileMenu) return;
		mobileMenu.classList.add("hidden");
		mobileBtn.setAttribute("aria-expanded", "false");
		mobileBtn.setAttribute("aria-label", JB_I18n.getLang() === "es" ? "Abrir menú" : "Open menu");
	}

	function toggleMobileMenu() {
		if (!mobileBtn || !mobileMenu) return;
		const open = mobileMenu.classList.contains("hidden");
		mobileMenu.classList.toggle("hidden", !open);
		mobileBtn.setAttribute("aria-expanded", String(open));
		const isEs = JB_I18n.getLang() === "es";
		mobileBtn.setAttribute("aria-label", open ? (isEs ? "Cerrar menú" : "Close menu") : (isEs ? "Abrir menú" : "Open menu"));
	}

	if (mobileBtn) mobileBtn.addEventListener("click", toggleMobileMenu);
	if (mobileMenu) {
		mobileMenu.addEventListener("click", (e) => {
			if (e.target && e.target.tagName === "A") closeMobileMenu();
		});
	}

	const yearEl = document.getElementById("year");
	if (yearEl) yearEl.textContent = String(new Date().getFullYear());

	const langHooks = [
		["lang-es", "es"],
		["lang-en", "en"],
	];
	for (const [id, lang] of langHooks) {
		const el = document.getElementById(id);
		if (!el) continue;
		el.addEventListener("click", () => JB_I18n.setLang(lang));
	}

	JB_Theme.init();
	JB_I18n.apply(JB_I18n.detectDefaultLang());
})();
