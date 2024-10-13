const profilequery = require('../query/profilequery.js')

exports.showProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        
        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        console.log(`Fetching profile for userId: ${userId}`);
        
        const profiledata = await profilequery.displayprofileQuery(userId)
        
        if (profiledata.userInfo.length === 0 && profiledata.recommendedBooks.length === 0) {
            return res.status(404).json({ message: 'No profile data found for this user' });
        }
        
        res.json(profiledata)
    } catch (error) {
        console.error('Error in showProfile:', error);
        res.status(500).json({ error: 'Something went wrong', details: error.message });
    }
}