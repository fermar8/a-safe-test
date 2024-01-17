"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../../api/middleware/auth");
describe('checkIsAdmin', () => {
    let mockRequest;
    let mockReply;
    beforeEach(() => {
        mockRequest = {
            jwtVerify: jest.fn(),
        };
        mockReply = {
            code: jest.fn(),
            send: jest.fn(),
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should allow access if user is logged in', async () => {
        await (0, auth_1.checkIsLoggedIn)(mockRequest, mockReply);
        expect(mockReply.send).not.toHaveBeenCalled();
    });
    it('should allow access if user is admin', async () => {
        ;
        mockRequest.jwtVerify.mockResolvedValue({ isAdmin: true });
        await (0, auth_1.checkIsAdmin)(mockRequest, mockReply);
        expect(mockReply.code).not.toHaveBeenCalledWith(403);
    });
    it('should deny access if user is not admin', async () => {
        ;
        mockRequest.jwtVerify.mockResolvedValue({ isAdmin: false });
        await (0, auth_1.checkIsAdmin)(mockRequest, mockReply);
        expect(mockReply.code).toHaveBeenCalledWith(403);
    });
    it('should handle error if jwt verification fails', async () => {
        ;
        mockRequest.jwtVerify.mockRejectedValue(new Error());
        await (0, auth_1.checkIsAdmin)(mockRequest, mockReply);
        expect(mockReply.code).toHaveBeenCalledWith(403);
    });
});
