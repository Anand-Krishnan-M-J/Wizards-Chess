import { useState } from 'react'
import { pieceColor } from '../config'
import { type ThreeEvent } from '@react-three/fiber'

export function usePieceHover(
    defaultColor = pieceColor.grey,
    hoverColor = pieceColor.blackHover
) {
    const [color, setcolor] = useState(defaultColor)
    // const hoveredPiece = useSelector((state: RootState) => state.pieces.hoveredPiece);

    // const dispatch = useDispatch()
    // const handleMove = (name: pieceName) => {
    //     dispatch(movePiece({ name, col: ColName.D, row: RowName.four }))
    // }

    const onPointerOver = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation()
        setcolor(hoverColor)
    }

    const onPointerOut = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation()
        setcolor(defaultColor)
    }

    return {
        color,
        onPointerOver,
        onPointerOut,
    }
}
