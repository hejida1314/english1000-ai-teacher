const fs = require("fs");
const path = require("path");

const source = fs.readFileSync(path.join(__dirname, "..", "src", "data", "course.ts"), "utf8");

const expected = [
  'phase: "Dreaming English Beginner"',
  'phase: "Dreaming English Intermediate"',
  'phase: "Bluey Season 1"',
  'phase: "Peppa Pig"',
  'phase: "TED-Ed"',
  'phase: "Modern Family"'
];

let last = -1;
for (const marker of expected) {
  const index = source.indexOf(marker);
  if (index === -1) {
    throw new Error(`Missing phase: ${marker}`);
  }
  if (index < last) {
    throw new Error(`Phase order is wrong near: ${marker}`);
  }
  last = index;
}

console.log("Course phase order verified:");
console.log("1. Dreaming English Beginner");
console.log("2. Dreaming English Intermediate");
console.log("3. Bluey Season 1");
console.log("4. Peppa Pig");
console.log("5. TED-Ed");
console.log("6. Modern Family");
