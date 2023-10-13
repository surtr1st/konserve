import { Elysia, NotFoundError, ParseError } from "elysia";
import { camelCaseToTitleCase } from "$helpers";

type OptionalErrorResponse<T> = T extends string
  ? {
      responseError?: Record<T, string>;
    }
  : never;

type TBodyValidation<
  TBodySchema,
  TSchemaKey extends keyof TBodySchema,
> = OptionalErrorResponse<TSchemaKey> & {
  requestBody: TBodySchema;
  requiredKeys: TSchemaKey[];
};

type TQueryValidation<
  TQuery,
  TQueryKey extends keyof TQuery,
> = OptionalErrorResponse<TQueryKey> & {
  requestQueries: TQuery;
  requiredKeys: TQueryKey[];
};

export const errorHandlers = new Elysia({
  name: "errorHandler@services",
}).derive(({ params }) => {
  const validateBodyProps = <TBodySchema>({
    requestBody,
    requiredKeys,
    responseError,
  }: TBodyValidation<TBodySchema, keyof TBodySchema>) => {
    for (const key of requiredKeys) {
      if (!requestBody[key]) {
        const message =
          responseError?.[key as string] ||
          `${camelCaseToTitleCase(key.toString())} is required!`;
        throw new NotFoundError(message);
      }
    }
  };

  const validateQueries = <TQuery>({
    requestQueries,
    requiredKeys,
    responseError,
  }: TQueryValidation<TQuery, keyof TQuery>) => {
    for (const key of requiredKeys) {
      if (!requestQueries[key]) {
        const message =
          responseError?.[key as string] ||
          `${camelCaseToTitleCase(key.toString())} is required!`;
        throw new NotFoundError(message);
      }
    }
  };

  const isIntParams = () => {
    const { id } = params;
    const regex = new RegExp(/[0-9]/);
    if (!regex.test(id)) {
      throw new ParseError("Invalid params type!");
    }
  };

  return { validateBodyProps, validateQueries, isIntParams };
});
