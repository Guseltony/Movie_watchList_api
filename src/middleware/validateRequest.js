export const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body)

    if()
  }
}