import { TokenFlags } from './parser';
import { StyleFunction } from 'ansi-colors'

export interface StyleSheet {
    [key: number]: StyleFunction
}


