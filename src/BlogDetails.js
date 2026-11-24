import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "./config/supabaseClient";

const BlogDetails = () => {
    const { id } = useParams();
    const history = useHistory();
    const [blog, setBlog] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            const { data, error } = await supabase
                .from('blogs')
                .select()
                .eq('id', id)
                .single();

            if (error) {
                setFetchError('Could not fetch that blog');
                setBlog(null);
                console.log(error);
            }
            if (data) {
                setBlog(data);
                setFetchError(null);
            }
        }

        fetchBlog();
    }, [id]);

    const handleClick = async () => {
        const { error } = await supabase
            .from('blogs')
            .delete()
            .eq('id', blog.id);

        if (error) {
            console.log(error);
        } else {
            history.push('/');
        }
    }

    return (
        <div className="blog-details">
            { fetchError && (<p>{ fetchError }</p>) }
            { blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                    <div>{ blog.body }</div>
                    <button onClick={handleClick}>delete</button>
                </article>
            )}
        </div>
    );
}

export default BlogDetails;
