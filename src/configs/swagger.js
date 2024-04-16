export const swaggerConfiguration = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "API documents",
      description: "API Documentation for Coderhouse project",
    },
  },
  apis: ["src/docs/*.yaml"],
};
