// Advanced ES6+ JavaScript Tutorial & Interactive Demos

document.addEventListener("DOMContentLoaded", function () {
  // Populate code examples
  const codeExamples = {
    "let-const": `// let & const vs var
let name = 'Alice';
const age = 25;
let score = 100;

// Block scoping demonstration
if (true) {
    let blockScoped = 'only in this block';
    const CONSTANT = 'cannot be changed';
    var functionScoped = 'accessible outside';
}

// name = 'Bob';     // ✓ Works with let
// age = 26;         // ✗ Error with const
score = 150;         // ✓ Works with let`,

    arrow: `// Arrow functions vs regular functions
const numbers = [1, 2, 3, 4, 5];

// Traditional function
const square1 = function(x) {
    return x * x;
};

// Arrow function (concise)
const square2 = x => x * x;

// Multiple parameters
const add = (a, b) => a + b;

// Array methods with arrows
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);

console.log('Doubled:', doubled);
console.log('Evens:', evens);`,

    destructuring: `// Destructuring arrays and objects
const colors = ['red', 'green', 'blue', 'yellow'];
const [first, second, ...rest] = colors;

const person = {
    name: 'Sarah',
    age: 28,
    city: 'New York',
    job: 'Developer'
};

// Object destructuring
const { name, age, city } = person;
const { job: occupation } = person; // Rename

// Nested destructuring
const user = {
    id: 1,
    profile: {
        email: 'sarah@example.com',
        settings: { theme: 'dark' }
    }
};

const { profile: { email, settings: { theme } } } = user;`,

    spread: `// Spread and Rest operators
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Spread in arrays
const combined = [...arr1, ...arr2];
const withExtra = [0, ...arr1, 10];

// Spread in objects
const person1 = { name: 'John', age: 30 };
const person2 = { ...person1, city: 'Boston' };

// Rest in functions
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

// Rest in destructuring
const [head, ...tail] = [1, 2, 3, 4, 5];`,

    template: `// Template literals
const name = 'Alex';
const age = 32;
const hobby = 'coding';

// String interpolation
const intro = \`Hello, my name is \${name} and I'm \${age} years old.\`;

// Multiline strings
const message = \`
Welcome to our ES6+ tutorial!
Today we're learning about:
- Template literals
- String interpolation
- Multiline strings
\`;

// Expression evaluation
const price = 19.99;
const tax = 0.08;
const total = \`Total: $\${(price * (1 + tax)).toFixed(2)}\`;

// Tagged templates
function highlight(strings, ...values) {
    return strings.reduce((result, string, i) => {
        return result + string + (values[i] ? \`<mark>\${values[i]}</mark>\` : '');
    }, '');
}`,

    classes: `// ES6 Classes
class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }
    
    speak() {
        return \`\${this.name} makes a sound\`;
    }
    
    static getSpeciesCount() {
        return 'Many species exist';
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name, 'Canine');
        this.breed = breed;
    }
    
    speak() {
        return \`\${this.name} barks!\`;
    }
    
    fetch() {
        return \`\${this.name} fetches the ball\`;
    }
}

const buddy = new Dog('Buddy', 'Golden Retriever');
console.log(buddy.speak());
console.log(buddy.fetch());`,
  };

  // Populate code blocks
  Object.keys(codeExamples).forEach((key) => {
    const element = document.getElementById(`code-${key}`);
    if (element) {
      element.textContent = codeExamples[key];
    }
  });

  // Quiz functionality
  const quizForm = document.getElementById("quiz-form");
  const submitBtn = document.getElementById("submit-quiz");
  const resultDiv = document.getElementById("quiz-result");

  if (submitBtn) {
    submitBtn.addEventListener("click", function () {
      const answers = {
        q1: "const",
        q2: "destructures",
        q3: "parent",
        q4: "rest",
        q5: "backtick",
      };

      let score = 0;
      const total = Object.keys(answers).length;

      Object.keys(answers).forEach((question) => {
        const selected = quizForm.querySelector(
          `input[name="${question}"]:checked`
        );
        if (selected && selected.value === answers[question]) {
          score++;
        }
      });

      const percentage = ((score / total) * 100).toFixed(0);
      let message = `You scored ${score}/${total} (${percentage}%)! `;

      if (score === total) {
        message += "🎉 Perfect! You're an ES6+ master!";
      } else if (score >= total * 0.8) {
        message += "👍 Great job! You understand ES6+ well!";
      } else if (score >= total * 0.6) {
        message += "📚 Good start! Review the concepts and try again.";
      } else {
        message += "💪 Keep practicing! Review the lessons above.";
      }

      resultDiv.textContent = message;
    });
  }
});

// Interactive demo functions
function demoLetConst() {
  const output = document.getElementById("let-const-output");
  let demoText = "";

  try {
    let changeable = "I can be changed";
    const fixed = "I cannot be changed";

    demoText += `Initial values:\n`;
    demoText += `let changeable = '${changeable}'\n`;
    demoText += `const fixed = '${fixed}'\n\n`;

    changeable = "I was changed!";
    demoText += `After reassignment:\n`;
    demoText += `changeable = '${changeable}'\n`;
    demoText += `fixed still = '${fixed}'\n\n`;

    // Block scope demo
    if (true) {
      let blockVar = "Only exists in this block";
      demoText += `Inside block: let blockVar = '${blockVar}'\n`;
    }
    demoText += `Outside block: blockVar is not accessible (would cause ReferenceError)\n`;
  } catch (error) {
    demoText += `Error: ${error.message}\n`;
  }

  output.textContent = demoText;
}

