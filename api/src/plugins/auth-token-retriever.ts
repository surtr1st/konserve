import Elysia from "elysia";

export const authTokenRetriever = new Elysia({
  name: "tokenRetriever@services",
}).derive(({ request }) => {
  const useAuthToken = () => {
    const authHeader = request.headers.get("authorization");
    return {
      accessToken: authHeader && authHeader.split(" ")[1],
      userId: authHeader && authHeader.split(" ")[2],
      secretCode: authHeader && authHeader.split(" ")[3],
    };
  };
  return { useAuthToken };
});
