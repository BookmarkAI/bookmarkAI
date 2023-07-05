from starlette.middleware.base import BaseHTTPMiddleware, Request, Response
import re

class CleanPathMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        scope = request.scope
        path = scope.get("path")
        cleaned_path = re.sub(r"/+", "/", path) # removes duplicate slashes
        if cleaned_path != path:
            scope["path"] = cleaned_path
        response: Response = await call_next(request)
        return response