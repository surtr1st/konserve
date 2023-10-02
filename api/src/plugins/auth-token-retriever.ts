import Elysia from "elysia";

export const authTokenRetriever = new Elysia({
  name: "tokenRetriever@services",
}).derive(({ request }) => {
  const useAuthToken = () => {
    const authHeader = request.headers.get("authorization");
    return authHeader && authHeader.split(" ")[1];
  };
  return { useAuthToken };
});