function demoArrowFunctions() {
  const output = document.getElementById("arrow-output");

  const numbers = [1, 2, 3, 4, 5];

  // Regular function
  const regularDouble = function (x) {
    return x * 2;
  };

  // Arrow function
  const arrowDouble = (x) => x * 2;

  const regularResult = numbers.map(regularDouble);
  const arrowResult = numbers.map(arrowDouble);

  let demoText = "";
  demoText += `Original array: [${numbers.join(", ")}]\n\n`;
  demoText += `Using regular function: [${regularResult.join(", ")}]\n`;
  demoText += `Using arrow function: [${arrowResult.join(", ")}]\n\n`;

  // More examples
  const sum = (a, b) => a + b;
  const greet = (name) => `Hello, ${name}!`;

  demoText += `sum(5, 3) = ${sum(5, 3)}\n`;
  demoText += `greet('Developer') = ${greet("Developer")}\n`;

  output.textContent = demoText;
}

function demoDestructuring() {
  const output = document.getElementById("destructuring-output");

  let demoText = "";

  // Array destructuring
  const colors = ["red", "green", "blue", "yellow"];
  const [first, second, ...rest] = colors;

  demoText += `Array destructuring:\n`;
  demoText += `colors = [${colors.join(", ")}]\n`;
  demoText += `const [first, second, ...rest] = colors\n`;
  demoText += `first = '${first}'\n`;
  demoText += `second = '${second}'\n`;
  demoText += `rest = [${rest.join(", ")}]\n\n`;

  // Object destructuring
  const person = { name: "Alice", age: 25, city: "Boston" };
  const { name, age, city } = person;

  demoText += `Object destructuring:\n`;
  demoText += `person = { name: '${person.name}', age: ${person.age}, city: '${person.city}' }\n`;
  demoText += `const { name, age, city } = person\n`;
  demoText += `name = '${name}'\n`;
  demoText += `age = ${age}\n`;
  demoText += `city = '${city}'\n`;

  output.textContent = demoText;
}

function demoSpreadRest() {
  const output = document.getElementById("spread-output");

  let demoText = "";

  // Spread arrays
  const arr1 = [1, 2, 3];
  const arr2 = [4, 5, 6];
  const combined = [...arr1, ...arr2];

  demoText += `Spread operator with arrays:\n`;
  demoText += `arr1 = [${arr1.join(", ")}]\n`;
  demoText += `arr2 = [${arr2.join(", ")}]\n`;
  demoText += `combined = [...arr1, ...arr2] = [${combined.join(", ")}]\n\n`;

  // Rest parameter
  function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
  }

  const result1 = sum(1, 2, 3);
  const result2 = sum(1, 2, 3, 4, 5);

  demoText += `Rest parameter in function:\n`;
  demoText += `function sum(...numbers) { return numbers.reduce(...) }\n`;
  demoText += `sum(1, 2, 3) = ${result1}\n`;
  demoText += `sum(1, 2, 3, 4, 5) = ${result2}\n`;

  output.textContent = demoText;
}

function demoTemplates() {
  const output = document.getElementById("template-output");

  const name = "JavaScript Developer";
  const experience = 3;
  const skills = ["ES6+", "React", "Node.js"];

  let demoText = "";

  // Basic interpolation
  const intro = `Hello! I'm a ${name} with ${experience} years of experience.`;
  demoText += `Template literal interpolation:\n`;
  demoText += `name = '${name}'\n`;
  demoText += `experience = ${experience}\n`;
  demoText += `intro = \`Hello! I'm a \${name} with \${experience} years of experience.\`\n`;
  demoText += `Result: ${intro}\n\n`;

  // Expression evaluation
  const calculation = `Total skills: ${skills.length}, Average per year: ${(
    skills.length / experience
  ).toFixed(1)}`;
  demoText += `Expression evaluation:\n`;
  demoText += `skills = [${skills.join(", ")}]\n`;
  demoText += `calculation = \`Total skills: \${skills.length}, Average per year: \${(skills.length / experience).toFixed(1)}\`\n`;
  demoText += `Result: ${calculation}\n\n`;

  // Multiline
  const multiline = `Skills include:
- ${skills[0]}
- ${skills[1]}  
- ${skills[2]}`;

  demoText += `Multiline template:\n${multiline}`;

  output.textContent = demoText;
}

function demoClasses() {
  const output = document.getElementById("classes-output");

  let demoText = "";

  // Define classes
  class Vehicle {
    constructor(make, model) {
      this.make = make;
      this.model = model;
    }

    start() {
      return `${this.make} ${this.model} is starting...`;
    }

    static getType() {
      return "This is a vehicle";
    }
  }

  class Car extends Vehicle {
    constructor(make, model, doors) {
      super(make, model);
      this.doors = doors;
    }

    start() {
      return `${this.make} ${this.model} (${this.doors} doors) is starting with engine!`;
    }

    honk() {
      return `${this.make} ${this.model} goes beep beep!`;
    }
  }

  // Create instances
  const vehicle = new Vehicle("Generic", "Vehicle");
  const car = new Car("Toyota", "Camry", 4);

  demoText += `Class instantiation and inheritance:\n\n`;
  demoText += `vehicle = new Vehicle('Generic', 'Vehicle')\n`;
  demoText += `vehicle.start() = '${vehicle.start()}'\n\n`;

  demoText += `car = new Car('Toyota', 'Camry', 4)\n`;
  demoText += `car.start() = '${car.start()}'\n`;
  demoText += `car.honk() = '${car.honk()}'\n\n`;

  demoText += `Static method:\n`;
  demoText += `Vehicle.getType() = '${Vehicle.getType()}'\n`;

  output.textContent = demoText;
}
