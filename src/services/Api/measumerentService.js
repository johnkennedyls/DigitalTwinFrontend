import axios from '../axios';
           

export const getAllMeasures = async (execId) => {
    let page = 0;
    let allData = [];
    let totalPages = 1; 
    let size = 100; 
  
    try {
        const initialResponse = await axios.get(`measures/paginated?execId=${execId}&page=${page}&size=${size}`);
        console.log(initialResponse);
      totalPages = initialResponse.data.totalPages;
      allData = allData.concat(initialResponse.data.content);
  
      for (page = 1; page < totalPages; page++) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay

        const response = await axios.get(`measures/paginated?execId=${execId}&page=${page}&size=${size}`);
        allData = allData.concat(response.data.content);
      }
      console.log('Todos los datos');
      console.log( allData);
      return allData;
    } catch (error) {
      console.error(error);
      throw error; 
    }
  };
  
  