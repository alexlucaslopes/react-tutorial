import { useState, useEffect } from "react";
import BlogList from "./BlogList";
import supabase from "./config/supabaseClient";

const Home = () => {
    const [fetchError, setFetchError] = useState(null);
    const [blogs, setBlogs] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            const { data, error } = await supabase
                .from('blogs')
                .select();

            if (error) {
                setFetchError('Could not fetch the blogs');
                setBlogs(null);
                console.log(error);
            }
            if (data) {
                setBlogs(data);
                setFetchError(null);
            }
        }

        fetchBlogs();
    }, []);

    return (
        <div className="home">
            { fetchError && (<p>{ fetchError }</p>) }
            { blogs && (
                <BlogList blogs={blogs} title="All Blogs!" />
            )}
        </div>
    );
}

export default Home;
