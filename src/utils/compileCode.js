import axios from 'axios';

export async function compileCode(language, code) {
    const endpoint = 'https://online-code-compiler.p.rapidapi.com/v1/';
    // Debugging: Log the input parameters
    console.log('Selected Language:', language);
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
                'x-rapidapi-key': '9350b0b26amsh42a6d7bf6609482p1a30c1jsn1ebc4f73e7fe'
                
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
