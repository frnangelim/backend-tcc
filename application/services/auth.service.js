// Models
const { User, Role } = require("../models");

// Services
const { internalError, badRequest } = require("../services/rest.service");

// Constants
const secret = "xl0nt4r10x";

// Libraries
const { compareSync } = require("bcryptjs");
const { verify, sign } = require("jsonwebtoken");

/**
 * Valida o token enviado no header 'authorization'
 */
async function verifyToken(token) {
  const decoded = verify(token, process.env.APP_SECRET || secret);
  if (!decoded || !decoded.id) throw new Error("Authentication failed.");

  return await User.findOne({
    where: { id: decoded.id },
    include: [{ model: Role, as: "roles" }],
  });
}

/**
 * Verifica se um email e senha são válidos para algum usuário.
 */
async function login(body) {
  try {
    if (!body.email) {
      throw new Error("Email não fornecido.");
    } else if (!body.password) {
      throw new Error("Senha não fornecida.");
    }

    const user = await User.findOne({
      where: { email: body.email },
      include: [{ model: Role, as: "roles" }],
    });

    if (!user || !compareSync(body.password, user.password)) {
      throw new Error("Usuário e/ou senha incorretos.");
    }

    let jwt = generateJWT(user);
    delete user.dataValues["password"];

    return {
      user: user,
      jwt: jwt,
    };
  } catch (error) {
    throw error;
  }
}

/**
 * Retorna um JSON Web token para um usuário
 */
function generateJWT(user) {
  return sign({ id: user.id }, process.env.APP_SECRET || secret);
}

module.exports = {
  verifyToken,
  login,
};
