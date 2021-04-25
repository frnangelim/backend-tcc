const bcrypt = require("bcryptjs");
const { User, Event } = require("../models");

async function getUser(slug) {
  try {
    const user = await User.findOne({
      where: {
        slug,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrada.");
    }

    const ownedEvents = await Event.findAll({
      where: {
        ownerId: user.id,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
}

/**
 * Cadastra um novo usuário no sistema.
 */
async function getAuthenticatedUser(userId) {
  try {
    let user = await User.findByPk(userId);

    if (!user) {
      throw new Error("Usuário inexistente");
    }
    // Removendo o password do retorno
    user.password = undefined;

    return user;
  } catch (error) {
    throw error;
  }
}

async function getOne(slug) {
  try {
  } catch (error) {
    throw error;
  }
}

/**
 * Cadastra um novo usuário no sistema.
 */
async function create({ email, password, fullName, shortName }) {
  try {
    // Verificando se usuário já existe
    if (await User.findOne({ where: { email } })) {
      throw new Error("O usuário informado já está cadastrado.");
    }

    // Encriptando a senha informada
    password = await bcrypt.hash(password, 8);

    const data = { email, password, fullName, shortName };
    const user = await User.create(data);
    // Removendo o password do retorno
    user.password = undefined;

    return user;
  } catch (error) {
    throw error;
  }
}

async function update(body, userId, files) {
  try {
    const user = await User.findByPk(userId);

    const profileImageIndex = files.findIndex(
      (f) => f.originalname === "profileImage"
    );
    const coverImageIndex = files.findIndex(
      (f) => f.originalname === "coverImage"
    );

    if (profileImageIndex >= 0)
      body.profileImage = files[profileImageIndex].buffer;
    else if (body.profileImage) delete body.profileImage;
    if (coverImageIndex >= 0) body.coverImage = files[coverImageIndex].buffer;
    else if (body.coverImage) delete body.coverImage;

    // Mapeando propriedades para atualizar
    Object.keys(body).forEach((key) => {
      if (body[key] !== undefined) {
        if (body[key] === "") user[key] = null;
        else user[key] = body[key];
      }
    });

    await user.save();

    // Removendo o password do retorno
    user.password = undefined;

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getUser,
  getAuthenticatedUser,
  create,
  update,
};
