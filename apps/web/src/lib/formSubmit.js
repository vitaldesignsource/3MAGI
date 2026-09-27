/**
 * Posts the site's forms to the PHP mail handler that ships with the build
 * (public/api/submit.php), which emails them to the editors.
 *
 * This replaces the PocketBase collections the forms used to write to — those
 * only existed while the site ran on Hostinger Horizons.
 */

const ENDPOINT = '/api/submit.php';

/** Shown when the server gives us nothing more specific. */
const GENERIC_ERROR =
	'Your message could not be sent. Please try again shortly, or email 3rdlamp@3magipress.com directly.';

/**
 * @param {'contact'|'submission'|'tip'} form
 * @param {FormData|Record<string, unknown>} payload
 * @returns {Promise<{ok: true, attachments?: number, rejected?: string[]}>}
 * @throws {Error} with a message suitable for showing to the visitor
 */
export async function submitForm(form, payload) {
	const body = payload instanceof FormData ? payload : toFormData(payload);
	body.set('form', form);

	let response;
	try {
		response = await fetch(ENDPOINT, { method: 'POST', body });
	} catch {
		// Network failure, offline, blocked — never a useful message from here.
		throw new Error(GENERIC_ERROR);
	}

	// A misconfigured deploy serves index.html for unknown paths, so a 200 is
	// not on its own proof that the handler ran.
	let data = null;
	try {
		data = await response.json();
	} catch {
		throw new Error(GENERIC_ERROR);
	}

	if (!response.ok || !data?.ok) {
		throw new Error(typeof data?.error === 'string' && data.error ? data.error : GENERIC_ERROR);
	}

	return data;
}

function toFormData(values) {
	const fd = new FormData();
	Object.entries(values || {}).forEach(([key, value]) => {
		if (value === undefined || value === null) return;
		fd.set(key, String(value));
	});
	return fd;
}

export { GENERIC_ERROR };
