
const fs = require('fs');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template.js');

// const mockData = {
//   name: 'Svetlana',
//   github: 'etaSveta',
//   confirmAbout: true,
//   about:
//     'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
//   projects: [
//     {
//       name: 'Run Buddy',
//       description:
//         'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//       languages: ['HTML', 'CSS'],
//       link: 'https://github.com/etaSveta/run-buddy',
//       feature: true,
//       confirmAddProject: true
//     },
//     {
//       name: 'Taskinator',
//       description:
//         'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//       languages: ['JavaScript', 'HTML', 'CSS'],
//       link: 'https://github.com/etaSveta/taskinator',
//       feature: true,
//       confirmAddProject: true
//     },
//     {
//       name: 'Taskmaster Pro',
//       description:
//         'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//       languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
//       link: 'https://github.com/etaSveta/taskmaster-pro',
//       feature: false,
//       confirmAddProject: true
//     },
//     {
//       name: 'Robot Gladiators',
//       description:
//         'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
//       languages: ['JavaScript'],
//       link: 'https://github.com/etaSveta/robot-gladiators',
//       feature: false,
//       confirmAddProject: false
//     }
//   ]
// };

// const pageHTML = generatePage(nameUser, github);

// fs.writeFile('index.html', pageHTML, err => {
//   if (err) throw err;
  
//   console.log('Portfolio Complete! Check out index.html to see the output');
// });

const promptUser = () => {
return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!')
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'Gihub',
      message: 'Enter your github username',
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log('Please enter your github username!')
          return false
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some info about yourself: ',
      when: ({ confirmAbout }) => confirmAbout
    }
  ]);
};

const promptProject = portfolioData => {
  // if there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }

  console.log(`
  ==================
  Add a New Project
  ==================
  `);
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?',
      validate: projectNameInput => {
        if (projectNameInput) {
          return true;
        } else {
          console.log('What is the name of your project?')
          return false
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (required)',
      validate: projectDescription => {
        if (projectDescription) {
          return true;
        } else {
          console.log('Provide a description of the project (required)')
          return false
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'Link',
      message: 'Enter the github link to your project. (Required)',
      validate: githubLink => {
        if (githubLink) {
          return true;
        } else {
          console.log('Enter the github link to your project. (Required)')
          return false
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    }, 
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
      
    }
    else {
      return portfolioData;
    }
  });
};

promptUser()
.then(promptProject)
.then(portfolioData => {
  const pageHTML = generatePage(portfolioData);

  fs.writeFile('./index.html', pageHTML, err => {
     if (err) throw new Error(err);
    
     console.log('Portfolio Complete! Check out index.html to see the output');
   });
  });
  

  
  
  
  
