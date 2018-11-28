import fileSystemGet from './data/filesystem/get/data.json';

const mockAxios = {
  get(path) {
    if (path === '/filesystem/get/') {
      return { data: fileSystemGet };
    }
  },
};

export default mockAxios;
