package localization

// Error Response
const (
	EMPTY_STRING              = "The value does not exist."
	EMAIL_FORMAT_VIOLATED     = "Email is in the wrong format."
	USERNAME_INCORRECT        = "Unknown or null and void username."
	PASSWORD_INCORRECT        = "Password is wrong! Please verify your password again."
	TURSO_CONNECTION_ERROR    = "Failed to connect Turso!"
	DATABASE_CONNECTION_ERROR = "Failed to connect database!"
	UNAUTHORIZED              = "Unauthorized! You need authentication token to proceed."
	VERIFY_STATE_LOCKED       = "You've been locked for 10 minutes due to incorrect secret code verification over 3 times!"
	EMAIL_EXISTED             = "This email has already existed!"
	USERNAME_EXISTED          = "This username has already existed!"
)

// Validate Response
const (
	MISSING_EMAIL                = "Email is empty! Please provide it!"
	MISSING_USERNAME             = "Username is empty! Please provide it!"
	MISSING_PASSWORD             = "Password is empty!"
	MISSING_NODE_NAME            = "Node name is empty!"
	MISSING_NODE_OWNER           = "Unknown node owner!"
	MISSING_LEAF_OWNER           = "Unknown leaf owner!"
	MISSING_LEAF_USERNAME        = "Username is missing! Please provide it!"
	INVALID_PARAMS_TYPE          = "Params should be a number value!"
	MISMATCH_SECRET_CODE         = "Your secret code is incorrect!"
	NONEXISTENT_OR_EXPIRED_TOKEN = "Your token is either nonexistent or has already expired!"
)
