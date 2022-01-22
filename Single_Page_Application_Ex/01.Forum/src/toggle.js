import { addNewComment, createCommentSection } from "./comment.js";
import { e } from "./dom.js";

export async function showPost(event) {
    event.preventDefault();

    const id = event.target.parentElement.parentElement.id;

    try {
        const response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error;
        }

        const data = await response.json();

        const commentDiv = event.target.parentElement.querySelector('.comment');

        const fullPost = e('div', { className: 'header' },
            e('img', {
                src: './static/profile.png',
                alt: 'avatar'
            }),
            e('p', {}, `<span>${data.userName}</span> posted on <time>${data.time}</time>`),
            e('p', { className: 'post-content' }, `${data.postText}`));

        commentDiv.innerHTML = '';
        commentDiv.appendChild(fullPost);

        const commentSection = createCommentSection();
        commentDiv.parentElement.appendChild(commentSection);

        commentSection.querySelector('button').addEventListener('click', addNewComment);

        const showLessBtn = e('button', { id: 'close' }, 'Show less');
        showLessBtn.addEventListener('click', showLess);

        event.target.parentElement.appendChild(showLessBtn); //adds ShowLessBtn
        event.target.remove(); // removes ShowMoreBtn


    } catch (error) {
        alert(error.message);
    }

}

export async function showLess(event) {
    event.preventDefault();

    const id = event.target.parentElement.parentElement.id;

    try {
        const response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${id}`);

        if (!response.ok) {
            throw new Error;
        }

        const data = await response.json();

        const currTopicName = data.topicName;
        const currTime = data.time;
        const currUsername = data.userName;

        const currPost = e('div', { className: 'topic-title' },
            e('div', { className: 'topic-container' },
                e('div', { className: 'theme-content' },
                    e('div', { className: 'theme-title' },
                        e('div', { className: 'theme-name-wrapper' },
                            e('div', { className: 'theme-name' },
                                e('h2', {}, `${currTopicName}`)))),
                    e('div', { className: 'comment' },
                        e('p', {}, `Date: <time>${currTime}</time>`),
                        e('p', {}, `Username: <span>${currUsername}</span>`))),
                e('button', { className: 'toggle' }, 'Show more')));


        event.target.parentElement.parentElement.replaceWith(currPost);

        currPost.setAttribute('id', data._id);
        currPost.querySelector('.toggle').addEventListener('click', showPost);


    } catch (error) {
        alert(error.message);
    }
}