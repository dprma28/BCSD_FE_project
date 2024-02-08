import React, { useState } from 'react';
import styled from 'styled-components';
import searchStore from './Store/searchStore';
import reviewStore from './Store/reviewStore';
import { modalStyles, CloseButton } from "./Styles/modalStyles"
import Modal from 'react-modal';

export default function Home() {
    const { readBookTitles, isModalOpen, setIsModalOpen } = searchStore();
    const { reviews } = reviewStore();
    const [bookIndex, setBookIndex] = useState(null);

    const BookImage = styled.div`
        float: left;
        margin: 30px 0px 30px 80px;
    `;

    const handleBookClick = (index) => {
        setBookIndex(index);
        openModal();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const deleteBook = (index) => {
        const updatedReadBookTitles = JSON.parse(localStorage.getItem("readBookTitles"));
        const updatedReviews = JSON.parse(localStorage.getItem("reviews"));

        updatedReadBookTitles.splice(index, 1);
        updatedReviews.splice(index, 1);
    
        localStorage.setItem("readBookTitles", JSON.stringify(updatedReadBookTitles));
        localStorage.setItem("reviews", JSON.stringify(updatedReviews));

        closeModal();
        window.location.reload();
    };

    const closeModal = () => {
        setBookIndex(null);
        setIsModalOpen(false);
    };

    return (
        <div>
            {readBookTitles.map((book, index) => (
                <BookImage key={index}>
                    <img src={book.image} width="150" height="220" alt={book.title} onClick={() => handleBookClick(index)}/>
                </BookImage>
            ))}

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modalStyles}
            >
                <CloseButton onClick={closeModal}>x</CloseButton>
                
                <div>
                    {bookIndex !== null && (
                        <div>
                            <h2>{readBookTitles[bookIndex].title}</h2>
                            <h4>작가 : {readBookTitles[bookIndex].author}</h4>
                            <h4>출판사 : {readBookTitles[bookIndex].publisher}</h4>
                            <h4>출간일 : {readBookTitles[bookIndex].pubdate}</h4>
                            <p>{readBookTitles[bookIndex].description}</p>
                            <h4>Book Review</h4>
                            <p>{reviews[bookIndex]}</p>
                            
                            <button onClick={() => deleteBook(bookIndex)}>Delete</button>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
}