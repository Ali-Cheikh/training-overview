
// This would typically connect to your backend API
document.addEventListener('DOMContentLoaded', function () {
    // Mock data - replace with actual API call
    const mockWaitlistUsers = [
        { email: 'user1@example.com', name: 'User One', image: null },
        { email: 'user2@domain.com', name: null, image: null },
        { email: 'user3@test.com', name: 'Third User', image: 'https://i.pravatar.cc/150?u=user1@test.com' }
    ];

    const avatarsContainer = document.getElementById('waitlist-avatars');
    const countElement = document.getElementById('waitlist-count');

    // Clear fallback avatars
    avatarsContainer.innerHTML = '';

    // Update count
    countElement.textContent = mockWaitlistUsers.length + '+';

    // Create avatars for each user (limit to 3 for display)
    mockWaitlistUsers.slice(0, 3).forEach(user => {
        const avatar = document.createElement('div');
        avatar.className = 'w-10 h-10 rounded-full flex items-center justify-center text-white font-medium overflow-hidden';

        if (user.image) {
            // Show profile image if available
            avatar.innerHTML = `<img src="${user.image}" alt="${user.name || user.email}" class="w-full h-full object-cover">`;
        } else {
            // Fallback to initial with gradient background
            const initial = user.name
                ? user.name.charAt(0).toUpperCase()
                : user.email.charAt(0).toUpperCase();

            // Generate consistent gradient based on email hash
            const colors = [
                'from-primary-400 to-primary-600',
                'from-purple-500 to-pink-600',
                'from-yellow-400 to-orange-500',
                'from-green-400 to-teal-600',
                'from-red-400 to-pink-600'
            ];
            const hash = Array.from(user.email).reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const colorIndex = hash % colors.length;

            avatar.className += ` bg-gradient-to-br ${colors[colorIndex]}`;
            avatar.textContent = initial;
        }

        avatarsContainer.appendChild(avatar);
    });
});

/*
For production, you would:
1. Create an API endpoint that returns waitlist users (e.g., /api/waitlist)
2. Replace the mock data with a real fetch:
 
fetch('/api/waitlist')
    .then(response => response.json())
    .then(data => {
        // Process real data here
    });
*/
