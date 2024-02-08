import styled from 'styled-components';

const modalStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        width: '500px',
        margin: 'auto',
        padding: '60px',
        backgroundColor: 'rgb(239, 215, 185)'
    }
};
const ReviewContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const ModalTextarea = styled.textarea`
    height: 100px;
    padding: 20px;
    background-color: rgb(235, 204, 167);
    border: #3c280d solid 1px;
    &:focus { outline:none; }
`;
const ModalButton = styled.button`
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    background-color: rgb(235, 204, 167);
    border: #3c280d solid 1px;
    color: #3c280d;
`;
const CloseButton = styled.button`
    position: absolute;
    right: 60px;
    background-color: rgb(235, 204, 167);
    border: #3c280d solid 1px;
`;

export {modalStyles, ReviewContainer, ModalTextarea, ModalButton, CloseButton}