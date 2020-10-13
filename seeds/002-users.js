exports.seed = function(knex) {
  return knex("users").insert([
      { username: "Sam", password: "pass" },
      { username: "Pam", password: "pass123" },
      { username: "Tick", password: "notapass" },
  ])
}