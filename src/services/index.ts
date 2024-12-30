export function isValidImageUrl(url: string) {
    return new Promise((resolve) => {
      const img = new Image();

      // Timeout after 1 minute
      const timeout = setTimeout(() => {
          resolve(false);
          img.src = ""; // Prevent further loading
      }, 60000); // 60 seconds

      img.onload = () => {
          clearTimeout(timeout); // Clear the timeout if image loads
          resolve(true);
      };
      img.onerror = () => {
          clearTimeout(timeout); // Clear the timeout if error occurs
          resolve(false);
      };

      img.src = url;
    });
}
export async function validateImage(urls: string[]|null) {
  try{
    if(urls===null) return [];
    const validatedImages = await Promise.all(urls?.map(validateOneImage));
    const validUrls= (validatedImages.filter((url) => url !== null) as string[]);
    if(validUrls.length>0){
      return validUrls;
    }else{

      return null;
    }

  }catch(err){
    return null;
  }

}

const validateOneImage = async (url: string) => {
    try {

        const isValid = await isValidImageUrl(url);
        if (isValid) {
            return url
        }
        return null;

    } catch (error) {
        return null;


    }

}