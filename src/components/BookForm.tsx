import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBook, getBookById, updateBook } from '../services/api';

interface Book {
    title: string;
    author: string;
    pubDate: number;
    genre: string;
    pagesNumb: number
}

function BookForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [book, setBook] = useState<Book>({
        title: '',
        author: '',
        pubDate: 1900,
        genre: '',
        pagesNumb: 0
});
   
useEffect(() => {
    if (id) {
    loadBook();
    }
    }, [id]);
    const loadBook = async () => {
        try {
            const response = await getBookById(id as string);
            setBook(response.data);
        } catch (error) {
        console.error("Error loading book data", error);
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({
        ...book,
        [e.target.name]: e.target.value,
    });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (id) {
                await updateBook(id, book);
            } else {
                await createBook(book);
            }
            navigate('/');
        } catch (error) {
        console.error("Error saving book", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Título</label>
                <input
                    title="text"
                    name="title"
                    value={book.title}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Autor</label>
                <input
                    type="text"
                    name="author"
                    value={book.author}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Data de Publicação</label>
                <input
                    type="number"
                    name="pubDate"
                    value={book.pubDate}
                    onChange={handleChange}
                />
                <label>Gênero</label>
                <input
                    type="text"
                    name="genre"
                    value={book.genre}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Número de Páginas</label>
                <input
                    type="number"
                    name="pagesNumb"
                    value={book.pagesNumb}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Save</button>
        </form>
    );
}

export default BookForm;
