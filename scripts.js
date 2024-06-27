document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const pasteName = document.getElementById('pasteName').value;
    const creatorName = document.getElementById('creatorName').value;
    const pasteText = document.getElementById('pasteText').value;
    const icon = document.getElementById('icon').files[0];

    const formData = new FormData();
    formData.append('pasteName', pasteName);
    formData.append('creatorName', creatorName);
    formData.append('pasteText', pasteText);
    formData.append('icon', icon);

    const token = 'YOUR_GITHUB_TOKEN';
    const owner = 'YOUR_GITHUB_USERNAME';
    const repo = 'YOUR_GITHUB_REPO';

    // Create a new file in the repository
    const path = `pastes/${Date.now()}-${icon.name}`;
    const content = await fileToBase64(icon);

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: `Added new paste by ${creatorName}`,
            content: content,
        }),
    });

    if (response.ok) {
        alert('Paste uploaded successfully!');
    } else {
        alert('Failed to upload paste.');
    }
});

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
