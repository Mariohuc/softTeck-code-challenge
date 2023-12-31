export default {
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string" },
  },
  required: ["firstName", "lastName", "email"],
} as const;
