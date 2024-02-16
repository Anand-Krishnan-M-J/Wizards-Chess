import { useEffect, useState } from 'react'
import { pieceTypeColor } from '@/store/pieces/types';

export function usePieceColorFromSessionStorage() {
    const [isBlackPieces, setIsBlackPieces] = useState<Boolean | undefined>(undefined);
    useEffect(() => {
        if (sessionStorage && isBlackPieces === undefined) {
            setIsBlackPieces(sessionStorage.getItem("pieceType") === pieceTypeColor.black)
        }
    }, [isBlackPieces])

    return { isBlackPieces, playerPieceType: isBlackPieces === true ? pieceTypeColor.black : pieceTypeColor.white }
}
