declare namespace Express {
    export interface Request {
      file: any; // Add this line to include the 'file' property in Request
    }
}