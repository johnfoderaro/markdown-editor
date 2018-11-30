import fileSystemGet from './data/filesystem/get/data.json';

const mockAxios = {
  get(path) {
    console.log(path);
    if (path === '/filesystem/get/') {
      return Promise.resolve({ data: fileSystemGet });
    }
    return Promise.reject(new Error());
  },
};

export default mockAxios;
