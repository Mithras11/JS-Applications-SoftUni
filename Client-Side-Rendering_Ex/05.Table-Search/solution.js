import { html, render } from './node_modules/lit-html/lit-html.js';

const url = 'http://localhost:3030/jsonstore/advanced/table';
const container = document.querySelector('tbody');
const inputField = document.querySelector('#searchField');
let students;

const template = (student, hasMatches) => html `
   <tr class=${hasMatches ? 'select' : ''}>
      <td>${student.firstName} ${student.lastName}</td>
      <td>${student.email}</td>
      <td>${student.course}</td>
   </tr>`;

start();


async function start() {
    students = await getStudents();
    renderData(students);

    document.querySelector('#searchBtn').addEventListener('click', onClick);
}


async function onClick() {
    renderData(students);
    inputField.value = '';
}

async function renderData(students) {

    const result = students.map(s => template(s, hasMatches(s)));
    render(result, container);
}


async function getStudents() {
    const response = await fetch(url);

    if (!response.ok) {
        const error = await response.json();
        return alert(error.message);
    }

    const data = await response.json();
    return Object.values(data);
}

function hasMatches(studentData) {
    const input = inputField.value.toLowerCase();

    if (input != '') {
        const studentInfo = Object.values(studentData).slice(0, 4);
        const matchesCount = studentInfo.filter(x => x.toLowerCase().includes(input)).length;
        const result = matchesCount > 0 ? true : false;

        return result;
    }

    return false;

}