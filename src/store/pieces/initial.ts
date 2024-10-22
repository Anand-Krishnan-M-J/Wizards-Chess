import { colNames } from '../../constants/pieces'
import { ColName, RowName } from '../../types'
import {
    type PieceState,
    blackPawns,
    pieceName,
    pieceTypes,
    whitePawns,
} from './types'

const commonStates = {
    kia: false, // Killed in action
}

export const getInitialPawnState = (): PieceState[] => {
    const pawnsArr: PieceState[] = []
    const defaultWhitePawnRow = RowName.two
    const defaultBlackPawnRow = RowName.seven
    // create initial pawns state
    colNames.forEach((colName, index) => {
        pawnsArr.push({
            name: whitePawns[index],
            type: pieceTypes.pawn,
            // Current position
            currentCol: colName,
            currentRow: defaultWhitePawnRow,
            // Common states
            ...commonStates,
            isPromoted: false, // when pawn gets promoted,
            promotedTo: undefined,
        })
        pawnsArr.push({
            name: blackPawns[index],
            type: pieceTypes.pawn,
            // Current position
            currentCol: colName,
            currentRow: defaultBlackPawnRow,
            // Common states
            ...commonStates,
            isPromoted: false, // when pawn gets promoted,
            promotedTo: undefined,
        })
    })
    return pawnsArr
}

export const getInitialKingState = (): PieceState[] => {
    const kingsArr: PieceState[] = []
    // create initial pawns state

    kingsArr.push({
        name: pieceName.King_W,
        type: pieceTypes.king,
        // Current position
        currentCol: ColName.E,
        currentRow: RowName.one,
        isCastlingAllowed: {
            long: true,
            short: true,
        },
        // Common states
        ...commonStates,
    })
    kingsArr.push({
        name: pieceName.King_B,
        type: pieceTypes.king,
        // Current position
        currentCol: ColName.E,
        currentRow: RowName.eight,
        isCastlingAllowed: {
            long: true,
            short: true,
        },
        // Common states
        ...commonStates,
    })

    return kingsArr
}

export const getInitialQueenState = (): PieceState[] => {
    const queensArr: PieceState[] = []
    // create initial pawns state

    queensArr.push({
        name: pieceName.Queen_W,
        type: pieceTypes.queen,
        // Current position
        currentCol: ColName.D,
        currentRow: RowName.one,
        // Common states
        ...commonStates,
    })
    queensArr.push({
        name: pieceName.Queen_B,
        type: pieceTypes.queen,
        // Current position
        currentCol: ColName.D,
        currentRow: RowName.eight,
        // Common states
        ...commonStates,
    })

    return queensArr
}

export const getInitialRookState = (): PieceState[] => {
    const rooksArr: PieceState[] = []
    // White Rook
    rooksArr.push({
        name: pieceName.Rook1A_W,
        type: pieceTypes.rook,
        // Current position
        currentCol: ColName.A,
        currentRow: RowName.one,
        // Common states
        ...commonStates,
    })
    rooksArr.push({
        name: pieceName.Rook1H_W,
        type: pieceTypes.rook,
        // Current position
        currentCol: ColName.H,
        currentRow: RowName.one,
        // Common states
        ...commonStates,
    })

    // Black Rook
    rooksArr.push({
        name: pieceName.Rook8A_B,
        type: pieceTypes.rook,
        // Current position
        currentCol: ColName.A,
        currentRow: RowName.eight,
        // Common states
        ...commonStates,
    })
    rooksArr.push({
        name: pieceName.Rook8H_B,
        type: pieceTypes.rook,
        // Current position
        currentCol: ColName.H,
        currentRow: RowName.eight,
        // Common states
        ...commonStates,
    })

    return rooksArr
}

export const getInitialBishopState = (): PieceState[] => {
    const bishopArr: PieceState[] = []
    // White Rook
    bishopArr.push({
        name: pieceName.Bishop1C_W,
        type: pieceTypes.bishop,
        // Current position
        currentCol: ColName.C,
        currentRow: RowName.one,
        // Common states
        ...commonStates,
    })
    bishopArr.push({
        name: pieceName.Bishop1F_W,
        type: pieceTypes.bishop,
        // Current position
        currentCol: ColName.F,
        currentRow: RowName.one,
        // Common states
        ...commonStates,
    })

    // Black Rook
    bishopArr.push({
        name: pieceName.Bishop8C_B,
        type: pieceTypes.bishop,
        // Current position
        currentCol: ColName.C,
        currentRow: RowName.eight,
        // Common states
        ...commonStates,
    })
    bishopArr.push({
        name: pieceName.Bishop8F_B,
        type: pieceTypes.bishop,
        // Current position
        currentCol: ColName.F,
        currentRow: RowName.eight,
        // Common states
        ...commonStates,
    })

    return bishopArr
}

export const getInitialKnightState = (): PieceState[] => {
    const knightArr: PieceState[] = []
    // White Rook
    knightArr.push({
        name: pieceName.Knight1B_W,
        type: pieceTypes.knight,
        // Current position
        currentCol: ColName.B,
        currentRow: RowName.one,
        // Common states
        ...commonStates,
    })
    knightArr.push({
        name: pieceName.Knight1G_W,
        type: pieceTypes.knight,
        // Current position
        currentCol: ColName.G,
        currentRow: RowName.one,
        // Common states
        ...commonStates,
    })

    // Black Rook
    knightArr.push({
        name: pieceName.Knight8B_B,
        type: pieceTypes.knight,
        // Current position
        currentCol: ColName.B,
        currentRow: RowName.eight,
        // Common states
        ...commonStates,
    })
    knightArr.push({
        name: pieceName.Knight8G_B,
        type: pieceTypes.knight,
        // Current position
        currentCol: ColName.G,
        currentRow: RowName.eight,
        // Common states
        ...commonStates,
    })

    return knightArr
}
