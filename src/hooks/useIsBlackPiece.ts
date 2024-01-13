import { useEffect, useState } from 'react'
import { pieceTypeColor } from '@/store/pieces/types';

export function usePieceColorFromSessionStorage() {
    const [isBlackPieces, setIsBlackPieces] = useState(false);
    useEffect(() => {
        if (sessionStorage) {
            setIsBlackPieces(sessionStorage.getItem("pieceType") === pieceTypeColor.black)
        }
    }, [])

    return { isBlackPieces, playerPieceType: isBlackPieces ? pieceTypeColor.black : pieceTypeColor.white }
}
