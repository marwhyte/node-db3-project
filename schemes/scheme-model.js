const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db("schemes");
}
function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}
function findSteps(id) {
  return db("steps")
    .join("schemes", "schemes.id", "steps.scheme_id")
    .select(
      "steps.id",
      "schemes.scheme_name",
      "steps.step_number",
      "steps.instructions"
    )
    .where("schemes.id", id)
    .orderBy("steps.step_number");
}

function add(item) {
  return db("schemes").insert(item);
}
function update(id, changes) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}
function remove(id) {
  return db("schemes")
    .del()
    .where({ id });
}
