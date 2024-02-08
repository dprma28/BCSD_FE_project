import styled from 'styled-components';

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
`;

const ModalButton = styled.button`
    width: 485px;
    padding: 8px;
    margin-top: 5px;
    background-color: rgb(235, 204, 167);
    border: #3c280d solid 1px;
    color: #3c280d;
`;

const CloseButton = styled.button`

    background-color: transparent;
    border: none;
    font-size: x-large;
`;

export {modalStyles, ModalTextarea, ModalButton, CloseButton}