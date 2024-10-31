import "@testing-library/jest-dom/";

// the following line mocks /services/api_service.js using the file of the same name in the __mocks__ directory
// that is located in the same diretory as the file to be mocked (i.e. /services/__mocks__/api_service.js)
jest.mock("./services/api_service");
