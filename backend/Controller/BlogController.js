const Blog = require('../Models/Blog')
// const { populate } = require('../Models/User')

// exports.createBlog = async (req, res) => {
//     const { title, excerpt, body, slug } = req.body
//     try {
//         const blog = new Blog({ title, excerpt, body, slug })
//         await blog.save()

//         return res.status(201).json({ msg: 'New Post Created' })
//     } catch (e) {
//         return res.status(500).json({ msg: 'Post is not created' })
//     }
// }

exports.createBlog = async (req, res) => {
    try {

        const { title, excerpt, body, slug } = req.body;

        // Ensure the user creating the blog is logged in
        if (!req.user || !req.user._id) {
            return res.status(401).json({ msg: 'Unauthorized. Please log in.' });
        }
        if (req.file) {

            const flePath = req.file.path
            const newBlog = new Blog({
                title,
                excerpt,
                body,
                slug,
                blogImg: flePath,
                createdBy: req.user._id,
            });

            const savedBlog = await newBlog.save();
            res.status(201).json(savedBlog);
        } else {
            return res.status(400).json({ msg: 'Please upload a file/blog Image' })
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error can not save blog' });
    }
};


exports.readAllBlog = async (req, res) => {
    try {
        const blogs = await Blog.find({}).populate('createdBy')

        return res.json({ msg: 'Get blogs', blogs })
    } catch (e) {
        return res.status(500).json({ msg: 'Blogs could not be retrieved' })
    }
}
exports.readUsersAllBlog = async (req, res) => {
    try {

        const blogs = await Blog.find({ createdBy: req.user._id });

        if (blogs.length === 0) {
            return res.status(404).json({ msg: 'No blogs foundd for this user' });
        }

        return res.json({ msg: 'User blogs retrieved successfully', blogs });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: 'Blogs could not be retrieved' });
    }
};

exports.readOneBlog = async (req, res) => {
    const slug = req.params.slug
    try {
        const blog = await Blog.findOne({ slug: slug }).populate('createdBy')
        console.log(blog)

        return res.json({ msg: 'Get one blogs', blog })
    } catch (e) {
        return res.status(500).json({ msg: 'Blog could not be retrieved' })
    }
}

exports.updateOneBlog = async (req, res) => {

    console.log("Updating Blog")
    const slug = req.params.slug
    const { title, excerpt, body } = req.body
    const filePath = req.file.path



    console.log("Slug ", slug, " title ", title, " excerpt ", excerpt, " filepath ", filePath)
    try {
        if (req.user.userType == 'Admin') { await Blog.findOneAndUpdate({ slug }, { title, excerpt, body, blogImg:filePath }) }

        else if (req.user.userType == 'Editor') { await Blog.findOneAndUpdate({ slug, createdBy: req.user._id }, { title, excerpt, body, blogImg:filePath }) }
        return res.json({ msg: 'blog updated successfully' })
    } catch (e) {
        return res.status(500).json({ msg: 'blog is not updated' })
    }
}

exports.deleteOneBlog = async (req, res) => {
    const slug = req.params.slug

    try {

        if (req.user.userType == 'Admin') { await Blog.findOneAndDelete({ slug }) }

        else if (req.user.userType == 'Editor') { await Blog.findOneAndDelete({ slug, createdBy: req.user._id }) }

        return res.json({ msg: 'blog deleted successfully' })
    } catch (e) {
        return res.status(500).json({ msg: 'blog is not deleted' })
    }
}