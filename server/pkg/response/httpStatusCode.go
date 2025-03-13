package response

const (
	ErrorBadRequest          = 40000
	ErrorUnauthorized        = 40001
	ErrorForbidden           = 40003
	ErrorNotFound            = 40004
	ErrorMethodNotAllowed    = 40005
	ErrorConflict            = 40009
	ErrorInternalServerError = 50000
	SuccessOK                = 20000
	SuccessCreated           = 20001
	SuccessUpdated           = 20002
	SuccessDeleted           = 20003
	SuccessNoContent         = 20004
)

var msg = map[int]string{
	ErrorBadRequest:          "Bad Request",
	ErrorUnauthorized:        "Unauthorized",
	ErrorForbidden:           "Forbidden",
	ErrorNotFound:            "Not Found",
	ErrorMethodNotAllowed:    "Method Not Allowed",
	ErrorConflict:            "Conflict",
	ErrorInternalServerError: "Internal Server Error",
	SuccessOK:                "OK",
	SuccessCreated:           "Created",
	SuccessUpdated:           "Updated",
	SuccessDeleted:           "Deleted",
	SuccessNoContent:         "No Content",
}
