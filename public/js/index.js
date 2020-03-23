function createNewRoom() {
    let roomName = document.getElementById('newRoomName').value;
    if(!roomName.trim()) {
        alert('Invalid Filed Data');
        return;
    }
    localStorage.setItem('roomName', roomName);
    window.location.href = '/chat.html';
}

function joinRoom() {
    const payload = {
        roomName : document.getElementById('existingRoomName').value,
        roomId : document.getElementById('roomId').value
    };

    if(!payload.roomName.trim() || !payload.roomId.trim()) {
        alert('Invalid Filed Data');
        return;
    }

    localStorage.setItem('newRoomPayload', JSON.stringify(payload));
    window.location.href = '/chat.html';
}