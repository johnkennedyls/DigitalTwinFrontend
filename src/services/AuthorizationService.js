import jwt from "jsonwebtoken";

export const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, { algorithms: ["RS256"] });

    return decoded ;
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return null;
  }
};
