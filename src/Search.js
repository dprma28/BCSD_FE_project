import { useState } from "react";
import "./Styles/search.css"
import useSearchStore from "./Store/searchStore";
import useReviewStore from "./Store/reviewStore";
import useStarStore from "./Store/starStore";
import starScore from "./StarScore";
import { searchBook } from "./Api";
import { modalStyles, ReviewContainer, ModalTextarea, ModalButton, CloseButton } from "./Styles/modalStyles"
import Modal from "react-modal";

export default function Search() {
    const { query, setQuery, 
            searchResult, setSearchResult, 
            isModalOpen, setIsModalOpen, 
            readBookTitle, setReadBookTitle, setReadBookTitles,
            setDates } = useSearchStore();
    const { review, setReview, setReviews } = useReviewStore();
    const { rating, setRating, setStars } = useStarStore();
    const [searchFilter, setSearchFilter] = useState("title");

    const handleSearch = async () => {
        if(query.trim() === '') {
            alert("도서명/작가명을 입력하세요");
            return;
        }
    
        const result = await searchBook(query);
        let arrangeBook = [];
    
        for(let i = 0; i < result.length; i++) {
            if (searchFilter === "title" && result[i].title.includes(query)) {
                arrangeBook.push(result[i]);
            } else if (searchFilter === "author" && result[i].author.includes(query)) {
                arrangeBook.push(result[i]);
            }
        }
        
        if(arrangeBook.length > 0) {
            setSearchResult(arrangeBook);
        } else {
            alert("검색 결과가 없습니다");
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

    const handleReviewRegister = () => {
        if (review.trim() === '') {
            alert("리뷰를 입력하세요.");
            return;
        } else {
            setReadBookTitles(readBookTitle);
            setReviews(review);
            setDates(dateOfWrite());
            setStars(`${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}`);

            setReview('');
            setQuery('');
            setRating(0);
            
            closeModal();
        }
    };

    const pubdateFormat = () => {
        if (!readBookTitle.pubdate) {
            return '출간일 정보 없음';
        }

        let pubdate = readBookTitle.pubdate;

        let year = pubdate.substr(0,4);
        let month = pubdate.substr(4,2);
        let date = pubdate.substr(6,2);
        
        let updateDate = `${year}.${month}.${date}`;

        return updateDate;
    };

    const dateOfWrite = () => {
        let today = new Date();

        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let date = today.getDate();
                
        let hours = today.getHours();
        let minutes = today.getMinutes();

        let updateToday = `${year}.${month}.${date} ${hours}:${minutes}`;
        return updateToday;
    };
    
    return (
        <div>
            <div className="searchContainer">
                <select className="filter" onChange={(e) => setSearchFilter(e.target.value)}>
                    <option value="title">제목</option>
                    <option value="author">작가</option>
                </select>

                <input className="searchInput" 
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="search"
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
                <CloseButton onClick={closeModal}>Close</CloseButton><br/>

                <h2>{readBookTitle.title}</h2>
                <h4>작가 : {readBookTitle.author}</h4>
                <h4>출판사 : {readBookTitle.publisher}</h4>
                <h4>출간일 : {pubdateFormat()}</h4>
                <p>{readBookTitle.description}</p><br/>
                
                <div>{starScore()}</div><br/>

                <ReviewContainer>
                    <ModalTextarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="리뷰를 입력하세요"
                    />

                    <ModalButton onClick={handleReviewRegister}>Register</ModalButton>
                </ReviewContainer>
            </Modal>
        </div>
    );
};