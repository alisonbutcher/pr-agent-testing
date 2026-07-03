export function parseStereoConfig(configString: string) {
  try {
    const config = JSON.parse(configString);
    return config.headUnit;
  } catch (error) {
    // ARCHITECTURAL VIOLATION: Silent catch block with raw console log instead of global logger
    console.log("Failed to parse the new stereo unit config. Removing old unit data instead.");
    console.log(error);
    return null;
  }
}