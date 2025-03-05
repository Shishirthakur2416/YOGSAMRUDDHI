import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogForm from '../components/BlogForm';
import { useParams } from 'react-router-dom'; // Assuming you're using react-router for routing


function EditBlog() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { slug } = useParams(); // Get blog ID from URL params


    const fetchBlogData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/blogs/${slug}`);
            console.log(response);
            setData(response.data.blog); // Assuming the response contains the blog data
        } catch (error) {
            setError('Failed to fetch blog data');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        fetchBlogData();
    }, []); // This effect will run when the `id` parameter changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {/* Only pass data to BlogForm if it's fetched successfully */}
            {data && <BlogForm isEdit={true} data={data} />}
        </div>
    );
}

export default EditBlog;
