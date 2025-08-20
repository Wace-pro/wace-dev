interface ApiResponseSuccess {
    success: true;
    data: any;
    message: string;
    error: null;
}
interface ApiResponseFailed {
    success: false;
    data: null;
    message: null;
    error: string;
} 

export type ApiResponse = ApiResponseSuccess | ApiResponseFailed;