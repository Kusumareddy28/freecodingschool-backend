"use strict";

const extend = require('extend');
let utils = null;
function translateError(err) {
	// Delete redundant fields that can also cause a circular dependency
	if (Number.isInteger(err)) {
		err = {
			statusCode: err
		}
	}
	//Custom Errors
	let error = {
		message: err.message || err.data && err.data.detail || null,
		statusCode: err.statusCode || 500,
		errors: err.errors || err.data || []
	}
	return error;
}

module.exports = exports = {
	/**
	 * Since Error object does not jsonify as expected, just manage regular object here for now
	 * @param message
	 * @param statusCode
	 * @returns {{message: *, statusCode: (*|number)}}
	 */
	createError: function (message, statusCode, errors) {
		let finalMessage = message;
		try { finalMessage = JSON.stringify(message) } catch (e) { }
		return {
			message: finalMessage,
			statusCode: statusCode || 500,
			errors,
		}
	},

	errorHandlingMiddleware: async function (error, req, res) {
		let mappedError = translateError(error) || {};		
		let httpStatusCode = mappedError.statusCode || 500;
		let message = mappedError
		if (httpStatusCode >= 500) {
			message = "There was an internal server error"
		}
		try {
			try {
				if (message) {
					delete message.errors.request
					delete message.errors["error@context"]
				}
			}
			catch (e) {
				if (message) {
					delete message.errors
					delete message.error
				}
			}
		}
		catch (e) {
			console.log(e);
		}

		res.status(httpStatusCode).send(message)
	}
}
