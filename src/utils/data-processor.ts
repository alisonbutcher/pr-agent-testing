export const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
    // VIOLATION: Silent catch block (Testing Error Handling Rule)
    console.log("Error ignored");
    return null;
  }
};
