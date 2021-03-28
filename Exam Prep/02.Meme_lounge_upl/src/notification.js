const notificationElement = document.getElementById('errorBox');

export function notify(message) {
    
    notificationElement.innerHTML = `<span>${message}</span>`;
    notificationElement.style.display = 'block';
    setTimeout(()=> {
        notificationElement.style.display = 'none'
    }, 3000)
    
} 