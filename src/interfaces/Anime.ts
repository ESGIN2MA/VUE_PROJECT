export interface Anime {
	id: number;
	url: string;
	images: {
		jpg: {
			image_url: string;
			small_image_url: string;
			large_image_url: string;
		};
	};
	trailer: {
		url: string;
		embed_url: string;
		images: {
			image_url: string;
			small_image_url: string;
			medium_image_url: string;
			large_image_url: string;
			maximum_image_url: string;
		};
	};
	title: string;
	episodes: number;
	score: number;
	rank: number;
	synopsis: string;
	genres: {
		name: string;
	}[];
}
