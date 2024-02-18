'use strict';

class BioTimers {
	constructor() {
		['dl', 'img', 'lyrics', 'sim1', 'sim2', 'source', 'transition', 'tt', 'zSearch'].forEach(v => this[v] = {
			id: null
		});

		this.times = [1000, 1000, 1000, 1000, 2000, 4000, 5000, 6000, 7000];
	}

	// * METHODS * //

	clear(timer) {
		if (timer) clearTimeout(timer.id);
		timer.id = null;
	}

	decelerating(p_force) {
		let counter = 0;
		this.clear(this.dl);
		const func = () => {
			this.res(p_force);
			counter++;
			if (counter < this.times.length) timer_dl();
			else this.clear(this.dl);
		};
		const timer_dl = () => {
			this.dl.id = setTimeout(func, this.times[counter]);
		};
		timer_dl();
	}

	image() {
		if (!$Bio.server) return;
		this.clear(this.img);
		this.img.id = setInterval(() => {
			bio.img.fresh();
			bio.men.fresh();
			window.NotifyOthers('bio_imgChange', 0);
		}, 1000);
	}

	res(force) {
		window.NotifyOthers('bio_getImg', force);
		if ($Bio.server) bio.img.grab(force);
	}

	tooltip() {
		this.clear(this.tt);
		this.tt.id = setTimeout(() => {
			bio.txt.deactivateTooltip();
			this.tt.id = null;
		}, 5000);
	}
}
