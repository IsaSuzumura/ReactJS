import { useEffect, useState } from 'react';
import { getBook, deleteBook } from '../services/api';
import { Link } from 'react-router-dom';

interface Book {
    id: string;
    title: string;
    author: string;
    pubDate: number;
    genre: string;
    pagesNumb: number
    
}

function BookList() {
    const [books, setBook] = useState<Book[]>([]);
    useEffect(() => {
        loadBook();
    }, []);
    const loadBook = async () => {
    const response = await getBook();
        setBook(response.data);
    };
    const handleDelete = async (id: string) => {
        await deleteBook(id);
        loadBook();
    };
    return (
        <div>
            <h1>Book List</h1>
                <Link to="/add">Add Book</Link>
            <ul>
                    {books.map((book) => (
            <li key={book.id}>
                {book.title} - ${book.author} - {book.pubDate} - {book.pubDate} - {book.genre} - {book.pagesNumb}
                <Link to={`/edit/${book.id}`}>Edit</Link>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
            </li>
    ))}
        </ul>
    </div>
 );
}

export default BookList;