(() => {
	const root = document.documentElement.getAttribute("data-app");
	if (!root || !window.JB_APPS || !window.JB_APPS[root]) return;

	const app = window.JB_APPS[root];
	const playUrl = `https://play.google.com/store/apps/details?id=${app.packageId}`;

	function render(lang) {
		const copy = app[lang] || app.en;
		const t = (key) => JB_I18n.t(key, lang);

		document.title = `${copy.title} — JEB Studios`;

		const titleEl = document.getElementById("app-title");
		const taglineEl = document.getElementById("app-tagline");
		const descEl = document.getElementById("app-desc");
		const iconEl = document.getElementById("app-icon");
		const featuresEl = document.getElementById("app-features");
		const tagsEl = document.getElementById("app-tags");
		const playEl = document.getElementById("app-play");
		const privacyEl = document.getElementById("app-privacy");

		if (titleEl) titleEl.textContent = copy.title;
		if (taglineEl) taglineEl.textContent = copy.tagline;
		if (descEl) descEl.textContent = copy.desc;
		if (iconEl) {
			iconEl.src = app.icon;
			iconEl.alt = copy.title;
		}
		if (featuresEl) {
			featuresEl.innerHTML = copy.features
				.map((f) => `<li class="flex gap-2"><span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400"></span><span>${f}</span></li>`)
				.join("");
		}
		if (tagsEl) {
			tagsEl.innerHTML = app.tags
				.map((tag) => `<span class="site-pill-wrap rounded-full border px-3 py-1 text-xs site-muted">${tag}</span>`)
				.join("");
		}
		if (playEl) playEl.href = playUrl;
		if (privacyEl) {
			if (app.privacy) {
				privacyEl.href = app.privacy;
				privacyEl.classList.remove("hidden");
			} else {
				privacyEl.classList.add("hidden");
			}
		}
	}

	document.addEventListener("jb:lang", (e) => render(e.detail.lang));
	render(JB_I18n.getLang());
})();
