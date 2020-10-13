exports.seed = function(knex) {
  return knex("users").insert([
      { username: "Abby", password: "password" },
      { username: "Timmy", password: "frodo777" },
      { username: "Jimmy", password: "taco_king89" },
  ]).then(() => console.log("\n== Seed data for users table added. ==\n"));
}