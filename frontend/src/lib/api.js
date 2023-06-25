export const deleteBookmarks = (idsToDelete, foldersToDelete, user) => {
    fetch(
        `${BASE_URL}/batch-delete`,
        {
            method: 'POST',
            body: JSON.stringify({ documents: idsToDelete, folders: foldersToDelete || [] }),
            headers: {
                'X-UID': user.uid,
                'Content-Type': 'application/json'
            }
        }
    ).then(response => {
        if (response.ok) {
            console.log('Successfully deleted bookmarks');
        } else {
            throw new Error('Request failed');
        }
    })
}