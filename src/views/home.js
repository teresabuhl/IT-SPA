import $ from "jquery";

export const home = () => {
	const fragment = $(new DocumentFragment());

	fragment.append(``);

	return Promise.resolve(fragment);
};
