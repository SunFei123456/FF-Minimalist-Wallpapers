export const posts = [
    {
      id: 1,
      author: {
        name: 'Sarah Wilson',
        handle: 'sarahw',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop'
      },
      content: 'Just launched my new portfolio website! Check it out and let me know what you think 🚀',
      timestamp: '2h',
      likes: 142,
      comments: 28,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
      commentList: [
        {
          author: {
            name: 'Alex Chen',
            handle: 'alexc',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop'
          },
          content: 'Looks amazing! Love the clean design.',
          timestamp: '1h'
        },
        {
          author: {
            name: 'Emma Thompson',
            handle: 'emmat',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop'
          },
          content: 'Great work! The animations are so smooth.',
          timestamp: '30m'
        }
      ]
    },
    {
      id: 2,
      author: {
        name: 'Alex Chen',
        handle: 'alexc',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop'
      },
      content: 'Beautiful morning hike in the mountains. Nature never fails to inspire! 🏔️',
      timestamp: '4h',
      likes: 89,
      comments: 12,
      image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&h=400&fit=crop',
      commentList: [
        {
          author: {
            name: 'Sarah Wilson',
            handle: 'sarahw',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop'
          },
          content: 'Wow, what a view! Which trail is this?',
          timestamp: '3h'
        }
      ]
    },
    {
        id: 3,
        author: {
          name: 'Alex Chen',
          handle: 'alexc',
          avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop'
        },
        content: 'Beautiful morning hike in the mountains. Nature never fails to inspire! 🏔️',
        timestamp: '4h',
        likes: 89,
        comments: 12,
        commentList: [
          {
            author: {
              name: 'Sarah Wilson',
              handle: 'sarahw',
              avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop'
            },
            content: 'Wow, what a view! Which trail is this?',
            timestamp: '3h'
          }
        ]
      },
      {
        id: 4,
        author: {
          name: 'Alex Chen',
          handle: 'alexc',
          avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop'
        },
        content: 'Beautiful morning hike in the mountains. Nature never fails to inspire! 🏔️Beautiful morning hike in the mountains. Nature never fails to inspire! 🏔️Beautiful morning hike in the mountains. Nature never fails to inspire! 🏔️',
        timestamp: '4h',
        likes: 89,
        comments: 12,
        image: ['https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&h=400&fit=crop'],
        commentList: [
          {
            author: {
              name: 'Sarah Wilson',
              handle: 'sarahw',
              avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop'
            },
            content: 'Wow, what a view! Which trail is this?',
            timestamp: '3h'
          }
        ]
      },
      
  ];
  
  export const trends = [
    {
      id: 1,
      category: 'Technology',
      title: '#ReactJS',
      posts: '125K'
    },
    {
      id: 2,
      category: 'Business',
      title: '#Startup',
      posts: '85K'
    },
    {
      id: 3,
      category: 'Sports',
      title: '#WorldCup2024',
      posts: '200K'
    }
  ];
  
  export const suggestions = [
    {
      id: 1,
      name: 'Emma Thompson',
      handle: 'emmat',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop'
    },
    {
      id: 2,
      name: 'David Kim',
      handle: 'davidk',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop'
    },
    {
      id: 3,
      name: 'Lisa Wang',
      handle: 'lisaw',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop'
    }
  ];


