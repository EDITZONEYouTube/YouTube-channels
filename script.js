function loadRecentVideos(channelId) {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=5&key=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const videoList = document.getElementById('channel-details');
            const videoContainer = document.createElement('div');
            videoContainer.className = 'video-list';

            // Ensure items exist in the response
            if (data.items && data.items.length) {
                data.items.forEach(item => {
                    const video = item.snippet;
                    const videoItem = document.createElement('div');
                    videoItem.className = 'video-item';

                    const thumbnail = document.createElement('img');
                    thumbnail.src = video.thumbnails.default.url;
                    thumbnail.alt = video.title;
                    videoItem.appendChild(thumbnail);

                    const details = document.createElement('div');
                    const title = document.createElement('h3');
                    title.textContent = video.title;
                    details.appendChild(title);

                    const description = document.createElement('p');
                    description.textContent = video.description || 'No description available';
                    details.appendChild(description);

                    // Ensure resourceId and videoId are present
                    const videoId = item.id.videoId;
                    if (videoId) {
                        const link = document.createElement('a');
                        link.href = `https://www.youtube.com/watch?v=${videoId}`;
                        link.textContent = 'Watch Video';
                        link.target = '_blank'; // Opens link in a new tab
                        details.appendChild(link);
                    } else {
                        const link = document.createElement('p');
                        link.textContent = 'Video ID not available';
                        details.appendChild(link);
                    }

                    videoItem.appendChild(details);
                    videoContainer.appendChild(videoItem);
                });
            } else {
                const noResults = document.createElement('p');
                noResults.textContent = 'No recent videos found.';
                videoContainer.appendChild(noResults);
            }

            videoList.appendChild(videoContainer);
        })
        .catch(error => {
            console.error('Error loading recent videos:', error);
            alert('An error occurred: ' + error.message);
        });
}
