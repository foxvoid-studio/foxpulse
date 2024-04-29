/**
 * Enumeration of notification types
 */
const NotificationType = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning'
};

/**
 * Show a notification with a specific type
 * @typedef {Object} NotificationType
 * @param {string} message - message to display in notification
 * @param {NotificationType} type - type of notification
 */
function showNotification(message, type) {
    const notification = document.getElementById("notification");
    const notification_text = document.getElementById("notificationText");

    // Update notification text and class based on type
    notification_text.textContent = message;
    notification.classList.remove("bg-green-500", "bg-red-500", "bg-yellow-500");
    switch(type) {
        case NotificationType.SUCCESS:
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case NotificationType.ERROR:
            notification.classList.add('bg-red-500', 'text-white');
            break;
        case NotificationType.WARNING:
            notification.classList.add('bg-yellow-500', 'text-gray-800');
            break;
        default:
            break;
    }

    // Show notification
    notification.classList.remove("hidden");
    notification.classList.add('animate-fadeIn');

    // Hide notification after 5 seconds
    setTimeout(() => {
        hideNotification();
    }, 5000);
}

/**
 * Hide notification
 */
function hideNotification() {
    const notification = document.getElementById("notification");

    notification.classList.remove("animate-fadeIn");
    notification.classList.add("animate-fadeOut");

    // Wait for the fade-out animation to finish before hiding the notification
    setTimeout(() => {
        notification.classList.add("hidden");
        notification.classList.remove("animate-fadeOut");
    }, 500); // The duration of the fade-out animation is 0.5 second
}

/**
 * Shortcut class for notifications
 */
class Notifications {
    static success(message) {
        showNotification(message, NotificationType.SUCCESS);
    }

    static warning(message) {
        showNotification(message, NotificationType.WARNING);
    }
    
    static error(message) {
        showNotification(message, NotificationType.ERROR);
    }
}

/* 
 * When the page is loaded, if the notification container does not exist, 
 * we create it directly in order to avoid undefined bugs
 */
document.addEventListener("DOMContentLoaded", function(event) {
    const notification_container = document.getElementById("notification-container");

    if (notification_container === null) {
        const notificationHTML = `
            <div id="notification-container" class="notification-container w-full">
                <div id="notification" class="rounded-lg p-4 shadow-md hidden w-5/6 mx-auto">
                    <span id="notificationText"></span>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML("beforeend", notificationHTML);
    }
});