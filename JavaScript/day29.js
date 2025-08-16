// Advanced ES6+ JavaScript Tutorial & Quiz
// Dynamically inject code examples, explanations, and quiz questions

document.addEventListener('DOMContentLoaded', function() {
	// --- Code Examples & Explanations ---
	const codeExamples = {
		'let-const': [
			'// let & const',
			'let count = 10;',
			'const PI = 3.14159;',
			'count = 20; // allowed',
			'// PI = 3; // Error: Assignment to constant variable'
		].join('\n'),
		'arrow': [
			'// Arrow Functions',
			'const add = (a, b) => a + b;',
			"const greet = name => 'Hello, ' + name + '!';"
		].join('\n'),
		'spread': [
			'// Spread & Rest Operators',
			'const arr1 = [1, 2, 3];',
			'const arr2 = [...arr1, 4, 5]; // Spread',
			'function sum(...nums) { // Rest',
			'  return nums.reduce((a, b) => a + b, 0);',
			'}'
		].join('\n'),
		'destructuring': [
			'// Destructuring',
			"const user = { name: 'Alice', age: 25 };",
			'const { name, age } = user;',
			'const [first, second] = [10, 20];'
		].join('\n'),
		'classes': [
			'// Classes',
			'class Animal {',
			'  constructor(name) {',
			'    this.name = name;',
			'  }',
			'  speak() {',
			"    return this.name + ' makes a sound.';",
			'  }',
			'}',
			'class Dog extends Animal {',
			'  speak() {',
			"    return this.name + ' barks!';",
			'  }',
			'}',
			"const dog = new Dog('Rex');",
			"dog.speak(); // 'Rex barks!'"
		].join('\n'),
		'template': [
			'// Template Literals',
			'const name = "World";',
			'const msg = `Hello, ${name}!`;',
			'console.log(msg); // Hello, World!'
		].join('\n'),
		'default': [
			'// Default Parameters',
			'function greet(name = "Guest") {',
			'  return `Hello, ${name}!`;',
			'}',
			'greet(); // Hello, Guest!'
		].join('\n'),
		'promises': [
			'// Promises',
			'const fetchData = url => {',
			'  return fetch(url)',
			'    .then(res => res.json())',
			'    .catch(err => console.error(err));',
			'};'
		].join('\n'),
		'modules': [
			'// Modules (import/export)',
			'// math.js',
			'export function add(a, b) { return a + b; }',
			'// main.js',
			"import { add } from './math.js';",
			'console.log(add(2,3)); // 5'
		].join('\n')
	};

	for (const key in codeExamples) {
		const codeElem = document.getElementById('code-' + key);
		if (codeElem) codeElem.textContent = codeExamples[key];
	}
});
		'arrow': [
			'// Arrow Functions',
			'const add = (a, b) => a + b;',
			"const greet = name => 'Hello, ' + name + '!';"
		].join('\n'),
		'spread': [
			'// Spread & Rest Operators',
			'const arr1 = [1, 2, 3];',
			'const arr2 = [...arr1, 4, 5]; // Spread',
			'function sum(...nums) { // Rest',
			'  return nums.reduce((a, b) => a + b, 0);',
			'}'
		].join('\n'),
		'destructuring': [
			'// Destructuring',
			"const user = { name: 'Alice', age: 25 };",
			'const { name, age } = user;',
			'const [first, second] = [10, 20];'
		].join('\n'),
		'classes': [
			'// Classes',
			'class Animal {',
			'  constructor(name) {',
			'    this.name = name;',
			'  }',
			'  speak() {',
			"    return this.name + ' makes a sound.';",
			'  }',
			'}',
			'class Dog extends Animal {',
			'  speak() {',
			"    return this.name + ' barks!';",
			'  }',
			'}',
			"const dog = new Dog('Rex');",
			"dog.speak(); // 'Rex barks!'"
		].join('\n'),
		'template': [
			'// Template Literals',
			'const name = "World";',
			'const msg = `Hello, ${name}!`;',
			'console.log(msg); // Hello, World!'
		].join('\n'),
		'default': [
			'// Default Parameters',
			'function greet(name = "Guest") {',
			'  return `Hello, ${name}!`;',
			'}',
			'greet(); // Hello, Guest!'
		].join('\n'),
		'promises': [
			'// Promises',
			'const fetchData = url => {',
			'  return fetch(url)',
			'    .then(res => res.json())',
			'    .catch(err => console.error(err));',
			'};'
		].join('\n'),
		'modules': [
			'// Modules (import/export)',
			"// math.js",
// Advanced ES6+ JavaScript Tutorial & Quiz
// Dynamically inject code examples, explanations, and quiz questions

// --- Code Examples & Explanations ---
const codeExamples = {
let count = 10;


// Advanced ES6+ JavaScript Tutorial & Quiz
// Dynamically inject code examples, explanations, and quiz questions

document.addEventListener('DOMContentLoaded', function() {
	// --- Code Examples & Explanations ---
	const codeExamples = {
		'let-const': [
			'// let & const',
			'let count = 10;',
			'const PI = 3.14159;',
			'count = 20; // allowed',
			'// PI = 3; // Error: Assignment to constant variable'
		].join('\n'),
		'arrow': [
			'// Arrow Functions',
			'const add = (a, b) => a + b;',
			"const greet = name => 'Hello, ' + name + '!';"
		].join('\n'),
		'spread': [
			'// Spread & Rest Operators',
			'const arr1 = [1, 2, 3];',
			'const arr2 = [...arr1, 4, 5]; // Spread',
			'function sum(...nums) { // Rest',
			'  return nums.reduce((a, b) => a + b, 0);',
			'}'
		].join('\n'),
		'destructuring': [
			'// Destructuring',
			"const user = { name: 'Alice', age: 25 };",
			'const { name, age } = user;',
			'const [first, second] = [10, 20];'
		].join('\n'),
		'classes': [
			'// Classes',
			'class Animal {',
			'  constructor(name) {',
			'    this.name = name;',
			'  }',
			'  speak() {',
			"    return this.name + ' makes a sound.';",
			'  }',
			'}',
			'class Dog extends Animal {',
			'  speak() {',
			"    return this.name + ' barks!';",
			'  }',
			'}',
			"const dog = new Dog('Rex');",
			"dog.speak(); // 'Rex barks!'"
		].join('\n'),
		'template': [
			'// Template Literals',
			'const name = "World";',
			'const msg = `Hello, ${name}!`;',
			'console.log(msg); // Hello, World!'
		].join('\n'),
		'default': [
			'// Default Parameters',
			'function greet(name = "Guest") {',
			'  return `Hello, ${name}!`;',
			'}',
			'greet(); // Hello, Guest!'
		].join('\n'),
		'promises': [
			'// Promises',
			'const fetchData = url => {',
			'  return fetch(url)',
			'    .then(res => res.json())',
			'    .catch(err => console.error(err));',
			'};'
		].join('\n'),
		'modules': [
			'// Modules (import/export)',
			'// math.js',
			'export function add(a, b) { return a + b; }',
			'// main.js',
			"import { add } from './math.js';",
			'console.log(add(2,3)); // 5'
		].join('\n')
	};

	for (const key in codeExamples) {
		const codeElem = document.getElementById('code-' + key);
		if (codeElem) codeElem.textContent = codeExamples[key];
	}

	// --- Rebuild Quiz Section ---
	const quizSection = document.getElementById('quiz');
	quizSection.innerHTML = '';
	const quizTitle = document.createElement('h2');
	quizTitle.textContent = 'ES6+ Quiz';
	quizSection.appendChild(quizTitle);

	const quizForm = document.createElement('form');
	quizForm.id = 'quiz-form';
	quizSection.appendChild(quizForm);

	const quizQuestions = [
		{
			question: 'Which keyword prevents reassignment?',
			options: ['let', 'var', 'const', 'function'],
			answer: 'const'
		},
		{
			question: 'What is the output of: const add = (a, b) => a + b; add(2,3);',
			options: ['"23"', '5', 'undefined', 'Error'],
			answer: '5'
		},
		{
			question: 'Which operator is used to copy all elements of an array?',
			options: ['...', '==', '=>', '&&'],
			answer: '...'
		},
		{
			question: 'How do you extract the property "name" from object {name: "Bob", age: 30}?',
			options: ['const name = obj.name;', 'const { name } = obj;', 'obj[name];', 'let name = obj;'],
			answer: 'const { name } = obj;'
		},
		{
			question: 'Which class method is called when creating an instance?',
			options: ['constructor', 'init', 'create', 'setup'],
			answer: 'constructor'
		},
		{
			question: 'Which syntax allows multi-line strings and variable interpolation?',
			options: ['Template literals', 'Arrow functions', 'Destructuring', 'Rest operator'],
			answer: 'Template literals'
		},
		{
			question: 'How do you set a default parameter value in a function?',
			options: ['function fn(param = 1)', 'function fn(param)', 'let param = 1', 'const param = 1'],
			answer: 'function fn(param = 1)'
		},
		{
			question: 'Which ES6 feature helps avoid callback hell?',
			options: ['Promises', 'Classes', 'Spread', 'Modules'],
			answer: 'Promises'
		},
		{
			question: 'How do you import a function from another file in ES6?',
			options: ['import { fn } from "./file.js"', 'require("./file.js")', 'include "file.js"', 'load("file.js")'],
			answer: 'import { fn } from "./file.js"'
		}
	];

	quizQuestions.forEach(function(q, idx) {
		var div = document.createElement('div');
		div.className = 'quiz-question';
		var optionsHtml = q.options.map(function(opt) {
			return '<label><input type="radio" name="q' + idx + '" value="' + opt + '"> ' + opt + '</label>';
		}).join('<br>');
		div.innerHTML = '<h4>Q' + (idx+1) + ': ' + q.question + '</h4>' + optionsHtml;
		quizForm.appendChild(div);
	});

	quizForm.innerHTML += '<button type="submit">Submit Quiz</button>';

	const quizResult = document.createElement('div');
	quizResult.id = 'quiz-result';
	quizSection.appendChild(quizResult);

	quizForm.addEventListener('submit', function(e) {
		e.preventDefault();
		var score = 0;
		quizQuestions.forEach(function(q, idx) {
			var selected = '';
			var radios = quizForm.querySelectorAll('input[name="q' + idx + '"]:checked');
			if (radios.length > 0) {
				selected = radios[0].value;
			}
			if (selected === q.answer) score++;
		});
		quizResult.textContent = 'You scored ' + score + ' out of ' + quizQuestions.length + '!';
		quizResult.style.color = (score === quizQuestions.length) ? '#22c55e' : '#2563eb';
	});
});
		question: 'Which class method is called when creating an instance?',
		options: ['constructor', 'init', 'create', 'setup'],
		answer: 'constructor'
	}
];

const quizForm = document.getElementById('quiz-form');
quizQuestions.forEach((q, idx) => {
	const div = document.createElement('div');
	div.className = 'quiz-question';
	div.innerHTML = `<h4>Q${idx+1}: ${q.question}</h4>` +
		q.options.map(opt => `<label><input type="radio" name="q${idx}" value="${opt}"> ${opt}</label>`).join('<br>');
	quizForm.appendChild(div);
});

quizForm.innerHTML += '<button type="submit">Submit Quiz</button>';

quizForm.addEventListener('submit', function(e) {
	e.preventDefault();
	let score = 0;
	quizQuestions.forEach((q, idx) => {
		const selected = quizForm[`q${idx}`].value;
		if (selected === q.answer) score++;
	});
	const result = document.getElementById('quiz-result');
	result.textContent = `You scored ${score} out of ${quizQuestions.length}!`;
	result.style.color = score === quizQuestions.length ? '#22c55e' : '#2563eb';
});
