var ghpages = require('gh-pages');

ghpages.publish(
    'public',// <-- replace yourproject with your repo name
    {
        branch: 'gh-pages',
        repo: 'https://github.com/ChiToan/ToANote.git',
        user: {
            name: 'ChiToan',
            email: 'toantoekan@gmail.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)

