import useStarStore from "./Store/starStore"
import styled from 'styled-components';

export default function StarScore() {
  const { rating, setRating } = useStarStore();

  return (
    <div>
        <div>별점</div>
        {[...Array(rating)].map((_, i) => (
            <Star key={i} onClick={() => setRating(i + 1)}>★</Star>
        ))}

        {[...Array(5 - rating)].map((_, i) => (
            <Star key={i} onClick={() => setRating(rating + i + 1)}>☆</Star>
        ))}
    </div>
  );
}

const Star = styled.div`
    display: inline-block;
    font-size: x-large;
    cursor: pointer;
`;