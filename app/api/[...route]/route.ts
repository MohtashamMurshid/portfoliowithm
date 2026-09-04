import { apiRouteNotFoundResponse } from "@/lib/api-problems";

const notFound = (request: Request) => apiRouteNotFoundResponse(request);

export {
  notFound as GET,
  notFound as POST,
  notFound as PUT,
  notFound as PATCH,
  notFound as DELETE,
  notFound as OPTIONS,
};
