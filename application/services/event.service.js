const RestService = require("./rest.service");
const {
  Sequelize,
  sequelize,
  Event,
  EventSlot,
  EventEnrollment,
  User,
} = require("../models");

async function getOne(user, slug) {
  try {
    let include = [
      { model: EventSlot, as: "slots" },
      { model: User, as: "owner" },
    ];

    let event = await Event.findOne({
      where: {
        slug,
      },
      include,
    });

    if (!event) {
      throw new Error("Evento não encontrada.");
    }

    if (user && user.id && event.ownerId === user.id) {
      let enrollments = await EventEnrollment.findAll({
        where: {
          eventId: event.id,
        },
      });

      return { event, enrollments };
    }

    return event;
  } catch (error) {
    throw error;
  }
}

async function getUserEvents(user) {
  try {
    const ownedEvents = await Event.findAll({
      where: {
        ownerId: user.id,
      },
      order: [["updatedAt", "desc"]],
    });

    const userEnrollments = (
      await EventEnrollment.findAll({
        where: {
          email: user.email,
        },
        order: [["updatedAt", "desc"]],
        include: [{ model: Event, as: "event" }],
      })
    ).map((e) => e.event);

    return { ownedEvents, userEnrollments };
  } catch (error) {
    throw error;
  }
}

async function getSlot(eventSlug, slotSlug) {
  try {
    let event = await Event.findOne({
      where: {
        slug: eventSlug,
      },
    });

    if (!event) {
      throw new Error("Evento não encontrada.");
    }

    let slot = await EventSlot.findOne({
      where: {
        slug: slotSlug,
        eventId: event.id,
      },
    });

    if (!slot) {
      throw new Error("Vaga não encontrada.");
    }

    return { event, slot };
  } catch (error) {
    throw error;
  }
}

async function getList(body) {
  try {
    const limit = Number(body.limit) || 10;
    const page = Number(body.page) || 1;
    const offset = limit * page - limit;
    const search = body.search;

    let count = 0;
    let items = [];
    let pages = 1;
    let where = {};

    if (body.search) {
      where = {
        [Sequelize.Op.or]: [
          { title: { [Sequelize.Op.like]: `%${body.search}%` } },
          { address: { [Sequelize.Op.like]: `%${body.search}%` } },
        ],
      };
    }

    const filters = body.filters;
    if (filters) {
      if (filters.ownerId) where["ownerId"] = filters.ownerId;

      if (filters.type) where["type"] = filters.type;

      if (filters.category) where["category"] = filters.category;

      if (filters.frequency) where["frequency"] = filters.frequency;
    }

    if (body.hotData) {
      where.date = { [Sequelize.Op.gte]: new Date() };
    }

    const data = await Event.findAndCountAll({
      limit,
      where,
      offset,
      order: [["date", body.hotData ? "asc" : "desc"]],
    });

    items = data.rows;
    count = data.count;
    pages = Math.ceil(count / limit);

    return { count, page, pages, items };
  } catch (error) {
    throw error;
  }
}

async function createEvent(body, owner, file) {
  try {
    if (file && file.buffer) body.image = file.buffer;

    console.log("aaa", body.image);

    return await sequelize.transaction(async (transaction) => {
      const event = await Event.create(
        { ...body, ownerId: owner.id, category: "OTHERS" },
        { transaction }
      );
      await createEventSlots(event.id, body.slots, transaction);

      return event;
    });
  } catch (error) {
    throw error;
  }
}

async function createEventSlots(eventId, slots, transaction) {
  if (slots) {
    let relationsIds = [];
    for (let slot of slots) {
      let rel = await EventSlot.findCreateFind({
        where: {
          name: slot.name,
          slots: slot.slots,
          eventId,
        },
        transaction,
      });
      if (rel && rel[0]) relationsIds.push(rel[0].id);
    }

    await EventSlot.destroy({
      where: {
        id: {
          [Sequelize.Op.notIn]: relationsIds,
        },
        eventId,
      },
      transaction,
    });
  }
}

async function update(data, userId, file) {
  try {
    const event = await Event.findByPk(data.id);
    if (!event) {
      throw new Error("O evento informado não existe.");
    }

    if (event.ownerId !== userId) {
      throw new Error("Usuário não é proprietário do evento");
    }
    // Tratar slugs
    // TODO Tratar redirect de slugs
    data.slug = undefined;

    if (file && file.buffer) data.image = file.buffer;
    else if (data.image) delete data.image;

    return await sequelize.transaction(async (transaction) => {
      Object.keys(data).forEach((key) => {
        if (data[key] !== undefined) {
          if (data[key] === "") event[key] = null;
          else event[key] = data[key];
        }
      });

      await createEventSlots(event.id, data.slots, transaction);

      return await event.save({ transaction });
    });
  } catch (error) {
    throw error;
  }
}

async function removeById(id, ownerId) {
  try {
    let event = await Event.findOne({ id, ownerId });
    if (!event) {
      throw new Error("Evento não encontrado");
    }

    await event.destroy();
  } catch (error) {
    throw error;
  }
}

async function createEnrollment(data) {
  try {
    const eventSlot = await EventSlot.findOne({
      where: {
        eventId: data.eventId,
        id: data.slotId,
      },
    });

    if (!eventSlot) {
      throw new Error("Vaga não encontrada");
    }

    const enrollment = await EventEnrollment.findOne({
      where: {
        eventId: data.eventId,
        slotId: data.slotId,
        [Sequelize.Op.or]: [{ email: data.email }, { phone: data.phone }],
      },
    });

    if (enrollment) {
      throw new Error(
        "Este telefone ou email já se inscreveu como voluntário para este evento."
      );
    }

    return await EventEnrollment.create({
      ...data,
      eventId: data.eventId,
      slotId: data.slotId,
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getOne,
  getUserEvents,
  getSlot,
  getList,
  createEvent,
  update,
  removeById,
  createEnrollment,
};
