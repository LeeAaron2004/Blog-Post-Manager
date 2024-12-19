const fetchDataBtn = document.getElementById('fetchDataBtn');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const postForm = document.getElementById('post-form');
const dataList = document.getElementById('dataList');

fetchDataBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const posts = await response.json();
        posts.forEach(post => addDataToList(post));
    } catch (error) {
        console.error('Failed to fetch posts:', error);
    }
});


postForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const body = contentInput.value.trim();

    if (!title || !body) {
        alert('Both title and content are required.');
        return;
    }

    const newPost = { title, body, userId: 1 };

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost)
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const createdPost = await response.json();
        addDataToList(createdPost);
        postForm.reset();
    } catch (error) {
        console.error('Failed to add new post:', error);
    }
});

function addDataToList(post) {
    const listItem = document.createElement('li');
    listItem.textContent = ` ${post.title}, ${post.body}`;
    dataList.appendChild(listItem);
}

function displayPosts(posts) {
    const dataList = document.getElementById('dataList');
    dataList.innerHTML = '';

    posts.forEach((post, index) => {
        const postElement = document.createElement('li');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <h4>${post.content}</h4>
            <button class="edit-btn" data-index="${index}">Edit</button>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        dataList.appendChild(postElement);
    });
}

// Add event listeners to the edit and delete buttons
document.getElementById('dataList').addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const postId = e.target.dataset.index;
       // editdaw(index);
    } else if (e.target.classList.contains('delete-btn')) {
        const postId = e.target.dataset.index;
        // Call a function to delete the post
        deletePost(index);
    }
});

// Example functions to edit and delete posts
function editdaw(index) {
    // Get the post to edit
    const post = posts[index];
    // Open a modal or a form to edit the post
    // Update the post in the database or the posts array
    console.log(`Editing post ${index}`);
}

function deletePost(index) {
    // Get the post to delete
    const post = posts[index];
    // Remove the post from the database or the posts array
    console.log(`Deleting post ${index}`);
}
function addDataToList(post) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <h3>${post.title}</h3>
        <h4>${post.body}</h4>
        <button class="edit-btn" data-id="${post.id}">Edit</button>
        <button class="delete-btn" data-id="${post.id}">Delete</button>
    `;
    dataList.appendChild(listItem);
}
document.getElementById('dataList').addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const postId = e.target.dataset.id;
        // Call a function to edit the post
        editdaw(postId);
    } else if (e.target.classList.contains('delete-btn')) {
        const postId = e.target.dataset.id;
        // Call a function to delete the post
        deletePost(postId);
    }
});
async function editdaw(postId) {
    // Prompt for new title and content
    const newTitle = prompt('Edit title:');
    const newContent = prompt('Edit content:');
    
    if (newTitle !== null && newTitle !== '' && newContent !== null && newContent !== '') {
        try {
            // Fetch the existing post to get its current data
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const post = await response.json();

            // Update the post with the new title and content
            const updateResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...post, title: newTitle, body: newContent }), // Update title and body
            });

            if (updateResponse.ok) {
                const updatedPost = await updateResponse.json();
                // Update the UI with the new title and content
                const listItem = dataList.querySelector(`li button[data-id="${postId}"]`).parentNode;
                const titleElement = listItem.querySelector('h3'); // Select the <h3> element
                const contentElement = listItem.querySelector('h4'); // Select the <h4> element
                titleElement.textContent = updatedPost.title; // Update the title in the UI
                contentElement.textContent = updatedPost.body; // Update the content in the UI
                alert(`Post ID ${postId} updated successfully.`);
            } else {
                alert('Failed to update. Please try again.');
            }
        } catch (error) {
            console.error('Error updating post:', error);
        }
    } else {
        alert('Both title and content are required.');
    }
}

/*
function editPost(postId) {
    currentPostId = postId;
        .then(post => {
            // Open a modal or a form to edit the post
            titleInput.value = post.title;
            contentInput.value = post.body;

            // Update the post in the database or the posts array
            postForm.addEventListener('submit', async (event) => {
                event.preventDefault()
                const updatedPost = { title: updatedTitle, body: updatedBody, userId: 1 };
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updatedPost)
                    });

                    if (!response.ok) throw new Error(`Error: ${response.status}`);

                    // Update the post in the list
                    const listItem = dataList.querySelector(`li button[data-id="${postId}"]`).parentNode;
                    listItem.innerHTML = `
                        <h3>ID: ${updatedPostResponse.id}, Title: ${updatedPostResponse.title}</h3>
                        <p>Body: ${updatedPostResponse.body}</p>
                        <button class="edit-btn" data-id="${updatedPostResponse.id}">Edit</button>
                        <button class="delete-btn" data-id="${updatedPostResponse.id}">Delete</button>

*/

function deletePost(postId) {
    // Remove the post from the database or the posts array
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            console.log(`Deleted post ${postId}`);
            // Remove the post from the list
            const listItem = dataList.querySelector(`li button[data-id="${postId}"]`).parentNode;
            dataList.removeChild(listItem);
        })
        .catch(error => console.error('Failed to delete post:', error));
}