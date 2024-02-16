import React, { useState } from 'react';
import styled from 'styled-components';
import useSearchStore from "./Store/searchStore";
import useReviewStore from "./Store/reviewStore";
import useStarStore from "./Store/starStore";
import { modalStyles, CloseButton, ModalButton } from "./Styles/modalStyles"
import Modal from 'react-modal';

export default function Home() {
    const { readBookTitles, isModalOpen, setIsModalOpen, dates } = useSearchStore();
    const { reviews } = useReviewStore();
    const { stars } = useStarStore();
    const [bookIndex, setBookIndex] = useState(null);

    const handleBookClick = (index) => {
        setBookIndex(index);
        openModal();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const deleteBook = (index) => {
        const newArrangeTitles = JSON.parse(localStorage.getItem("readBookTitles"));
        const newArrangeReviews = JSON.parse(localStorage.getItem("reviews"));
        const newArrangeDates = JSON.parse(localStorage.getItem("dates"));
        const newArrangeStars = JSON.parse(localStorage.getItem("stars"));

        newArrangeTitles.splice(index, 1);
        newArrangeReviews.splice(index, 1);
        newArrangeDates.splice(index, 1);
        newArrangeStars.splice(index, 1);
    
        localStorage.setItem("readBookTitles", JSON.stringify(newArrangeTitles));
        localStorage.setItem("reviews", JSON.stringify(newArrangeReviews));
        localStorage.setItem("dates", JSON.stringify(newArrangeDates));
        localStorage.setItem("stars", JSON.stringify(newArrangeStars));

        closeModal();
        window.location.reload();
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
                <CloseButton onClick={closeModal}>Close</CloseButton><br/>
                
                <div>
                    {bookIndex !== null && (
                        <div>
                            <h2>{readBookTitles[bookIndex].title}</h2>
                            <h4>작가 : {readBookTitles[bookIndex].author}</h4>
                            <h4>출판사 : {readBookTitles[bookIndex].publisher}</h4>
                            <h4>작성일 : {dates[bookIndex]}</h4>

                            <h4>별점 {stars[bookIndex]}</h4>
                            <h4>Book Review</h4>
                            <p>{reviews[bookIndex]}</p>
                            
                            <ModalButton onClick={() => deleteBook(bookIndex)}>Delete</ModalButton>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
}

const BookImage = styled.div`
    float: left;
    margin: 30px 0px 30px 80px;
`;