import axios from 'axios';

export async function compileCode(language, code) {
    const endpoint = 'https://online-code-compiler.p.rapidapi.com/v1/';
    // Debugging: Log the input parameters
    
    const payload = {
        language: language,
        version: 'latest',
        code: code,
        input: null
    }; 
   
     console.log('Payload', payload);
   
     console.log('Payload:', JSON.stringify(payload, null, 2));
  
    

    try {
         // Log payload with better formatting
        const response = await axios.post(endpoint, payload, {
            headers: {
                'Content-Type': 'application/json',
                'x-rapidapi-host': 'online-code-compiler.p.rapidapi.com',
                'x-rapidapi-key': '4b6a479c9cmsh46a59eac9ef9dc9p16f2e5jsn016b43fc2621'
                
            }
        });
        console.log('Response:', response.data); // Log response
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
        } else {
            console.error('Error message:', error.message);
        }
        return { error: 'Failed to compile code' };
    }
}
