package localization

// Error Response
const (
	EMPTY_STRING              = "The value is not visible."
	NOT_FOUND                 = ""
	EMAIL_FORMAT_VIOLATED     = "Invalid format of email."
	USERNAME_INCORRECT        = "Invalid or inexistent username."
	PASSWORD_INCORRECT        = "Password is incorrect! Please re-check your password again."
	TURSO_CONNECTION_ERROR    = "Failed to connect Turso!"
	DATABASE_CONNECTION_ERROR = "Failed to connect database!"
	UNAUTHORIZED              = "Unauthorized! Your token has been expired or does not exist."
)

// Validate Response
const (
	MISSING_EMAIL       = "Email is empty! Please provide it!"
	MISSING_USERNAME    = "Username is empty! Please provide it!"
	MISSING_PASSWORD    = "Password is empty!"
	MISSING_NODE_NAME   = "Node name is empty!"
	MISSING_NODE_OWNER  = "Unknown node owner!"
	INVALID_PARAMS_TYPE = "Params should be a number value!"
)
