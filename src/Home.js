import React from 'react';
import Store from './Store';
import styled from 'styled-components';

export default function Home() {
    const { readBookTitles, reviews } = Store();

    return (
        <div>
            {readBookTitles.map((book, index) => (
                <BookImage key={index}>
                    <img src={book.image} width="150" height="220" alt={book.title}/>
                </BookImage>
            ))}
            {reviews.map((review, index) => (
                <div key={index}>
                    <p>{review}</p>
                </div>
            ))}
        </div>
    );
}

const BookImage = styled.div`
    float: left;
    margin: 30px 0px 30px 80px;
`;