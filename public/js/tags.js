document.addEventListener('DOMContentLoaded', async () => {
  const tagList = document.getElementById('tag-list');
  const greeting = document.getElementById('greeting');
  const editTagForm = document.getElementById('edit-tag-form');
  let userId;

  // Fetch user info and tags from the API
  const fetchUserTags = async () => {
    const response = await fetch('/user-info');
    const userInfo = await response.json();
    userId = userInfo.id;

    // Set the greeting
    greeting.textContent = `Hello, ${userInfo.username}`;

    // Fetch tags
    const tagsResponse = await fetch('/user/tags');
    const tags = await tagsResponse.json();

    // Display tags
    // Sort tags by updatedAt in descending order
    tags.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    tagList.innerHTML = tags.map(tag => `
      <div class="list-group-item bg-dark">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h5 class="mb-1 text-light">${tag.name}</h5>
            <p class="mb-1 text-light">Color: <span style="border: 2px solid ${tag.color}; padding: 2px 10px; border-radius: 5px;">${tag.color}</span></p>
          </div>
          <div>
            <button class="btn btn-primary edit-tag" data-tag-id="${tag.id}" data-toggle="modal" data-target="#editTagModal">Edit</button>
            <button class="btn btn-danger delete-tag" data-tag-id="${tag.id}">Delete</button>
          </div>
        </div>
      </div>
    `).join('');

    // Add event listeners for edit and delete buttons
    document.querySelectorAll('.edit-tag').forEach(button => {
      button.addEventListener('click', (e) => {
        const tagId = e.target.getAttribute('data-tag-id');
        const tag = tags.find(t => t.id == tagId);
        document.getElementById('edit-tag-name').value = tag.name;
        document.getElementById('edit-tag-color').value = tag.color;
        document.getElementById('edit-tag-id').value = tag.id;
        $('#editTagModal').modal('show');
      });
    });

    document.querySelectorAll('.delete-tag').forEach(button => {
      button.addEventListener('click', async (e) => {
        const tagId = e.target.getAttribute('data-tag-id');
        const response = await fetch(`/tags/${tagId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          fetchUserTags();
        } else {
          alert('Failed to delete tag');
        }
      });
    });
  };

  // Update an existing tag
  editTagForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const tagId = document.getElementById('edit-tag-id').value;
    const name = document.getElementById('edit-tag-name').value;
    const color = document.getElementById('edit-tag-color').value;

    const tagData = { name, color };

    const response = await fetch(`/tags/${tagId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tagData)
    });

    if (response.ok) {
      $('#editTagModal').modal('hide');
      editTagForm.reset();
      fetchUserTags();
    } else {
      alert('Failed to update tag');
    }
  });

  fetchUserTags();
});