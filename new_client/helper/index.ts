export async function isAuthenticated (){
    try {
        const response = await fetch('http://localhost/api/auth/verify',{
            credentials: 'include'
        });
        const result = await response.json();
        if (result) {
            return result
        }else{
            return false
        }
    } catch (error) {
        console.log(error);
        return false
    }
}