import React from "react";
import "./Styles/search.css"
import searchStore from './Store/searchStore';
import reviewStore from './Store/reviewStore';
import { searchBook } from "./Api";
import { modalStyles, ReviewContainer, ModalTextarea, ModalButton, CloseButton } from "./Styles/modalStyles"
import Modal from 'react-modal';

export default function Search() {
    const { query, setQuery, 
            searchResult, setSearchResult, 
            readBookTitle, setReadBookTitle, setReadBookTitles,
            isModalOpen, setIsModalOpen } = searchStore();
    const { review, setReview, setReviews } = reviewStore();

    const handleSearch = async () => {
        if(query.trim() === '') {
            alert("책 제목을 입력하세요.");
            return;
        }

        const result = await searchBook(query);

        if(result) {
            setSearchResult(result);
        }
    };

    const handleBookClick = (book) => {
        setReadBookTitle(book);
        openModal();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleReviewSubmit = () => {
        if (review.trim() === '') {
            alert("리뷰를 입력하세요.");
            return;
        } else {
            setReadBookTitles(readBookTitle);
            setReviews(review);
            setReview('');
            setQuery('');
            closeModal();
        }
    };
    
    return (
        <div>
            <div className="searchContainer">
                <input className="searchInput" 
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="책 제목을 입력하세요"
                />
                <div className="searchButton" onClick={handleSearch}>🔍︎</div>
            </div>

            {searchResult && (
                <div className="bookContainer">
                    {searchResult.map((book) => (
                        <div className="bookInformation" key={book.link} onClick={() => handleBookClick(book)}>
                            <div className="bookImage">
                                <img src={book.image} width="150" height="230" alt={book.title}/>
                            </div>

                            <div className="bookDetails">
                                <p>제목 : {book.title}</p>
                                <p>작가 : {book.author}</p>
                                <p>출판사 : {book.publisher}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modalStyles}
            >
                <CloseButton onClick={closeModal}>Close</CloseButton>

                <h2>{readBookTitle.title}</h2>
                <h4>작가 : {readBookTitle.author}</h4>
                <h4>출판사 : {readBookTitle.publisher}</h4>
                <h4>출간일 : {readBookTitle.pubdate}</h4>
                <p>{readBookTitle.description}</p><br/>
                
                <ReviewContainer>
                    <ModalTextarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="리뷰를 입력하세요"
                    />

                    <ModalButton onClick={handleReviewSubmit}>Register</ModalButton>
                </ReviewContainer>
            </Modal>
        </div>
    );
};