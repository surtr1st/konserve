package localization

// Error Response
const (
	EMPTY_STRING              = "The value does not exist."
	NOT_FOUND                 = ""
	EMAIL_FORMAT_VIOLATED     = "Email is in the wrong format."
	USERNAME_INCORRECT        = "Unknown or null and void username."
	PASSWORD_INCORRECT        = "Password is wrong! Please verify your password again."
	TURSO_CONNECTION_ERROR    = "Failed to connect Turso!"
	DATABASE_CONNECTION_ERROR = "Failed to connect database!"
	UNAUTHORIZED              = "Unauthorized! Your token is either nonexistent or has already expired."
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
