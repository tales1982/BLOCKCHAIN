import { useState } from 'react';
import {  Form } from './stiled';

const AddBook = () => {
    const [nameBook, setNameBook] = useState("");
    const [priceBook, setPriceBook] = useState(0);

    const handleNameChange = (e) => setNameBook(e.target.value);
    const handlePriceChange = (e) => setPriceBook(e.target.value);

    return (

        <Form>
            <label>
                Enter the book name:
                <input
                    type="text"
                    value={nameBook}
                    onChange={handleNameChange}
                />
            </label>

            <label>
                Enter the price of the book:
                <input
                    type="number"
                    value={priceBook}
                    onChange={handlePriceChange}
                />
            </label>

            <p>Book name: {nameBook}</p>
            <p>Book price: {priceBook}</p>
        </Form>

    );
};

export default AddBook;
