import { ErrorType } from '../../common'
export class DataError {
    static async resource_not_found(message = 'resource not found', code = 404): Promise<ErrorType> {
        return {
            code,
            message
        }
    }
    static async conflict(message = "can't be processed right now", code = 409): Promise<ErrorType> {
        return {
            code,
            message
        }
    }
}