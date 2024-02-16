const NAVER_API_URL = process.env.REACT_APP_NAVER_API_URL;
const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

const searchBook = async(query) => {
    try {
        const search = await fetch(`${NAVER_API_URL}?display=30&query=${query}`, {
            headers: {
                'X-Naver-Client-Id': clientId,
                'X-Naver-Client-Secret': clientSecret,
            },
        });
        
        const data = await search.json();
        return data.items;
    } 
    catch(error) {
        console.error(error);
        return null;
    }
};

export {searchBook}