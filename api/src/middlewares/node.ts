import { OptionalHandler } from "elysia";
import { NodeDTO } from "$models";

// export const nodeMiddlewares = new Elysia({ name: "node@middlewares" })
//   .use(nodeDto)
//   .guard({ body: "node.dto" })
//   .derive(({ set, body, params }) => {
//     const validateBody = () => {
//       const { name, userId } = body;
//       if (!name || name.length === 0) {
//         set.status = 404;
//         return { message: "Please provide the name!" };
//       }
//       if (!userId) {
//         set.status = 404;
//         return { message: "Unknown node owner!" };
//       }
//     };
//     const isIntParams = () => {
//       const { id } = params;
//       const regex = new RegExp(/[0-9]/);
//       if (!regex.test(id)) {
//         set.status = 406;
//         return { message: "Invalid params type!" };
//       }
//     };
//     return { validateBody, isIntParams };
//   });

export const isIntParams: OptionalHandler<any, any> = ({ params, set }) => {
  const { id } = params;
  const regex = new RegExp(/[0-9]/);
  if (!regex.test(id)) {
    set.status = 406;
    throw new Error("Invalid params type!");
  }
};

export const validateBody: OptionalHandler<any, any> = ({ body, set }) => {
  const { name, userId } = body as typeof NodeDTO.properties;
  if (!name || name.length === 0) {
    set.status = 404;
    throw new Error("Please provide the name!");
  }
  if (!userId) {
    set.status = 404;
    throw new Error("Unknown node owner!");
  }
};
