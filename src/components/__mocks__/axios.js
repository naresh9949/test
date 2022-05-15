export default{
    get: jest.fn(()=> Promise.resolve({data : {}})),
    get: jest.fn().mockImplementationOnce(()=> Promise.resolve({data : {}})),
    post: jest.fn(()=> Promise.resolve({data : {}})),
    post: jest.fn().mockImplementationOnce(()=> Promise.resolve({data : {}})),
    patch: jest.fn(()=> Promise.resolve({data : {}})),
    delete: jest.fn(()=> Promise.resolve({data : {}}))
}

