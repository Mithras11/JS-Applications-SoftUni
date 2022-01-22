import { showPost } from "./toggle.js";
import { e } from "./dom.js";

let main;
let topicNameInput;
let userNameInput;
let postTextInput;

let topicName;
let userName;
let postText;
let time;

export function setUpNewPost(mainTarget, topicTarget, userTarget, postTarget) {
    main = mainTarget;
    topicNameInput = topicTarget;
    userNameInput = userTarget;
    postTextInput = postTarget;
}


let postBtn;
let cancelBtn;

export function setUpPostButtons(postBntTarget, cancetlBtnTarget) {
    postBtn = postBntTarget;
    cancelBtn = cancetlBtnTarget;

    postBtn.addEventListener('click', createNewPost);
    cancelBtn.addEventListener('click', clearInput);
}


export async function createNewPost(event) {
    event.preventDefault();

    topicName = topicNameInput.value;
    userName = userNameInput.value;
    postText = postTextInput.value;
    time = new Date();;

    if (topicName === '' || userName === '' || postText === '') {
        return alert('All fields are required!')
    }

    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topicName, userName, postText, time })
        })

        if (!response.ok) {
            throw new Error;
        }

        const data = await response.json();

        const newPost = e('div', { className: 'topic-title' },
            e('div', { className: 'topic-container' },
                e('div', { className: 'theme-content' },
                    e('div', { className: 'theme-title' },
                        e('div', { className: 'theme-name-wrapper' },
                            e('div', { className: 'theme-name' },
                                e('h2', {}, topicName)))),
                    e('div', { className: 'comment' },
                        e('p', {}, `Date: <time>${time.toISOString()}</time>`),
                        e('p', {}, `Username: <span>${userName}</span>`))),
                e('button', { className: 'toggle' }, 'Show more')));

        main.appendChild(newPost);

        newPost.setAttribute('id', data._id);

        newPost.querySelector('.toggle').addEventListener('click', showPost);

        topicNameInput.value = '';
        userNameInput.value = '';
        postTextInput.value = '';

    } catch (error) {
        alert(error.message)
    }
}

export function clearInput(event) {
    event.preventDefault(); //??

    topicNameInput.value = '';
    userNameInput.value = '';
    postTextInput.value = '';
}