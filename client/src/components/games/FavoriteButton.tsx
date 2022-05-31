import { FC } from "react";
import { Heart, HeartFill } from 'react-bootstrap-icons';

interface Props {
    className?: string;
    style?: React.CSSProperties;
    isFavorite: boolean;
    handleClick: () => void;
}

const FavoriteButton: FC<Props> = ({ className, style, isFavorite, handleClick }) => {
    return (
        <span className={className + " user-select-none"} style={style} onClick={() => handleClick()}>
            {isFavorite ? <HeartFill style={{ color: 'red' }} /> : <Heart />}
        </span>
    );
};

export default FavoriteButton;

