const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  Users: prisma.users,
  Profiles: prisma.profiles,
  Recipes: prisma.Recipes,
  Articles: prisma.Articles
};
