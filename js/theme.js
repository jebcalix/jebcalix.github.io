window.JB_Theme = {
	STORAGE_KEY: "jb_theme",
	MODES: ["light", "dark", "system"],

	resolve(mode) {
		if (mode === "system") {
			return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		}
		return mode === "light" ? "light" : "dark";
	},

	apply(mode) {
		const resolved = this.resolve(mode);
		document.documentElement.setAttribute("data-theme", resolved);
		document.documentElement.setAttribute("data-theme-mode", mode);
		document.documentElement.style.colorScheme = resolved;
		this.setPressed(mode);
	},

	setPressed(mode) {
		for (const m of this.MODES) {
			const el = document.getElementById(`theme-${m}`);
			if (!el) continue;
			const active = m === mode;
			el.setAttribute("aria-pressed", String(active));
			el.classList.toggle("theme-active", active);
		}
	},

	setMode(mode) {
		if (!this.MODES.includes(mode)) mode = "system";
		localStorage.setItem(this.STORAGE_KEY, mode);
		this.apply(mode);
	},

	init() {
		const saved = localStorage.getItem(this.STORAGE_KEY) || "system";
		this.apply(saved);

		window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
			const current = localStorage.getItem(this.STORAGE_KEY) || "system";
			if (current === "system") this.apply("system");
		});

		for (const m of this.MODES) {
			const el = document.getElementById(`theme-${m}`);
			if (!el) continue;
			el.addEventListener("click", () => this.setMode(m));
		}
	},
};
