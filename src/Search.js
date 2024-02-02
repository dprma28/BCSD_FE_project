import React from "react";
import styled from 'styled-components';
import useSearchStore from './useSearchstore';
import { searchBook } from "./Api";
import Modal from 'react-modal';

export default function Search() {
    const { query, setQuery, 
            searchResult, setSearchResult, 
            readBookTitle, setReadBookTitle, 
            isModalOpen, setIsModalOpen,
            review, setReview } = useSearchStore();

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
        closeModal();
    };
    return (
        <div>
        <SearchContainer>
            <StyledInput 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="책 제목을 입력하세요"
            />
            <StyledButton onClick={handleSearch}>🔍︎</StyledButton>
        </SearchContainer>
            {searchResult && (
                <BookContainer>
                    {searchResult.map((book) => (
                        <BookInformation key={book.link} onClick={() => handleBookClick(book)}>
                            <BookImage>
                                <img src={book.image} width="150" height="230" alt={book.title}/>
                            </BookImage>
                            <BookDetails>
                                <p>제목 : {book.title}</p>
                                <p>작가 : {book.author}</p>
                                <p>출판사 : {book.publisher}</p>
                            </BookDetails>
                        </BookInformation>
                    ))}
                </BookContainer>
            )} 

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modalStyles}
            >
                <h2>{readBookTitle && readBookTitle.title}</h2>
                <ModalTextarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="리뷰를 입력하세요"
                />
                <ModalButton onClick={handleReviewSubmit}>+</ModalButton>
            </Modal>
        </div>
    );
};

const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 30px;
`;
const StyledInput = styled.input`
    width: 600px;
    padding: 20px;
    margin-right: 20px;
    background-color: #3c280d;
    color: rgb(235, 204, 167);
    font-size: medium;
    border: none;
    &::placeholder {
        color: rgb(235, 204, 167);
    }
    &:hover {
        border: none;
    }
`;
const StyledButton = styled.button`
    width: 60px;
    padding: 20px;
    background-color: #3c280d;
    color: rgb(235, 204, 167);
    border: none;
`;
const BookContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const BookInformation = styled.div`
    display: flex;
    align-items: center;
    width: 1000px;
    padding: 20px;
    margin-bottom: 10px;
    border: #3c280d solid 0px;
    &:hover {
        background-color: rgb(235, 204, 167);
    }
`;
const BookImage = styled.div`
    margin-right: 50px;
`;
const BookDetails = styled.div`
    flex: 1;
    color: #3c280d;
    font-size: large;
    font-weight: 600;
`;
const modalStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000
    },
    content: {
        width: '500px',
        margin: 'auto',
        padding: '60px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        backgroundColor: 'rgb(239, 215, 185)'
    }
};
const ModalTextarea = styled.textarea`
    width: 445px;
    height: 100px;
    padding: 20px;
    background-color: rgb(235, 204, 167);
    border: #3c280d solid 1px;
`;
const ModalButton = styled.button`
    width: 485px;
    padding: 8px;
    margin-top: 5px;
    background-color: rgb(235, 204, 167);
    border: #3c280d solid 1px;
    color: #3c280d;
`;