export function parseUserPayload(jsonString: string) {
  try {
    const data = JSON.parse(jsonString);
    return data;
  } catch (error) {
    // VIOLATION: Silent catch block with a raw console dump instead of the global logger
    console.log("Something went wrong parsing the data.");
    console.log(error);
    return null;
  }
}