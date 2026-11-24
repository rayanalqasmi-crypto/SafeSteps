const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
function loadTs(file, imports = {}) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const module = { exports: {} };
  const sandbox = { module, exports: module.exports, require: (name) => {
    if (name === 'lucide-react') return new Proxy({}, { get: (_, key) => key });
    if (imports[name]) return imports[name];
    throw Error('Unexpected dependency: ' + name);
  }};
  vm.runInNewContext(js, sandbox, { filename: file });
  return module.exports;
}
const { scenarios } = loadTs('src/data/scenarios.ts');
const { isValidAnswer, isCorrectAnswer } = loadTs('src/data/answerUtils.ts', { './scenarios': { scenarios } });
assert.equal(scenarios.length, 6);
const expectedCorrect = { fire: 1, firstaid: 0, injury: 1, traffic: 2, weather: 1, choking: 1 };
const ids = new Set();
let imageCount = 0;
let answerChecks = 0;
for (const scenario of scenarios) {
  assert(!ids.has(scenario.id), 'Duplicate scenario id: ' + scenario.id);
  ids.add(scenario.id);
  assert.equal(scenario.correct, expectedCorrect[scenario.id], 'Incorrect answer key for ' + scenario.id);
  assert(scenario.steps.length >= 1);
  assert(scenario.answers.length >= 2);
  assert(Number.isInteger(scenario.correct) && scenario.correct >= 0 && scenario.correct < scenario.answers.length);
  for (const entry of [scenario.title, scenario.desc, scenario.intro, scenario.question, scenario.feedback, ...scenario.steps, ...scenario.answers]) {
    assert(entry.ar?.trim() && entry.en?.trim(), 'Missing translation in ' + scenario.id);
  }
  scenario.answers.forEach((_, index) => {
    assert.equal(isValidAnswer(scenario, index), true);
    assert.equal(isCorrectAnswer(scenario, index), index === scenario.correct, `${scenario.id}: answer ${index+1}`);
    answerChecks++;
  });
  for (const invalid of [null, -1, scenario.answers.length, 1.5, NaN]) {
    assert.equal(isCorrectAnswer(scenario, invalid), false);
  }
  scenario.steps.forEach((_, index) => {
    const name = `${scenario.id}_step_${String(index+1).padStart(2,'0')}.png`;
    const img = path.join(root, 'public/images/lessons', scenario.id, name);
    assert(fs.existsSync(img), 'Missing image: ' + img);
    const bytes = fs.readFileSync(img);
    assert(bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])), 'Not a PNG: ' + img);
    imageCount++;
  });
}
console.log(`PASS: ${scenarios.length} scenarios, ${answerChecks} answer choices, ${imageCount} PNG images, AR/EN translations`);
